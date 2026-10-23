import { layersContent, layersPages } from './layersContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function LayersPage() {
  return <ContentPage content={layersContent} parts={{ pages: <PageCards items={layersPages} /> }} />
}
