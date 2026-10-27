// The page's theme, so the candidate demo block's theme Select starts on it and follows it.
// Illustrative and unapproved; the library's DemoBlock has its own copy of this.

export type LabDemoTheme = 'light' | 'dark' | 'wireframe'

export function isLabDemoTheme(value: unknown): value is LabDemoTheme {
  return value === 'light' || value === 'dark' || value === 'wireframe'
}

export function getPageTheme(): LabDemoTheme {
  const theme = document.documentElement.dataset.theme
  if (isLabDemoTheme(theme)) return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getServerPageTheme(): LabDemoTheme {
  return 'light'
}

export function subscribeToPageTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  colorScheme.addEventListener('change', onChange)
  return () => {
    observer.disconnect()
    colorScheme.removeEventListener('change', onChange)
  }
}
