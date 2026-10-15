import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { siteNavigationGroups, type SiteNavigationGroup } from '../siteStructure'

// Within each group, implemented pages and subgroups come first in alphabetical
// order, followed by WIP pages, also alphabetical.
function byStatusThenLabel(a: { label: string; isWip: boolean }, b: { label: string; isWip: boolean }) {
  return Number(a.isWip) - Number(b.isWip) || a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })
}

function groupItem(group: SiteNavigationGroup): NavTreeItemData {
  const children = [
    ...(group.groups ?? []).map(child => ({ label: child.label, isWip: false, item: groupItem(child) })),
    ...group.pages.map(page => ({
      label: page.label,
      isWip: page.status === 'empty',
      item: {
        id: page.id, label: page.label, href: page.path,
        content: page.status === 'empty' ? <Badge variant="info">WIP</Badge> : undefined,
      },
    })),
  ]
  return {
    id: group.id, label: group.label, href: group.path,
    children: children.sort(byStatusThenLabel).map(child => child.item),
  }
}

// Top-level groups keep their reading order: Get started, Principles,
// Foundations, Styles, Themes, Components.
export const sidebarNavigationItems = siteNavigationGroups.map(groupItem)
