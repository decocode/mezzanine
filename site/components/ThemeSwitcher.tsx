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
      <ToggleButton id="light" icon={<SunIcon />} iconPosition="iconOnly" tooltipPosition="bottom">Light theme</ToggleButton>
      <ToggleButton id="dark" icon={<MoonIcon />} iconPosition="iconOnly" tooltipPosition="bottom">Dark theme</ToggleButton>
      <ToggleButton id="wireframe" icon={<LayoutIcon />} iconPosition="iconOnly" tooltipPosition="bottom">Wireframe theme</ToggleButton>
    </ToggleButtonGroup>
  )
}
