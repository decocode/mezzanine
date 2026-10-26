import { NavTree, type NavTreeProps } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { docsNavigationItems } from './docsNavigationItems'
import { SiteSearch } from './SiteSearch'
import { docsSearchSection, type SearchSection } from './siteSearchLogic'

interface NavigationPanelProps {
  'aria-label': string
  navigationLabel: string
  items: NavTreeProps['items']
  selectedRoute: string
  // What the Search above the tree lists.
  searchSections: readonly SearchSection[]
}

// Search, then a section's navigation tree, in its Panel or the TopBar menu. Docs and the Lab each pass their own items.
export function NavigationPanel({ 'aria-label': label, navigationLabel, items, selectedRoute, searchSections }: NavigationPanelProps) {
  return (
    <div className="navigation-panel">
      <div className="navigation-panel-search"><SiteSearch sections={searchSections} /></div>
      <nav aria-label={label}>
        <NavTree aria-label={navigationLabel} selectedRoute={selectedRoute} items={items} />
      </nav>
    </div>
  )
}

interface DocsNavigationProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

export function DocsNavigation({ currentPage, 'aria-label': label = 'Documentation pages', navigationLabel = 'Index' }: DocsNavigationProps) {
  return <NavigationPanel aria-label={label} navigationLabel={navigationLabel} items={docsNavigationItems} selectedRoute={currentPage.path} searchSections={[docsSearchSection]} />
}
