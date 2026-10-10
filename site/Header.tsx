import { useState } from 'react'
import {
  Button,
  Heading,
} from 'react-aria-components'
import {
  Disclosure,
  DisclosurePanel,
  Link,
  MoonIcon,
  PlaceholderIcon,
  SunIcon,
  ToggleButton,
  ToggleButtonGroup,
} from '@decocode/mezzanine'
import {
  isThemeSelection,
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

function getDisplayedThemeSelection(themeSelection: ThemeSelection) {
  if (themeSelection !== 'system') return themeSelection
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggleButtonGroup({ onThemeSelectionChange, themeSelection }: ThemeControlProps) {
  const displayedThemeSelection = getDisplayedThemeSelection(themeSelection)

  return (
    <ToggleButtonGroup
      aria-label="Theme"
      className="theme-toggle-group"
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const selectedKey = keys.values().next().value
        if (typeof selectedKey === 'string' && isThemeSelection(selectedKey)) {
          onThemeSelectionChange(selectedKey)
        }
      }}
      selectedKeys={[displayedThemeSelection]}
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
      <ThemeToggleButtonGroup
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
