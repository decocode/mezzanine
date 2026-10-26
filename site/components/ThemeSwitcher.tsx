import { ListBoxItem, Select } from '@decocode/mezzanine'
import { useSyncExternalStore } from 'react'
import { getDisplayedTheme, isTheme, prefersDarkColorScheme, subscribeToColorScheme, type Theme } from '../themeSwitcherLogic'

interface ThemeSwitcherProps {
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
  // In the narrow-screen menu, the Select shows its "Theme" label; in the bar, the label is for screen
  // readers only.
  isMenu?: boolean
}

const themeOptions: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'wireframe', label: 'Wireframe' },
]

// A Select, so more themes can join the list.
export function ThemeSwitcher({ onThemeChange, selectedTheme, isMenu = false }: ThemeSwitcherProps) {
  const prefersDark = useSyncExternalStore(subscribeToColorScheme, prefersDarkColorScheme)
  const displayedTheme = getDisplayedTheme(selectedTheme, prefersDark)

  return (
    <Select
      {...(isMenu ? { label: 'Theme' } : { 'aria-label': 'Theme' })}
      hierarchy="secondary"
      selectedKey={displayedTheme}
      onSelectionChange={(key) => {
        if (typeof key === 'string' && isTheme(key)) onThemeChange(key)
      }}
    >
      {themeOptions.map((option) => <ListBoxItem key={option.id} id={option.id}>{option.label}</ListBoxItem>)}
    </Select>
  )
}
