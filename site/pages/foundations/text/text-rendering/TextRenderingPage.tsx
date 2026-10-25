import { Card, DemoArea } from '@decocode/mezzanine'
import { ContentPage } from '../../../../templates/ContentPage'
import { textLongWordsExample, textRenderingContent } from './textRenderingContent'

export default function TextRenderingPage() {
  return (
    <ContentPage
      content={textRenderingContent}
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
