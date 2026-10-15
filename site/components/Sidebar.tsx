import { NavTree, Sidebar as MezzanineSidebar, SidebarPanel } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { sidebarNavigationItems } from './sidebarNavigationItems'

interface SidebarProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

export function DocsNavigation({ currentPage, 'aria-label': label = 'Mezzanine sections', navigationLabel = 'Mezzanine documentation' }: SidebarProps) {
  return (
    <MezzanineSidebar presentation="inline" isCollapsible={false}>
      <SidebarPanel title={label} hideInlineHeader className="site-sidebar-panel">
        <nav aria-label={label}>
          <NavTree aria-label={navigationLabel} selectedRoute={currentPage.path} items={sidebarNavigationItems} />
        </nav>
      </SidebarPanel>
    </MezzanineSidebar>
  )
}

// The docs column on wider screens. On narrow screens the same navigation sits
// in the Navbar menu instead (see MezzanineNavbar).
export function Sidebar(props: SidebarProps) {
  return (
    <div className="site-sidebar">
      <div className="desktop-sidebar">
        <DocsNavigation {...props} />
      </div>
    </div>
  )
}
