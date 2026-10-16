import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { labContent } from './labContent'

// The Internationalisation experiment: making layouts work in any language. Its pages are still to
// be agreed, so it has only its introduction for now. Illustrative and unapproved.
export function InternationalisationPage() {
  return <DocsPageTemplate title={labContent.internationalisationPage.label} description={labContent.internationalisationPage.description} sections={[]} />
}
