import { Button as ReactAriaButton, Heading } from 'react-aria-components'
import {
  Button,
  ChevronDownIcon,
  Disclosure,
  DisclosurePanel,
  Link,
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeItemContent,
} from '@decocode/mezzanine'
import {
  findSiteNavigationGroup,
  siteNavigationGroups,
  type SitePageDefinition,
} from './siteNavigation'
import { useAnimatedNavigationTree } from './useAnimatedNavigationTree'

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
  const {
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  } = useAnimatedNavigationTree(currentGroup ? [currentGroup.id] : [])

  return (
    <NavigationTree
      aria-label="Mezzanine documentation"
      className="react-aria-NavigationTree animated-navigation-tree"
      expandedKeys={expandedKeys}
      onExpandedChange={onExpandedChange}
      selectedRoute={currentPage.path}
    >
      {siteNavigationGroups.map((group) => (
        <NavigationTreeItem
          className={`react-aria-NavigationTreeItem sidebar-navigation-tree-group${closingKeys.has(group.id) ? ' is-closing' : ''}`}
          id={group.id}
          key={group.id}
          textValue={group.label}
        >
          <NavigationTreeItemContent>
            <Link>{group.label}</Link>
            <Button
              aria-label={`Expand or collapse ${group.label}`}
              iconLeading={<ChevronDownIcon />}
              size="sm"
              slot="chevron"
              variant="tertiary"
            />
          </NavigationTreeItemContent>
          {group.pages.map((page) => (
            <NavigationTreeItem
              className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has(group.id) ? ' is-opening' : ''}${closingKeys.has(group.id) ? ' is-closing' : ''}`}
              href={page.path}
              id={page.id}
              key={page.id}
              textValue={page.label}
            >
              <NavigationTreeItemContent>
                <Link>
                  <span>{page.label}</span>
                  {page.status === 'empty' && (
                    <span className="sidebar-page-status">Empty</span>
                  )}
                </Link>
              </NavigationTreeItemContent>
            </NavigationTreeItem>
          ))}
        </NavigationTreeItem>
      ))}
    </NavigationTree>
  )
}

export function Sidebar({ currentPage }: SidebarProps) {
  return (
    <nav aria-label="Mezzanine sections" className="site-sidebar">
      <Disclosure className="mobile-sidebar">
        <Heading className="mobile-sidebar-heading" level={2}>
          <ReactAriaButton className="sidebar-browse-trigger" slot="trigger">
            <BrowseIcon />
            Browse sections
          </ReactAriaButton>
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
