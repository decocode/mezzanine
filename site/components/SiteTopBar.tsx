import type { ReactNode } from 'react'
import { TopBar, Link } from '@decocode/mezzanine'
import { findSitePage } from '../siteStructure'
import type { Theme } from '../themeSwitcherLogic'
import { SiteThemeSwitcher } from './SiteThemeSwitcher'
import { DocsNavigation } from './NavigationPanel'
import { SiteSearch } from './SiteSearch'
import { docsSearchSection, type SearchSection } from './siteSearchLogic'

interface SiteTopBarProps {
  currentPath: string
  onThemeChange: (selection: Theme) => void
  selectedTheme: Theme
  // The Lab's own navigation, shown under Lab in the narrow-screen menu.
  labNavigation?: ReactNode
  // What Search lists. Docs pages unless given, such as the Lab's own sections.
  searchSections?: readonly SearchSection[]
}

export function SiteTopBar({
  currentPath,
  onThemeChange,
  selectedTheme,
  labNavigation,
  searchSections = [docsSearchSection],
}: SiteTopBarProps) {
  const currentPage = currentPath === '/' ? undefined : findSitePage(currentPath)
  const isDocsPage = currentPage != null
  const labCurrent = currentPath === '/site/lab' ? 'page' : currentPath.startsWith('/site/lab/') ? true : undefined

  return (
    <TopBar aria-label="Primary" actions={({ isMenu }) => <>
      <SiteSearch sections={searchSections} />
      <SiteThemeSwitcher isMenu={isMenu} onThemeChange={onThemeChange} selectedTheme={selectedTheme} />
    </>} brand={null}>
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
            <Link className="mz-top-bar-link" aria-current={currentPath === '/' ? 'page' : undefined} href="/" onPress={closeMenu}>Home</Link>
            <Link className="mz-top-bar-link" aria-current={currentPath === '/introduction' ? 'page' : isDocsPage ? true : undefined} href="/introduction" onPress={closeMenu}>Docs</Link>
            {isMenu && currentPage && inMenu(<DocsNavigation currentPage={currentPage} />)}
            <Link className="mz-top-bar-link" aria-current={labCurrent} href="/site/lab" onPress={closeMenu}>Lab</Link>
            {isMenu && labNavigation != null && inMenu(labNavigation)}
          </>
        )
      }}
    </TopBar>
  )
}
