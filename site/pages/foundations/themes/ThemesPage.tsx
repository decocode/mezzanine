import { themesContent, themesPages } from './themesContent'
import { PageCards } from '../../../components/PageCards'
import { ContentPage } from '../../../templates/ContentPage'

export default function ThemesPage() {
  return <ContentPage content={themesContent} parts={{ pages: <PageCards items={themesPages} /> }} />
}
