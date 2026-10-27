import { ThemeSwitcher } from '@decocode/mezzanine'
import { isTheme, type Theme } from '../themeSwitcherLogic'

interface SiteThemeSwitcherProps {
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
  // In the narrow-screen menu, the switcher shows "Dark theme" as text; in the bar, only the icon,
  // with the same words in a tooltip.
  isMenu?: boolean
}

// The library's ThemeSwitcher, with the site's remembered choice. System, the choice before anyone
// picks, follows the device's light or dark setting.
export function SiteThemeSwitcher({ onThemeChange, selectedTheme, isMenu = false }: SiteThemeSwitcherProps) {
  return (
    <ThemeSwitcher
      selectedTheme={selectedTheme}
      onThemeChange={(theme) => { if (isTheme(theme)) onThemeChange(theme) }}
      iconPosition={isMenu ? 'leading' : 'iconOnly'}
      tooltipPosition="bottom"
    />
  )
}
