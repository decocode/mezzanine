import { sideBySideContent, sideBySidePages } from './sideBySideContent'
import { PageCards } from '../../../../components/PageCards'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SideBySidePage() {
  return <ContentPage content={sideBySideContent} parts={{ pages: <PageCards items={sideBySidePages} /> }} />
}
