import { Card, CodeBlock } from '@decocode/mezzanine'
import { DocsTable } from '../components/DocsTable'
import { ExampleZone } from '../components/ExampleZone'
import { TokenValue } from '../components/TokenValue'
import {
  textContent, textLineLengthCode, textLineLengthExample, textLineLengthLabels, textLongWordsExample, textTokens,
} from '../content/textContent'
import { ContentPage } from '../templates/ContentPage'

export default function TextPage() {
  return (
    <ContentPage
      content={textContent}
      parts={{
        lineLength: (<>
          <CodeBlock className="docs-code-block">{textLineLengthCode}</CodeBlock>
          <ExampleZone className="text-comparison">
            <p className="mz-text-label-md">{textLineLengthLabels.without}</p>
            <p className="mz-text-body-md">{textLineLengthExample}</p>
            <p className="mz-text-label-md">{textLineLengthLabels.with}</p>
            <p className="mz-text-body-md text-line-length-example">{textLineLengthExample}</p>
          </ExampleZone>
        </>),
        longWords: (
          <ExampleZone className="text-narrow-example">
            <Card><p lang="de">{textLongWordsExample}</p></Card>
          </ExampleZone>
        ),
        tokens: <DocsTable aria-label="Text tokens" nameColumn="Token" rows={textTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
      }}
    />
  )
}
