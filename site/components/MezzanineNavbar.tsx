import type { ReactNode } from 'react'
import { Navbar, Link } from '@decocode/mezzanine'
import { findSitePage } from '../siteStructure'
import type { Theme } from '../themeSwitcherLogic'
import { ThemeSwitcher } from './ThemeSwitcher'
import { DocsNavigation } from './Sidebar'

interface MezzanineNavbarProps {
  currentPath: string
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
  // The Lab's own navigation, shown under Lab in the narrow-screen menu.
  labNavigation?: ReactNode
}

export function MezzanineNavbar({
  currentPath,
  onThemeChange,
  selectedTheme,
  labNavigation,
}: MezzanineNavbarProps) {
  const currentPage = currentPath === '/' ? undefined : findSitePage(currentPath)
  const isDocsPage = currentPage != null
  const labCurrent = currentPath === '/site/lab' ? 'page' : currentPath.startsWith('/site/lab/') ? true : undefined

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
      {({ closeMenu, isMenu }) => {
        // In the menu, each section's navigation sits under its link. Choosing a page closes the menu; group buttons only expand.
        const inMenu = (navigation: ReactNode) => (
          <div onClickCapture={(event) => {
            if (event.target instanceof Element && event.target.closest('a[href]')) closeMenu()
          }}>
            {navigation}
          </div>
        )
        return (
          <>
            <Link className="navbar-link" aria-current={currentPath === '/introduction' ? 'page' : isDocsPage ? true : undefined} href="/introduction" onPress={closeMenu}>Docs</Link>
            {isMenu && currentPage && inMenu(<DocsNavigation currentPage={currentPage} />)}
            <Link className="navbar-link" aria-current={labCurrent} href="/site/lab" onPress={closeMenu}>Lab</Link>
            {isMenu && labNavigation != null && inMenu(labNavigation)}
          </>
        )
      }}
    </Navbar>
  )
}
