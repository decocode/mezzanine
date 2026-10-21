import { dimensionContent, dimensionPages } from './dimensionContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function DimensionPage() {
  return <ContentPage content={dimensionContent} parts={{ pages: <PageCards items={dimensionPages} /> }} />
}
