import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { labContent } from './labContent'
import { SearchLabDialog } from './SearchLab'

// The Lab's Components section and its Search page. Illustrative and unapproved.
export function ComponentsPage() {
  return <DocsPageTemplate title={labContent.componentsPage.label} sections={[]} showContents={false} />
}

export function SearchPage() {
  return (
    <DocsPageTemplate
      title={labContent.searchPage.label}
      description="Illustrative and unapproved."
      sections={[{ id: 'search-dialog', title: 'Search dialog', content: <SearchLabDialog /> }]}
      showContents={false}
    />
  )
}
