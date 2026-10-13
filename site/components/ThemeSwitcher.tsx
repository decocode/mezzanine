import { MoonIcon, PlaceholderIcon, SunIcon, ToggleButton, ToggleButtonGroup, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
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
      <TooltipTrigger>
        <ToggleButton aria-label="Light theme" id="light">
          <SunIcon />
        </ToggleButton>
        <Tooltip placement="bottom">Light theme</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ToggleButton aria-label="Dark theme" id="dark">
          <MoonIcon />
        </ToggleButton>
        <Tooltip placement="bottom">Dark theme</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ToggleButton aria-label="Wireframe theme" id="wireframe">
          <PlaceholderIcon />
        </ToggleButton>
        <Tooltip placement="bottom">Wireframe theme</Tooltip>
      </TooltipTrigger>
    </ToggleButtonGroup>
  )
}
