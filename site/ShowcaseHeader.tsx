import {
  Header,
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

interface ShowcaseHeaderProps extends ThemeControlProps {
  currentPath: string
}

interface HeaderNavigationProps extends ShowcaseHeaderProps {
  onNavigate?: () => void
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

export function ShowcaseHeader({
  currentPath,
  onThemeSelectionChange,
  themeSelection,
}: ShowcaseHeaderProps) {
  return (
    <Header brand={(
      <Link
        aria-current={currentPath === '/' ? 'page' : undefined}
        className="site-name"
        href="/"
      >
        Mezzanine
      </Link>
    )}>
      {({ closeMenu }) => (
        <HeaderNavigation
          currentPath={currentPath}
          onNavigate={closeMenu}
          onThemeSelectionChange={onThemeSelectionChange}
          themeSelection={themeSelection}
        />
      )}
    </Header>
  )
}
