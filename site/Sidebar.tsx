import { Button as ReactAriaButton, Heading } from 'react-aria-components'
import {
  Badge,
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
  findSiteNavigationGroups,
  siteNavigationGroups,
  type SiteNavigationGroup,
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
  const currentGroups = findSiteNavigationGroups(currentPage.id)
  const {
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  } = useAnimatedNavigationTree(currentGroups.map((group) => group.id))

  function renderGroup(group: SiteNavigationGroup, ancestorIds: string[] = []) {
    const parentIsOpening = ancestorIds.some((id) => openingKeys.has(id))
    const parentIsClosing = ancestorIds.some((id) => closingKeys.has(id))
    const childrenAreOpening = parentIsOpening || openingKeys.has(group.id)
    const childrenAreClosing = parentIsClosing || closingKeys.has(group.id)

    return (
        <NavigationTreeItem
          className={`react-aria-NavigationTreeItem sidebar-navigation-tree-group${group.path ? ' mezzanine-navigation-tree-item-has-link' : ''}${parentIsOpening || parentIsClosing ? ' animated-navigation-tree-item' : ''}${parentIsOpening ? ' is-opening' : ''}${childrenAreClosing ? ' is-closing' : ''}`}
          href={group.path}
          id={group.id}
          key={group.id}
          textValue={group.label}
        >
          <NavigationTreeItemContent>
            {group.path ? (
              <>
                <Link>{group.label}</Link>
                <Button
                  aria-label={`Expand or collapse ${group.label}`}
                  iconLeading={<ChevronDownIcon />}
                  size="sm"
                  slot="chevron"
                  variant="tertiary"
                />
              </>
            ) : (
              <Button
                aria-label={`Expand or collapse ${group.label}`}
                className="mezzanine-navigation-tree-group-toggle"
                iconTrailing={<ChevronDownIcon />}
                size="sm"
                slot="chevron"
                variant="tertiary"
              >
                {group.label}
              </Button>
            )}
          </NavigationTreeItemContent>
          {group.groups?.map((childGroup) => renderGroup(childGroup, [...ancestorIds, group.id]))}
          {group.pages.map((page) => (
            <NavigationTreeItem
              className={`react-aria-NavigationTreeItem animated-navigation-tree-item${childrenAreOpening ? ' is-opening' : ''}${childrenAreClosing ? ' is-closing' : ''}`}
              href={page.path}
              id={page.id}
              key={page.id}
              textValue={page.label}
            >
              <NavigationTreeItemContent>
                <Link>
                  <span>{page.label}</span>
                  {page.status === 'empty' && (
                    <Badge variant="info">WIP</Badge>
                  )}
                </Link>
              </NavigationTreeItemContent>
            </NavigationTreeItem>
          ))}
        </NavigationTreeItem>
    )
  }

  return (
    <NavigationTree
      aria-label="Mezzanine documentation"
      className="react-aria-NavigationTree animated-navigation-tree"
      expandedKeys={expandedKeys}
      onExpandedChange={onExpandedChange}
      selectedRoute={currentPage.path}
    >
      {siteNavigationGroups.map((group) => renderGroup(group))}
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
