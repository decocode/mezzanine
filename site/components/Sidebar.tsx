import { Button, Disclosure, DisclosurePanel, Heading, NavTree, PanelLeftCloseIcon, PanelLeftOpenIcon, Sidebar as MezzanineSidebar, SidebarPanel } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { sidebarNavigationItems } from './sidebarNavigationItems'

interface SidebarProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

function Navigation({ currentPage, 'aria-label': label = 'Mezzanine sections', navigationLabel = 'Mezzanine documentation' }: SidebarProps) {
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

// CSS shows the mobile Disclosure or the desktop column, never both.
export function Sidebar(props: SidebarProps) {
  return (
    <div className="site-sidebar">
      <Disclosure className="mobile-sidebar">
        {({ isExpanded }) => <>
        <Heading className="mobile-sidebar-heading" level={2}>
          <Button
            size="sm"
            iconLeading={isExpanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
            slot="trigger"
            variant="tertiary"
          >
            Browse sections
          </Button>
        </Heading>
        <DisclosurePanel className="mobile-sidebar-panel">
          <Navigation {...props} />
        </DisclosurePanel>
        </>}
      </Disclosure>

      <div className="desktop-sidebar">
        <Navigation {...props} />
      </div>
    </div>
  )
}
