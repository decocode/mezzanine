import {
  Navbar,
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

export function ShowcaseHeader({
  currentPath,
  onThemeSelectionChange,
  themeSelection,
}: ShowcaseHeaderProps) {
  return (
    <Navbar aria-label="Showcase navigation" actions={<ThemeToggleButtonGroup onThemeSelectionChange={onThemeSelectionChange} themeSelection={themeSelection} />} brand={(
      <Link
        aria-current={currentPath === '/' ? 'page' : undefined}
        aria-label="Mezzanine home"
        className="site-name"
        href="/"
      >
        <span aria-hidden="true" className="site-logo" />
        Mezzanine
      </Link>
    )}>
      {({ closeMenu }) => (
        <Link className="showcase-navigation-link" aria-current={currentPath === '/introduction' ? 'page' : undefined} href="/introduction" onPress={closeMenu}>Docs</Link>
      )}
    </Navbar>
  )
}
