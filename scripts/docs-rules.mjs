// Checks that keep documentation facts in step with the code. Each function is
// pure: it takes file text and returns problems, so the rules are easy to test.

// Routes ---------------------------------------------------------------------

export function sitePaths(siteStructure) {
  return [...siteStructure.matchAll(/\bpath: '([^']+)'/g)].map(match => match[1])
}

// The `~^...$ 1;` lines inside nginx's `map $uri $is_app_route` block.
export function nginxRoutePatterns(nginx) {
  const block = nginx.match(/map \$uri \$is_app_route \{([\s\S]*?)\n\}/)?.[1] ?? ''
  return [...block.matchAll(/^\s*~(\^[^\s]+\$)\s+1;/gm)].map(match => ({ source: match[1], position: match.index }))
}

// Lab pages: the hrefs in labContent.ts, plus a child page under the Layout overview for each slug.
export function labPaths({ labContent, layoutContent }) {
  const hrefs = [...labContent.matchAll(/\bhref: '(\/site\/lab[^']*)'/g)].map(match => match[1])
  const slugs = [...layoutContent.matchAll(/\bslug: '([^']+)'/g)].map(match => `/site/lab/layout/${match[1]}`)
  return [...hrefs, ...slugs]
}

// Every path an nginx route pattern allows, when the pattern is only literal text, groups,
// `|` alternatives and optional `?` groups. Returns null for anything more complex.
export function expandRoutePattern(source) {
  const body = source.replace(/^\^/, '').replace(/\$$/, '').replace(/\/\?$/, '')
  let index = 0
  function sequence() {
    let results = ['']
    while (index < body.length && body[index] !== ')' && body[index] !== '|') {
      let options
      if (body[index] === '(') {
        index++
        options = alternatives()
        if (body[index++] !== ')') return null
      } else if (/[a-z0-9/-]/.test(body[index])) {
        options = [body[index++]]
      } else return null
      if (options == null) return null
      if (body[index] === '?') { index++; options = ['', ...options] }
      results = results.flatMap(result => options.map(option => result + option))
    }
    return results
  }
  function alternatives() {
    const first = sequence()
    if (first == null) return null
    const all = [...first]
    while (body[index] === '|') {
      index++
      const next = sequence()
      if (next == null) return null
      all.push(...next)
    }
    return all
  }
  const paths = alternatives()
  if (paths == null || index !== body.length) return null
  return paths.map(path => path === '' ? '/' : path)
}

export function checkRoutes({ siteStructure, extraPaths = [], nginx, lighthouseUrls }) {
  const problems = []
  const paths = [...sitePaths(siteStructure), ...extraPaths]
  const patterns = nginxRoutePatterns(nginx)
  const allowed = path => patterns.some(pattern => new RegExp(pattern.source).test(path))
  for (const path of paths) {
    if (!allowed(path)) problems.push({ file: 'config/nginx.conf', position: 0, message: `Site page ${path} is not in nginx's allowed routes, so it would return 404.` })
  }
  // Every path a simple rule allows must still be a page.
  for (const pattern of patterns) {
    for (const path of expandRoutePattern(pattern.source) ?? []) {
      if (!paths.includes(path)) problems.push({ file: 'config/nginx.conf', position: pattern.position, message: `nginx allows ${path}, but the site has no such page.` })
    }
  }
  for (const { file, url } of lighthouseUrls) {
    const path = new URL(url).pathname
    if (!allowed(path)) problems.push({ file, position: 0, message: `Lighthouse URL ${path} is not an allowed site route.` })
  }
  return problems
}

// Tokens ---------------------------------------------------------------------

const tokenDeclaration = /(--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)\s*:/g
const tokenMention = /--[a-z][a-z0-9]*(?:-[a-z0-9]+)*/g

export function declaredTokens(cssTexts) {
  const tokens = new Set()
  for (const text of cssTexts) for (const match of text.matchAll(tokenDeclaration)) tokens.add(match[1])
  return tokens
}

// Template literals such as `--space-${step}` document a whole family of tokens.
export function templateTokenPatterns(source) {
  const patterns = []
  for (const match of source.matchAll(/`([^`]*\$\{[^`]*)`/g)) {
    const parts = match[1].split(/\$\{[^}]*\}/)
    // Need real text to match against: `${a}-${b}` would otherwise match every token.
    if (parts.join('').replace(/[^a-z]/g, '').length < 4) continue
    const text = parts.map(part => part.replace(/[.*+?^$()|[\]\\]/g, '\\$&')).join('[a-z0-9-]+')
    if (/^--|^\[a-z0-9-\]\+-/.test(text)) patterns.push(new RegExp(`^${text}$`))
  }
  return patterns
}

export function checkTokens({ publicTokens, knownTokens, siteSources, baseline }) {
  const problems = []
  const mentioned = new Set()
  const patterns = []
  for (const { file, text } of siteSources) {
    patterns.push(...templateTokenPatterns(text))
    for (const match of text.matchAll(tokenMention)) {
      const token = match[0]
      mentioned.add(token)
      // A bare prefix such as '--space' used to build names is fine.
      const isPrefix = [...knownTokens].some(known => known.startsWith(`${token}-`))
      if (!knownTokens.has(token) && !isPrefix) problems.push({ file, position: match.index, message: `Docs mention ${token}, which no token file or stylesheet defines.` })
    }
  }
  const documented = token => mentioned.has(token) || patterns.some(pattern => pattern.test(token))
  const undocumented = [...publicTokens].filter(token => !token.startsWith('--_') && !documented(token)).sort()
  for (const token of undocumented) {
    if (!baseline.includes(token)) problems.push({ file: 'src/tokens.css', position: 0, message: `Token ${token} is not documented on any site page. Document it, or run check:rules with --update-token-baseline to accept the gap.` })
  }
  for (const token of baseline) {
    if (!publicTokens.has(token)) problems.push({ file: 'scripts/undocumented-tokens.baseline.json', position: 0, message: `${token} no longer exists; run check:rules with --update-token-baseline.` })
    else if (documented(token)) problems.push({ file: 'scripts/undocumented-tokens.baseline.json', position: 0, message: `${token} is now documented; run check:rules with --update-token-baseline.` })
  }
  return { problems, undocumented }
}

// Props ----------------------------------------------------------------------

// Rows name one prop, several (`isOpen / defaultOpen`, `className, style`) or
// prefix them with their component (`TooltipTrigger: delay`). A row that is
// only a component name starts that component's props.
export function parsePropRows(names, componentNames) {
  const rows = []
  let component
  for (const name of names) {
    if (componentNames.includes(name)) { component = name; continue }
    const prefixed = name.match(/^([A-Z][A-Za-z]*): (.+)$/)
    if (prefixed && componentNames.includes(prefixed[1])) component = prefixed[1]
    // `type: 'section'` names a prop with a fixed value.
    const valued = !prefixed && name.match(/^([a-z][\w-]*): /)
    const props = valued ? [valued[1]] : (prefixed ? prefixed[2] : name).split(/\s*(?:\/|,)\s*/).filter(Boolean)
    for (const prop of props) rows.push({ component, prop })
  }
  return rows
}
