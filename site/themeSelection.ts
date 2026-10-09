export const themeSelections = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'wireframe', label: 'Wireframe' },
] as const

export type ThemeSelection = (typeof themeSelections)[number]['id']

const themeStorageKey = 'mezzanine-theme'

export function isThemeSelection(value: string): value is ThemeSelection {
  return themeSelections.some((theme) => theme.id === value)
}

export function readStoredThemeSelection(): ThemeSelection {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey)
    return storedTheme && isThemeSelection(storedTheme) ? storedTheme : 'system'
  } catch {
    return 'system'
  }
}

export function storeThemeSelection(theme: ThemeSelection) {
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // The theme still applies for this visit when storage is unavailable.
  }
}

export function applyThemeSelection(theme: ThemeSelection) {
  document.documentElement.dataset.theme = theme
}
