import { useState } from 'react'
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
  Label,
  Link,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components'
import {
  isThemeSelection,
  themeSelections,
  type ThemeSelection,
} from './themeSelection'

interface ThemeControlProps {
  onThemeSelectionChange: (selection: ThemeSelection) => void
  themeSelection: ThemeSelection
}

interface HeaderProps extends ThemeControlProps {
  currentPath: string
}

interface HeaderNavigationProps extends HeaderProps {
  onNavigate?: () => void
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="menu-trigger-icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function ThemeSelect({ onThemeSelectionChange, themeSelection }: ThemeControlProps) {
  return (
    <Select
      aria-label="Theme"
      className="theme-select"
      onSelectionChange={(key) => {
        if (typeof key === 'string' && isThemeSelection(key)) {
          onThemeSelectionChange(key)
        }
      }}
      selectedKey={themeSelection}
    >
      <Label>Theme</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▾</span>
      </Button>
      <Popover className="theme-popover" placement="bottom end">
        <ListBox items={themeSelections} className="theme-listbox">
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.label}>
              {({ isSelected }) => (
                <>
                  <span>{item.label}</span>
                  {isSelected && <span aria-hidden="true">✓</span>}
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  )
}

function HeaderNavigation({
  currentPath,
  onNavigate,
  onThemeSelectionChange,
  themeSelection,
}: HeaderNavigationProps) {
  return (
    <nav aria-label="Showcase navigation" className="showcase-navigation">
      <Link
        aria-current={currentPath === '/introduction' ? 'page' : undefined}
        href="/introduction"
        onPress={onNavigate}
      >
        Docs
      </Link>
      <ThemeSelect
        onThemeSelectionChange={onThemeSelectionChange}
        themeSelection={themeSelection}
      />
    </nav>
  )
}

export function Header({
  currentPath,
  onThemeSelectionChange,
  themeSelection,
}: HeaderProps) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const closeMenu = () => setIsMenuExpanded(false)

  return (
    <header className="global-header">
      <Link
        aria-current={currentPath === '/' ? 'page' : undefined}
        className="site-name"
        href="/"
        onPress={closeMenu}
      >
        Mezzanine
      </Link>

      <Disclosure
        className="mobile-navigation"
        isExpanded={isMenuExpanded}
        onExpandedChange={setIsMenuExpanded}
      >
        <Heading className="mobile-navigation-heading" level={2}>
          <Button className="menu-trigger" slot="trigger">
            <MenuIcon />
            Menu
          </Button>
        </Heading>
        <DisclosurePanel className="mobile-navigation-panel">
          <HeaderNavigation
            currentPath={currentPath}
            onNavigate={closeMenu}
            onThemeSelectionChange={onThemeSelectionChange}
            themeSelection={themeSelection}
          />
        </DisclosurePanel>
      </Disclosure>

      <div className="desktop-navigation">
        <HeaderNavigation
          currentPath={currentPath}
          onThemeSelectionChange={onThemeSelectionChange}
          themeSelection={themeSelection}
        />
      </div>
    </header>
  )
}
