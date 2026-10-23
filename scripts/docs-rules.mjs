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

// Props named in page copy ----------------------------------------------------

// Finds the props that copy names in code, so they can be checked against the real types: `name="value"`,
// `name={value}`, and each attribute of an element such as `<Button hierarchy="secondary">`. A bare word in
// backticks is left alone, because it may be a type, a token or a CSS property rather than a prop.
export function propMentions(text) {
  const mentions = []
  // Fenced code examples would throw off which backticks pair up; blank them out, keeping positions.
  const prose = text.replace(/```[\s\S]*?```/g, block => block.replace(/[^\n]/g, ' '))
  for (const code of prose.matchAll(/`([^`]+)`/g)) {
    const span = code[1]
    const start = code.index + 1
    const element = span.match(/^<([A-Z][A-Za-z]*)\s+([^>]*?)\/?>?$/)
    const attributes = element ? element[2] : span
    if (!element && !/^[a-z][\w-]*=/.test(span)) continue
    for (const attribute of attributes.matchAll(/(?:^|\s)([a-z][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|\{[^}]*\}))?/g)) {
      mentions.push({
        component: element?.[1],
        prop: attribute[1],
        value: attribute[2] ?? attribute[3],
        position: start + (element ? span.indexOf(element[2]) : 0) + attribute.index,
      })
    }
  }
  return mentions
}

// Token values copied into a guide -------------------------------------------

// Rows in a table whose second column is headed Value, Stored value or Default, such as "| `--space-1` | `0.25rem` |
// 4px |" or "| `--target-size-xs` | 2rem (32px) | ... |": the token, its documented value, and any pixel equivalent.
// A value written as another token, such as `--space-2`, stands for var(--space-2). A value cell written in words,
// such as "minus the width", is a description and is skipped.
const valueHeadings = ['Value', 'Stored value', 'Default']
export function documentedTokenValues(markdown) {
  const rows = []
  let isValueTable = false
  let position = 0
  const lines = markdown.split('\n')
  for (const [index, line] of lines.entries()) {
    const cells = line.startsWith('|') ? line.split('|').slice(1, -1).map(cell => cell.trim()) : undefined
    if (cells && /^\|\s*-{3}/.test(lines[index + 1] ?? '')) isValueTable = valueHeadings.includes(cells[1])
    else if (!cells) isValueTable = false
    const token = cells?.[0].match(/^`(--[\w-]+)`$/)?.[1]
    if (isValueTable && token) {
      const cell = cells[1]
      const value = cell.match(/^`([^`]+)`$/)?.[1] ?? cell.match(/^(-?[\d.]+[a-z%]*|[a-z-]+)(?: \([\d.]+px\))?$/)?.[1]
      const px = cell.match(/\(([\d.]+)px\)$/)?.[1] ?? cells[2]?.match(/^([\d.]+)px$/)?.[1]
      if (value && value !== '—') rows.push({ token, value, px: px === undefined ? undefined : Number(px), position })
    }
    position += line.length + 1
  }
  return rows
}

// Each documented value must be one the token files declare, and a pixel equivalent must match its rem value at
// the browser default of 16px.
export function checkTokenValues(rows, declared) {
  const problems = []
  for (const { token, value, px, position } of rows) {
    const values = declared.get(token)
    if (!values) problems.push({ position, message: `The guide documents ${token}, which no token file declares.` })
    else if (!values.has(value) && !values.has(`var(${value})`)) problems.push({ position, message: `The guide says ${token} is ${value}, but the token files declare ${[...values].join(' or ')}.` })
    const rem = value.match(/^([\d.]+)rem$/)?.[1]
    if (px !== undefined && rem !== undefined && Number(rem) * 16 !== px) problems.push({ position, message: `The guide gives ${token} as ${px}px, but ${value} is ${Number(rem) * 16}px.` })
  }
  return problems
}

// MAP.md ----------------------------------------------------------------------

// Each MAP.md section describes the folder named in its heading, such as "Library (`src/`)"; "Tests, checks and
// configuration" describes the repository root, and Commands lists commands, not paths. Every path in a row's first
// cell must exist, and every folder directly inside a mapped folder must have a row, so the map can't drift. A
// placeholder such as `<Name>/` stands for any folder, so only the part before it is checked.
const rootSection = 'Tests, checks and configuration'
export function checkMap(markdown, { exists, foldersIn }) {
  const problems = []
  const headings = [...markdown.matchAll(/^## (.+)$/gm)]
  const sections = []
  headings.forEach((heading, index) => {
    const base = heading[1].match(/\(`([^`]+)`\)/)?.[1] ?? (heading[1] === rootSection ? '' : undefined)
    if (base !== undefined) sections.push({ base, start: heading.index, end: headings[index + 1]?.index ?? markdown.length })
  })
  // Every folder a row lists, with each of its parent folders, such as tests/components and tests.
  const listed = new Set()
  for (const section of sections) {
    for (const row of markdown.slice(section.start, section.end).matchAll(/^\| ([^|]+) \|/gm)) {
      for (const entry of row[1].matchAll(/`([^`]+)`/g)) {
        const path = section.base + entry[1].split('<')[0].replace(/^\//, '')
        if (!exists(path)) problems.push({ position: section.start + row.index, message: `MAP.md lists ${section.base}${entry[1]}, which doesn't exist.` })
        const segments = path.split('/').filter(Boolean)
        segments.forEach((_, count) => listed.add(segments.slice(0, count + 1).join('/')))
      }
    }
  }
  // Folders whose children must all be listed: each mapped folder, and the test folders listed from the root.
  for (const section of sections) {
    for (const parent of section.base ? [section.base] : ['tests/']) {
      for (const folder of foldersIn(parent)) {
        const path = parent + folder
        if (!listed.has(path) && !sections.some(other => other.base === `${path}/`)) problems.push({ position: section.start, message: `${path}/ has no row in MAP.md.` })
      }
    }
  }
  return problems
}
