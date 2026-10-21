import { sizeContent, sizePages } from './sizeContent'
import { PageCards } from '../../../../components/PageCards'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SizePage() {
  return <ContentPage content={sizeContent} parts={{ pages: <PageCards items={sizePages} /> }} />
}
