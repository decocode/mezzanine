import { textContent, textPages } from './textContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function TextPage() {
  return <ContentPage content={textContent} parts={{ pages: <PageCards items={textPages} /> }} />
}
