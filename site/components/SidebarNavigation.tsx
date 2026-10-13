import {
  Badge,
  Button,
  ChevronDownIcon,
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
} from '../siteStructure'
import { useAnimatedNavigationTree } from '@decocode/mezzanine'


interface SidebarNavigationProps {
  currentPage: SitePageDefinition
}

export default function SidebarNavigation({ currentPage }: SidebarNavigationProps) {
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
          className={`react-aria-NavigationTreeItem sidebar-navigation-tree-group${group.path ? ' mezzanine-navigation-tree-item-has-link' : ''}${parentIsOpening || parentIsClosing ? ' mezzanine-navigation-tree-item-animated' : ''}${parentIsOpening ? ' mezzanine-navigation-tree-item-opening' : ''}${childrenAreClosing ? ' mezzanine-navigation-tree-item-closing' : ''}`}
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
              className={`react-aria-NavigationTreeItem mezzanine-navigation-tree-item-animated${childrenAreOpening ? ' mezzanine-navigation-tree-item-opening' : ''}${childrenAreClosing ? ' mezzanine-navigation-tree-item-closing' : ''}`}
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
