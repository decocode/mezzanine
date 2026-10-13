import { Navbar, Link } from '@decocode/mezzanine'
import type { Theme } from '../themeSwitcherLogic'
import { ThemeSwitcher } from './ThemeSwitcher'

interface MezzanineNavbarProps {
  currentPath: string
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
}

export function MezzanineNavbar({
  currentPath,
  onThemeChange,
  selectedTheme,
}: MezzanineNavbarProps) {
  return (
    <Navbar aria-label="Showcase navigation" actions={<ThemeSwitcher onThemeChange={onThemeChange} selectedTheme={selectedTheme} />} brand={(
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
