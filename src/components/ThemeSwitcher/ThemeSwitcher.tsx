import { useSyncExternalStore, type ReactNode } from 'react'
import type { TooltipProps } from 'react-aria-components/Tooltip'
import { Button, type ButtonHierarchy, type ButtonSize } from '../Button/Button'
import { Header } from '../ListBox/ListBox'
import { Menu, MenuItem, MenuSection, MenuTrigger } from '../Menu/Menu'
import { Popover } from '../Popover/Popover'
import { ContrastIcon, LayoutIcon, MoonIcon, SunIcon } from '../../icons/Icons'

// The themes Mezzanine ships: Light, Dark and Wireframe, and System, which follows the device's light or
// dark setting, as data-theme="system" does.
export type ThemeName = 'light' | 'dark' | 'system' | 'wireframe'

export interface ThemeSwitcherProps {
  // The theme shown now. The app applies it, for example as data-theme on the page.
  selectedTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  // The menu's heading, and the end of the button's name and tooltip, such as "Theme" in "Switch theme".
  label?: string
  // iconOnly, the default, shows only the theme's icon, with "Switch theme" in a tooltip. leading shows
  // those words after the icon, for places with room, such as a narrow screen's menu.
  iconPosition?: 'iconOnly' | 'leading'
  size?: ButtonSize
  hierarchy?: ButtonHierarchy
  tooltipPosition?: TooltipProps['placement']
  className?: string
}

const themes: { id: ThemeName; label: string; icon: ReactNode }[] = [
  { id: 'system', label: 'System', icon: <ContrastIcon /> },
  { id: 'light', label: 'Light', icon: <SunIcon /> },
  { id: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { id: 'wireframe', label: 'Wireframe', icon: <LayoutIcon /> },
]

// Whether the device is set to dark, so System can say which theme it shows now, such as "System (Dark)".
const darkScheme = '(prefers-color-scheme: dark)'
const subscribeToDarkScheme = (onChange: () => void) => {
  const query = window.matchMedia(darkScheme)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const prefersDark = () => window.matchMedia(darkScheme).matches
const prefersDarkOnServer = () => false


const isThemeName = (key: unknown): key is ThemeName => themes.some((theme) => theme.id === key)

// Chooses a theme. It's a control, so it's a menu button rather than a form field: pressing the button,
// which shows the current theme's icon, opens a menu headed "Theme", with a tick by the current theme.
// System comes first, and names the theme it shows now.
export function ThemeSwitcher({ selectedTheme, onThemeChange, label = 'Theme', iconPosition = 'iconOnly', size = 'sm', hierarchy = 'secondary', tooltipPosition, className }: ThemeSwitcherProps) {
  const current = themes.find((theme) => theme.id === selectedTheme) ?? themes[0]
  const isDark = useSyncExternalStore(subscribeToDarkScheme, prefersDark, prefersDarkOnServer)
  const name = `Switch ${label.toLowerCase()}`
  const optionLabel = (theme: (typeof themes)[number]) => theme.id === 'system' ? `${theme.label} (${isDark ? 'Dark' : 'Light'})` : theme.label
  return (
    <MenuTrigger>
      {iconPosition === 'iconOnly'
        ? <Button className={['mz-theme-switcher', className].filter(Boolean).join(' ')} hierarchy={hierarchy} size={size} icon={current.icon} iconPosition="iconOnly" tooltipPosition={tooltipPosition}>{name}</Button>
        : <Button className={['mz-theme-switcher', className].filter(Boolean).join(' ')} hierarchy={hierarchy} size={size} icon={current.icon}>{name}</Button>}
      <Popover placement="bottom end">
        <Menu
          aria-label={label}
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[current.id]}
          onSelectionChange={(keys) => {
            const [key] = keys === 'all' ? [] : [...keys]
            if (isThemeName(key)) onThemeChange(key)
          }}
        >
          <MenuSection>
            <Header>{label}</Header>
            {themes.map((theme) => (
              <MenuItem key={theme.id} id={theme.id} textValue={optionLabel(theme)}>
                <span className="mz-theme-switcher-option">
                  <span className="mz-theme-switcher-option-icon" aria-hidden="true">{theme.icon}</span>
                  {optionLabel(theme)}
                </span>
              </MenuItem>
            ))}
          </MenuSection>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
