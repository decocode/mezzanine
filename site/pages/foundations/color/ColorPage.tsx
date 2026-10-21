import { colorContent, colorPages } from './colorContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function ColorPage() {
  return <ContentPage content={colorContent} parts={{ pages: <PageCards items={colorPages} /> }} />
}
