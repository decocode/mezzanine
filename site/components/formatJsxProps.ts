// Writes a demo's props as JSX attributes for its Code tab, in the order given. A prop that is
// undefined or false is left out, true is written bare, a string is quoted, and anything else, such as
// a number or an array, goes in braces.
export function formatJsxProps(props: Record<string, unknown>) {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([name, value]) => {
      if (value === true) return ` ${name}`
      if (typeof value === 'string') return ` ${name}=${JSON.stringify(value)}`
      return ` ${name}={${JSON.stringify(value).replaceAll(',', ', ')}}`
    })
    .join('')
}

// The same props, one to a line, for a demo whose element reads best with its props listed.
export function formatJsxPropLines(props: Record<string, unknown>) {
  return Object.entries(props).map(([name, value]) => formatJsxProps({ [name]: value }).trimStart()).filter(Boolean)
}

// Writes a demo's element for its Code tab with each of its prop lines indented on a line of its own,
// and any children, already written, indented inside it.
export function formatJsxElementLines(tag: string, propLines: string[], children: string[] = []) {
  const props = propLines.map((line) => `  ${line}`)
  if (children.length === 0) return propLines.length === 0 ? `<${tag} />` : [`<${tag}`, ...props, '/>'].join('\n')
  return [`<${tag}`, ...props, '>', ...children.map((line) => `  ${line}`), `</${tag}>`].join('\n')
}
