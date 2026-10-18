import { introductionContent } from '../content/introductionContent'
import { ContentPage } from '../templates/ContentPage'

export default function IntroductionPage() {
  return <ContentPage content={introductionContent} showContents={false} />
}
