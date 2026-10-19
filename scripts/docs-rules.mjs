// Checks that keep documentation facts in step with the code. Each function is
// pure: it takes file text and returns problems, so the rules are easy to test.

// Routes ---------------------------------------------------------------------

// Lab pages: the Lab hrefs written in labContent.tsx and the Lab's content files (one per page
// folder, plus each group's overview), plus a child page under the Layout overview for each slug.
export function labPaths({ labContent, pageContent }) {
  const hrefs = [...`${labContent}\n${pageContent}`.matchAll(/\bhref: '(\/site\/lab[^']*)'/g)].map(match => match[1])
  const slugs = [...pageContent.matchAll(/\bslug: '([^']+)'/g)].map(match => `/site/lab/layout/${match[1]}`)
  return [...hrefs, ...slugs]
}

// Every page's component must sit in the folder the navigation gives it, and no page file may sit
// anywhere else. Lighthouse URLs must be app routes. `pages` lists { id, file } for each
// implemented page; `pageFiles` is every *Page.tsx under site/pages.
export function checkRoutes({ routes, pages, pageFiles, otherPageFiles = [], lighthouseUrls }) {
  const problems = []
  const expected = new Set(pages.map(page => page.file))
  for (const page of pages) {
    if (!pageFiles.includes(page.file)) problems.push({ file: 'site/siteStructure.ts', position: 0, message: `Page "${page.id}" should be at ${page.file}, matching its place in the navigation.` })
  }
  for (const file of pageFiles) {
    if (!expected.has(file) && !otherPageFiles.includes(file)) problems.push({ file, position: 0, message: `${file} is not where the navigation puts any page. Move it to match site/siteStructure.ts.` })
  }
  for (const { file, url } of lighthouseUrls) {
    const path = new URL(url).pathname
    if (!routes.includes(path)) problems.push({ file, position: 0, message: `Lighthouse URL ${path} is not an app route.` })
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
