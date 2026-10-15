import { Navbar, Link } from '@decocode/mezzanine'
import { findSitePage } from '../siteStructure'
import type { Theme } from '../themeSwitcherLogic'
import { ThemeSwitcher } from './ThemeSwitcher'
import { DocsNavigation } from './Sidebar'

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
  const currentPage = currentPath === '/' ? undefined : findSitePage(currentPath)
  const isDocsPage = currentPage != null

  return (
    <Navbar aria-label="Showcase navigation" actions={<ThemeSwitcher onThemeChange={onThemeChange} selectedTheme={selectedTheme} />} brand={(
      <Link
        aria-current={currentPath === '/' ? 'page' : undefined}
        aria-label="Mezzanine home"
        className="site-name"
        data-no-wireframe-underline
        href="/"
      >
        <span aria-hidden="true" className="site-logo" />
        <span className="site-name-text">Mezzanine</span>
      </Link>
    )}>
      {({ closeMenu, isMenu }) => (
        <>
          <Link className="navbar-link" aria-current={currentPath === '/introduction' ? 'page' : isDocsPage ? true : undefined} href="/introduction" onPress={closeMenu}>Docs</Link>
          {/* In the menu, the docs sections sit under Docs. Choosing a page closes the menu; group buttons only expand. */}
          {isMenu && currentPage && (
            <div onClickCapture={(event) => {
              if (event.target instanceof Element && event.target.closest('a[href]')) closeMenu()
            }}>
              <DocsNavigation currentPage={currentPage} />
            </div>
          )}
          <Link className="navbar-link" href="/site/lab" onPress={closeMenu}>Lab</Link>
        </>
      )}
    </Navbar>
  )
}
