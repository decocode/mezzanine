import { Card, DemoArea } from '@decocode/mezzanine'
import { textContent, textLongWordsExample } from './textContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function TextPage() {
  return (
    <ContentPage
      content={textContent}
      parts={{
        longWords: (
          <DemoArea className="text-narrow-example">
            <Card><p lang="de">{textLongWordsExample}</p></Card>
          </DemoArea>
        ),
      }}
    />
  )
}
