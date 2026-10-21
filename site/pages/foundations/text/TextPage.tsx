import { Card } from '@decocode/mezzanine'
import { ExampleZone } from '../../../components/ExampleZone'
import { textContent, textLongWordsExample } from './textContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function TextPage() {
  return (
    <ContentPage
      content={textContent}
      parts={{
        longWords: (
          <ExampleZone className="text-narrow-example">
            <Card><p lang="de">{textLongWordsExample}</p></Card>
          </ExampleZone>
        ),
      }}
    />
  )
}
