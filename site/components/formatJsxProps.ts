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
