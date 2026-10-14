import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { siteNavigationGroups, type SiteNavigationGroup } from '../siteStructure'

function groupItem(group: SiteNavigationGroup): NavTreeItemData {
  return {
    id: group.id, label: group.label, href: group.path,
    children: [
      ...(group.groups ?? []).map(groupItem),
      ...group.pages.map(page => ({
        id: page.id, label: page.label, href: page.path,
        content: page.status === 'empty' ? <Badge variant="info">WIP</Badge> : undefined,
      })),
    ],
  }
}
export const sidebarNavigationItems = siteNavigationGroups.map(groupItem)
