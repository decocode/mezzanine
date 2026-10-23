import { layoutContent, layoutPages } from './layoutContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function LayoutPage() {
  return <ContentPage content={layoutContent} parts={{ pages: <PageCards items={layoutPages} /> }} />
}
