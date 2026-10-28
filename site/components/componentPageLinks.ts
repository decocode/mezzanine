import { siteNavigationGroups, type SiteNavigationGroup } from '../siteStructure'

// Finds a component's docs page from its code name, so an anatomy table can link each part that has
// one: "ListBox" matches the List box page, and "ToggleButton" the Toggle button page. Only
// implemented pages under Components and Structure count.

const simplified = (name: string) => name.replace(/\s+/g, '').toLowerCase()

function componentPages(groups: readonly SiteNavigationGroup[]): Map<string, string> {
  const pages = new Map<string, string>()
  const visit = (group: SiteNavigationGroup) => {
    for (const page of group.pages) if (page.status === 'implemented') pages.set(simplified(page.label), page.path)
    group.groups?.forEach(visit)
  }
  groups.filter((group) => group.id === 'components' || group.id === 'structure').forEach(visit)
  return pages
}

const pagesByName = componentPages(siteNavigationGroups)

export function componentPagePath(name: string): string | undefined {
  return pagesByName.get(simplified(name))
}
