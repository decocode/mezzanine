export const themeOptions = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'wireframe', label: 'Wireframe' },
] as const

export type Theme = (typeof themeOptions)[number]['id']

const themeStorageKey = 'mezzanine-theme'

export function isTheme(value: string): value is Theme {
  return themeOptions.some((theme) => theme.id === value)
}

export function readStoredTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey)
    return storedTheme && isTheme(storedTheme) ? storedTheme : 'system'
  } catch {
    return 'system'
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // The theme still applies for this visit when storage is unavailable.
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export function getDisplayedTheme(selectedTheme: Theme) {
  if (selectedTheme !== 'system') return selectedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
