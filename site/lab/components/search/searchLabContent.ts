import type { NavTreeItemData, NavTreeProps } from '@decocode/mezzanine'
import { docsNavigationItems } from '../../../components/docsNavigationItems'
import { labNavigationItems } from '../../labContent'

export interface SearchLabResult {
  id: string
  label: string
  href: string
  // The groups above the page, such as "Styles › Shape".
  location?: string
}

export interface SearchLabSection {
  id: string
  label: string
  results: SearchLabResult[]
}

// Every linked item in a navigation tree, in reading order, with the labels of the groups above it.
// A section's heading counts as a group.
function collectResults(items: NavTreeProps['items'], sectionId: string, parents: readonly string[] = []): SearchLabResult[] {
  return items.flatMap((item): SearchLabResult[] => item.type === 'section'
    ? collectResults(item.children, sectionId, item.label ? [...parents, item.label] : parents)
    : collectItem(item, sectionId, parents))
}

function collectItem(item: NavTreeItemData, sectionId: string, parents: readonly string[]): SearchLabResult[] {
  return [
    ...(item.href == null ? [] : [{
      id: `${sectionId}-${String(item.id)}`,
      label: item.label,
      href: item.href,
      location: parents.length > 0 ? parents.join(' › ') : undefined,
    }]),
    ...collectResults(item.children ?? [], sectionId, [...parents, item.label]),
  ]
}

// Sample results for the search experiment: page titles from the docs and Lab navigation.
// What search indexes is still to be agreed.
export const searchLabSections: SearchLabSection[] = [
  { id: 'docs', label: 'Docs', results: collectResults(docsNavigationItems, 'docs') },
  { id: 'lab', label: 'Lab', results: collectResults(labNavigationItems, 'lab') },
]
