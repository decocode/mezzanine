import { Button, Heading } from 'react-aria-components'
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Link,
} from '@decocode/mezzanine'
import { SidebarDisclosureItem } from './SidebarDisclosureItem'
import {
  findSiteNavigationGroup,
  siteNavigationGroups,
  type SitePageDefinition,
} from './siteNavigation'

interface SidebarProps {
  currentPage: SitePageDefinition
}

function BrowseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="sidebar-browse-icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function SidebarNavigation({ currentPage }: SidebarProps) {
  const currentGroup = findSiteNavigationGroup(currentPage.id)

  return (
    <DisclosureGroup
      allowsMultipleExpanded
      className="sidebar-navigation-groups"
      defaultExpandedKeys={currentGroup ? [currentGroup.id] : []}
    >
      {siteNavigationGroups.map((group) => (
        <SidebarDisclosureItem id={group.id} key={group.id} title={group.label}>
          {group.pages.map((page) => (
            <Link
              aria-current={currentPage.id === page.id ? 'page' : undefined}
              className="sidebar-navigation-link"
              href={page.path}
              key={page.id}
            >
              <span>{page.label}</span>
              {page.status === 'empty' && (
                <span className="sidebar-page-status">Empty</span>
              )}
            </Link>
          ))}
        </SidebarDisclosureItem>
      ))}
    </DisclosureGroup>
  )
}

export function Sidebar({ currentPage }: SidebarProps) {
  return (
    <nav aria-label="Mezzanine sections" className="site-sidebar">
      <Disclosure className="mobile-sidebar">
        <Heading className="mobile-sidebar-heading" level={2}>
          <Button className="sidebar-browse-trigger" slot="trigger">
            <BrowseIcon />
            Browse sections
          </Button>
        </Heading>
        <DisclosurePanel className="mobile-sidebar-panel">
          <SidebarNavigation currentPage={currentPage} />
        </DisclosurePanel>
      </Disclosure>

      <div className="desktop-sidebar">
        <SidebarNavigation currentPage={currentPage} />
      </div>
    </nav>
  )
}
