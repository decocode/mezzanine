import { Navbar, Link } from '@decocode/mezzanine'
import { findSitePage } from '../siteStructure'
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
  const isDocsPage = currentPath !== '/' && findSitePage(currentPath) != null

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
        <>
          <Link className="showcase-navigation-link" aria-current={currentPath === '/' ? 'page' : undefined} href="/" onPress={closeMenu}>Home</Link>
          <Link className="showcase-navigation-link" aria-current={currentPath === '/introduction' ? 'page' : isDocsPage ? true : undefined} href="/introduction" onPress={closeMenu}>Docs</Link>
        </>
      )}
    </Navbar>
  )
}
