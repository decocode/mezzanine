// Which theme the page around a DemoBlock shows, so the demo's theme switcher starts there and follows it.
import type { ThemeName } from '../ThemeSwitcher/ThemeSwitcher'

const themeNames: readonly ThemeName[] = ['light', 'dark', 'system', 'wireframe']

// The page's theme: its root element's data-theme, or System, which follows the device, when it isn't set.
export function getPageTheme(): ThemeName {
  const theme = document.documentElement.dataset.theme
  return themeNames.find((name) => name === theme) ?? 'system'
}

export function getServerPageTheme(): ThemeName {
  return 'system'
}

export function subscribeToPageTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
