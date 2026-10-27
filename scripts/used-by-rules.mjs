// TOKENS.md's "Used by" columns, generated from the CSS. A component uses a token when its CSS reads the
// token, or reads another token whose value, in any token file, leads to it. Each table whose header is
// "| Token | Value | Used by |" gets its Used by cells rewritten from that.

const reads = text => [...text.matchAll(/var\(\s*(--[\w-]+)/g)].map(match => match[1])

// Every token's value in the token files, as the tokens it reads.
export function tokenReferences(tokenFiles) {
  const references = new Map()
  for (const text of tokenFiles) {
    for (const match of text.matchAll(/(--[\w-]+)\s*:([^;]*);/g)) {
      references.set(match[1], new Set([...(references.get(match[1]) ?? []), ...reads(match[2])]))
    }
  }
  return references
}

// The components that use each token, sorted by name.
export function tokensUsedBy(componentCss, references) {
  const usedBy = new Map()
  for (const [component, text] of componentCss) {
    const seen = new Set()
    const visit = token => {
      if (seen.has(token)) return
      seen.add(token)
      for (const next of references.get(token) ?? []) visit(next)
    }
    for (const token of reads(text)) visit(token)
    for (const token of seen) usedBy.set(token, new Set([...(usedBy.get(token) ?? []), component]))
  }
  return new Map([...usedBy].map(([token, components]) => [token, [...components].sort()]))
}

const usedByHeader = /^\| Token \| Value \| Used by \|$/

// The markdown with each Used by cell rewritten.
export function withUsedBy(markdown, usedBy) {
  let inTable = false
  return markdown.split('\n').map(line => {
    if (usedByHeader.test(line)) { inTable = true; return line }
    if (!inTable) return line
    if (!line.startsWith('|')) { inTable = false; return line }
    const cells = line.split('|')
    const token = cells[1]?.match(/`(--[\w-]+)`/)?.[1]
    if (!token) return line
    const components = usedBy.get(token) ?? []
    cells[3] = ` ${components.length ? components.join(', ') : 'Not used by components'} `
    return cells.join('|')
  }).join('\n')
}
