// Which theme the page around a DemoArea shows, so the demo's theme picker starts there and follows it.

export type DemoTheme = 'light' | 'dark' | 'wireframe'

export const demoThemes: readonly DemoTheme[] = ['light', 'dark', 'wireframe']

export function isDemoTheme(value: unknown): value is DemoTheme {
  return typeof value === 'string' && (demoThemes as readonly string[]).includes(value)
}

// The page's theme: its root element's data-theme, or the device's light or dark setting when it is
// "system" or not set.
export function getPageTheme(): DemoTheme {
  const theme = document.documentElement.dataset.theme
  if (isDemoTheme(theme)) return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getServerPageTheme(): DemoTheme {
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
