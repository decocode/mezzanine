import { LayoutIcon, ListBoxItem, MoonIcon, Select, SunIcon } from '@decocode/mezzanine'
import { useSyncExternalStore, type ReactNode } from 'react'
import { getDisplayedTheme, isTheme, prefersDarkColorScheme, subscribeToColorScheme, type Theme } from '../themeSwitcherLogic'

interface ThemeSwitcherProps {
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
  // In the narrow-screen menu, the Select shows its "Theme" label; in the bar, the label is for screen
  // readers only.
  isMenu?: boolean
}

const themeOptions: { id: Theme; label: string; icon: ReactNode }[] = [
  { id: 'light', label: 'Light', icon: <SunIcon /> },
  { id: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { id: 'wireframe', label: 'Wireframe', icon: <LayoutIcon /> },
]

// A Select, so more themes can join the list. In the bar it shows only the chosen theme's icon, with
// "Theme" in a tooltip; in the menu, the theme's name with its visible label.
export function ThemeSwitcher({ onThemeChange, selectedTheme, isMenu = false }: ThemeSwitcherProps) {
  const prefersDark = useSyncExternalStore(subscribeToColorScheme, prefersDarkColorScheme)
  const displayedTheme = getDisplayedTheme(selectedTheme, prefersDark)

  return (
    <Select
      {...(isMenu ? { label: 'Theme' } : { 'aria-label': 'Theme', size: 'sm', valuePosition: 'iconOnly', tooltipPosition: 'bottom' } as const)}
      hierarchy="secondary"
      selectedKey={displayedTheme}
      onSelectionChange={(key) => {
        if (typeof key === 'string' && isTheme(key)) onThemeChange(key)
      }}
    >
      {themeOptions.map((option) => <ListBoxItem key={option.id} id={option.id} icon={option.icon}>{option.label}</ListBoxItem>)}
    </Select>
  )
}
