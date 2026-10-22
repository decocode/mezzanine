import { PageCards } from '../../../../components/PageCards'
import { typographyContent, typographyPages } from './typographyContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TypographyPage() {
  return <ContentPage content={typographyContent} parts={{ pages: <PageCards items={typographyPages} /> }} />
}
