import { Component, lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import { Button, Disclosure, DisclosurePanel, Heading, MenuIcon } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { useSidebarNavigationVisibility } from './useSidebarNavigationVisibility'

const SidebarNavigation = lazy(() => import('./SidebarNavigation'))

interface SidebarProps {
  currentPage: SitePageDefinition
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

function LoadedNavigation({ currentPage }: SidebarProps) {
  return (
    <NavigationLoadBoundary>
      <Suspense fallback={<p role="status">Loading navigation…</p>}>
        <SidebarNavigation currentPage={currentPage} />
      </Suspense>
    </NavigationLoadBoundary>
  )
}

export function Sidebar({ currentPage }: SidebarProps) {
  const desktopRef = useRef<HTMLDivElement>(null)
  const desktopRequested = useSidebarNavigationVisibility(desktopRef)
  const [mobileRequested, setMobileRequested] = useState(false)

  return (
    <nav aria-label="Mezzanine sections" className="site-sidebar">
      <Disclosure className="mobile-sidebar" onExpandedChange={(isExpanded) => {
        if (isExpanded) setMobileRequested(true)
      }}>
        <Heading className="mobile-sidebar-heading" level={2}>
          <Button
            className="sidebar-browse-trigger"
            iconLeading={<MenuIcon />}
            slot="trigger"
            variant="tertiary"
          >
            Browse sections
          </Button>
        </Heading>
        <DisclosurePanel className="mobile-sidebar-panel">
          {mobileRequested && <LoadedNavigation currentPage={currentPage} />}
        </DisclosurePanel>
      </Disclosure>

      <div className="desktop-sidebar" ref={desktopRef}>
        {desktopRequested && <LoadedNavigation currentPage={currentPage} />}
      </div>
    </nav>
  )
}
