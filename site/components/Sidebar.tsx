import { Component, lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import { Button, Disclosure, DisclosurePanel, Heading, PanelLeftCloseIcon, PanelLeftOpenIcon, Sidebar as MezzanineSidebar, SidebarPanel } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { useSidebarNavigationVisibility } from './useSidebarNavigationVisibility'

const SidebarNavigation = lazy(() => import('./SidebarNavigation'))

interface SidebarProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

class NavigationLoadBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <>
        <p role="alert">Unable to load navigation.</p>
        <Button onPress={() => window.location.reload()}>Reload page</Button>
      </>
    }
    return this.props.children
  }
}

function LoadedNavigation({ currentPage, 'aria-label': label = 'Mezzanine sections', navigationLabel }: SidebarProps) {
  return (
    <MezzanineSidebar presentation="inline" isCollapsible={false}>
      <SidebarPanel title={label} hideInlineHeader className="site-sidebar-panel">
        <nav aria-label={label}>
          <NavigationLoadBoundary>
            <Suspense fallback={<p role="status">Loading navigation…</p>}>
              <SidebarNavigation currentPage={currentPage} aria-label={navigationLabel} />
            </Suspense>
          </NavigationLoadBoundary>
        </nav>
      </SidebarPanel>
    </MezzanineSidebar>
  )
}

export function Sidebar(props: SidebarProps) {
  const desktopRef = useRef<HTMLDivElement>(null)
  const desktopRequested = useSidebarNavigationVisibility(desktopRef)
  const [mobileRequested, setMobileRequested] = useState(false)

  return (
    <div className="site-sidebar">
      <Disclosure className="mobile-sidebar" onExpandedChange={(isExpanded) => {
        if (isExpanded) setMobileRequested(true)
      }}>
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
          {mobileRequested && <LoadedNavigation {...props} />}
        </DisclosurePanel>
        </>}
      </Disclosure>

      <div className="desktop-sidebar" ref={desktopRef}>
        {desktopRequested && <LoadedNavigation {...props} />}
      </div>
    </div>
  )
}
