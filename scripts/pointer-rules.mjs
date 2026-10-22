// Component pointers: optional, undeclared custom properties that let an app restyle one part of one
// component, such as `background: var(--button-primary-background, var(--color-accent-emphasis))`.
// Nothing declares them; the fallback is the shared token the component uses when no one overrides
// the part. These checks keep every pointer named --component-variant-property-state, always given a
// fallback, and falling back to a token that exists.

// Custom properties that the browser, React Aria or a component's own script set at run time. They
// are read without a fallback on purpose and are not pointers.
export const runtimeProperties = new Set(['--tree-item-level', '--page-width', '--page-height', '--visual-viewport-height'])

// The prefixes each component's pointers may start with: its own name, and any other component whose
// look it shares on purpose, such as ToggleButton's secondary Button look.
export const pointerPrefixes = {
  AppShell: ['app-shell'],
  Badge: ['badge'],
  Breadcrumbs: ['breadcrumbs', 'breadcrumb'],
  Button: ['button'],
  Card: ['card'],
  Checkbox: ['checkbox'],
  CodeBlock: ['code-block'],
  Dialog: ['dialog'],
  // Disclosure and NavTree share the chevron that turns as they open.
  Disclosure: ['disclosure', 'chevron'],
  Link: ['link'],
  ListBox: ['list-box'],
  Modal: ['modal'],
  NavTree: ['navigation-tree', 'chevron'],
  Panel: ['panel'],
  RadioGroup: ['radio'],
  // SearchField is a text field with an icon, so it shares TextField's field pointers.
  SearchField: ['search-field', 'input', 'text-field'],
  SearchTrigger: ['search-trigger'],
  Switch: ['switch'],
  Table: ['table'],
  Tabs: ['tabs', 'tab'],
  TextField: ['input', 'text-field', 'text-area'],
  ToggleButton: ['toggle-button', 'button-secondary'],
  Tooltip: ['tooltip'],
  TopBar: ['top-bar'],
}

// The property a pointer ends with, before any state.
const properties = [
  'background', 'foreground', 'border', 'border-width', 'border-radius', 'radius', 'padding', 'padding-block',
  'padding-inline', 'padding-inline-start', 'padding-inline-end', 'gap', 'gap-block', 'size', 'width', 'height',
  'min-height', 'max-height', 'max-width', 'preferred-width', 'offset', 'elevation', 'color', 'indent', 'opacity',
  'backdrop', 'selection', 'indicator', 'thickness',
]
const states = ['hovered', 'pressed', 'selected', 'invalid', 'focused', 'disabled', 'current']
const pointerName = new RegExp(`-(?:${properties.join('|')})(?:-(?:${states.join('|')}))*$`)
// Values a pointer may fall back to directly, without a token.
const structuralFallback = /^(?:0|transparent|currentColor|none|50%|100%)$/

// Each `var(` read in the CSS, with its name and fallback (the text after the first comma).
function reads(text) {
  const masked = text.replace(/\/\*[\s\S]*?\*\//g, value => value.replace(/[^\n]/g, ' '))
  const found = []
  for (let start = masked.indexOf('var('); start !== -1; start = masked.indexOf('var(', start + 4)) {
    let depth = 0
    let end = start + 3
    let comma = -1
    for (; end < masked.length; end += 1) {
      const character = masked[end]
      if (character === '(') depth += 1
      else if (character === ')') { depth -= 1; if (depth === 0) break }
      else if (character === ',' && depth === 1 && comma === -1) comma = end
    }
    const name = masked.slice(start + 4, comma === -1 ? end : comma).trim()
    found.push({ name, fallback: comma === -1 ? null : masked.slice(comma + 1, end).trim(), position: start })
  }
  return found
}

// Problems with the pointers in one component's CSS. `declared` is every custom property that a
// token file, theme or stylesheet declares.
export function checkComponentPointers(component, text, declared) {
  const prefixes = pointerPrefixes[component]
  const problems = []
  for (const { name, fallback, position } of reads(text)) {
    if (name.startsWith('--_') || declared.has(name) || runtimeProperties.has(name)) continue
    const report = message => problems.push({ position, message })
    if (!prefixes) { report(`${component} has no pointer prefixes listed in scripts/pointer-rules.mjs.`); continue }
    if (!prefixes.some(prefix => name.startsWith(`--${prefix}-`))) report(`${name} is not declared anywhere, so it's a pointer, but it doesn't start with ${prefixes.map(prefix => `--${prefix}-`).join(' or ')}.`)
    else if (!pointerName.test(name)) report(`${name} doesn't follow --component-variant-property-state: end it with a property such as -background or -padding-block, then any state such as -hovered.`)
    if (fallback === null) { report(`${name} is a pointer without a fallback; give it the shared token it stands in for, such as var(${name}, var(--color-accent)).`); continue }
    // The fallback is a declared token, another pointer (checked in its own right), or a calculation
    // from them, such as min(var(--radius-surface), var(--radius-sm)); otherwise a structural value.
    const names = [...fallback.matchAll(/var\(\s*(--[\w-]+)/g)].map(match => match[1])
    const known = token => declared.has(token) || token.startsWith('--_') || runtimeProperties.has(token) || prefixes.some(prefix => token.startsWith(`--${prefix}-`))
    if (names.length ? !names.every(known) : !structuralFallback.test(fallback)) {
      report(`${name} falls back to ${fallback}, which isn't a declared token.`)
    }
  }
  return problems
}

// Every pointer a component's CSS offers, with the value it falls back to, for its docs page.
export function componentPointers(text, declared) {
  const pointers = new Map()
  for (const { name, fallback } of reads(text)) {
    if (name.startsWith('--_') || declared.has(name) || runtimeProperties.has(name) || fallback === null) continue
    if (!pointers.has(name)) pointers.set(name, fallback.replace(/\s+/g, ' '))
  }
  return [...pointers].map(([name, fallback]) => ({ name, fallback })).sort((a, b) => a.name.localeCompare(b.name))
}
