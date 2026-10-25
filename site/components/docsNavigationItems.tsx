import { Badge, type NavTreeItemData, type NavTreeSectionData } from '@decocode/mezzanine'
import { siteNavigationGroups, type SiteNavigationGroup } from '../siteStructure'

// Within each group, implemented pages and subgroups come first in alphabetical
// order, followed by WIP pages, also alphabetical. A group with an order lists them in that order.
function byStatusThenLabel(a: { label: string; isWip: boolean }, b: { label: string; isWip: boolean }) {
  return Number(a.isWip) - Number(b.isWip) || a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })
}

function groupChildren(group: SiteNavigationGroup): NavTreeItemData[] {
  const children = [
    ...(group.groups ?? []).map(child => ({ id: child.id, label: child.label, isWip: false, item: groupItem(child) })),
    ...group.pages.map(page => ({
      id: page.id,
      label: page.label,
      isWip: page.status === 'empty',
      item: {
        id: page.id, label: page.label, href: page.path,
        content: page.status === 'empty' ? <Badge purpose="info">WIP</Badge> : undefined,
      },
    })),
  ]
  const { order } = group
  const sorted = order
    ? children.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    : children.sort(byStatusThenLabel)
  return sorted.map(child => child.item)
}

// A group inside a section is an expandable row, linked when the group has its own page.
function groupItem(group: SiteNavigationGroup): NavTreeItemData {
  return { id: group.id, label: group.label, href: group.path, children: groupChildren(group) }
}

// Top-level groups are sections with a heading, in their reading order: Get started, Foundations,
// Components.
export const docsNavigationItems: NavTreeSectionData[] = siteNavigationGroups.map(group => ({
  type: 'section', id: group.id, label: group.label, children: groupChildren(group),
}))
