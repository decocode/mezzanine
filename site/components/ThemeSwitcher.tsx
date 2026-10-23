import { LayoutIcon, MoonIcon, SunIcon, ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { useSyncExternalStore } from 'react'
import { getDisplayedTheme, isTheme, prefersDarkColorScheme, subscribeToColorScheme, type Theme } from '../themeSwitcherLogic'

interface ThemeSwitcherProps {
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
}

export function ThemeSwitcher({ onThemeChange, selectedTheme }: ThemeSwitcherProps) {
  const prefersDark = useSyncExternalStore(subscribeToColorScheme, prefersDarkColorScheme)
  const displayedTheme = getDisplayedTheme(selectedTheme, prefersDark)

  return (
    <ToggleButtonGroup
      aria-label="Theme"
      className="theme-toggle-group"
      size="sm"
      hierarchy="secondary"
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const selectedKey = keys.values().next().value
        if (typeof selectedKey === 'string' && isTheme(selectedKey)) {
          onThemeChange(selectedKey)
        }
      }}
      selectedKeys={[displayedTheme]}
      selectionMode="single"
    >
      <ToggleButton id="light" iconLeading={<SunIcon />} labelPlacement="tooltip" tooltipPlacement="bottom">Light theme</ToggleButton>
      <ToggleButton id="dark" iconLeading={<MoonIcon />} labelPlacement="tooltip" tooltipPlacement="bottom">Dark theme</ToggleButton>
      <ToggleButton id="wireframe" iconLeading={<LayoutIcon />} labelPlacement="tooltip" tooltipPlacement="bottom">Wireframe theme</ToggleButton>
    </ToggleButtonGroup>
  )
}
