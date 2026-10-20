import type { ReactNode } from 'react'
import { NavTree, Sidebar as MezzanineSidebar, SidebarPanel, type NavTreeItemData } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { sidebarNavigationItems } from './sidebarNavigationItems'

interface NavigationPanelProps {
  'aria-label': string
  navigationLabel: string
  items: NavTreeItemData[]
  selectedRoute: string
}

// A section's navigation tree, in its Panel or the Navbar menu. Docs and the Lab each pass their own items.
export function NavigationPanel({ 'aria-label': label, navigationLabel, items, selectedRoute }: NavigationPanelProps) {
  return (
    <nav aria-label={label}>
      <NavTree aria-label={navigationLabel} selectedRoute={selectedRoute} items={items} />
    </nav>
  )
}

interface DocsNavigationProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

export function DocsNavigation({ currentPage, 'aria-label': label = 'Mezzanine sections', navigationLabel = 'Mezzanine documentation' }: DocsNavigationProps) {
  return <NavigationPanel aria-label={label} navigationLabel={navigationLabel} items={sidebarNavigationItems} selectedRoute={currentPage.path} />
}

// The navigation column on wider screens. On narrow screens the same navigation sits
// in the Navbar menu instead (see MezzanineNavbar).
export function SidebarColumn({ children }: { children: ReactNode }) {
  return (
    <div className="site-sidebar">
      <div className="desktop-sidebar">
        {children}
      </div>
    </div>
  )
}

// The Sidebar page's example: the docs navigation in the library Sidebar, as the site used it before
// AppShell. It goes when Sidebar is removed.
export function Sidebar({ 'aria-label': label = 'Mezzanine sections', ...props }: DocsNavigationProps) {
  return (
    <SidebarColumn>
      <MezzanineSidebar presentation="inline" isCollapsible={false}>
        <SidebarPanel title={label} hideInlineHeader className="site-sidebar-panel">
          <DocsNavigation aria-label={label} {...props} />
        </SidebarPanel>
      </MezzanineSidebar>
    </SidebarColumn>
  )
}
