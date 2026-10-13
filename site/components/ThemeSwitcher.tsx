import { MoonIcon, PlaceholderIcon, SunIcon, ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { getDisplayedTheme, isTheme, type Theme } from '../themeSwitcherLogic'

interface ThemeSwitcherProps {
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
}

export function ThemeSwitcher({ onThemeChange, selectedTheme }: ThemeSwitcherProps) {
  const displayedTheme = getDisplayedTheme(selectedTheme)

  return (
    <ToggleButtonGroup
      aria-label="Theme"
      className="theme-toggle-group"
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
      <ToggleButton aria-label="Light theme" id="light">
        <SunIcon />
      </ToggleButton>
      <ToggleButton aria-label="Dark theme" id="dark">
        <MoonIcon />
      </ToggleButton>
      <ToggleButton aria-label="Wireframe theme" id="wireframe">
        <PlaceholderIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
