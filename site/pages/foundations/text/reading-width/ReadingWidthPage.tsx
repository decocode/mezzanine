import { Card, CodeBlock, DemoArea } from '@decocode/mezzanine'
import { DocsTable } from '../../../../components/DocsTable'
import { TokenValue } from '../../../../components/TokenValue'
import { readingWidthCode, readingWidthContent, readingWidthTokens, textLongWordsExample } from './readingWidthContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ReadingWidthPage() {
  return (
    <ContentPage
      content={readingWidthContent}
      parts={{
        lineLength: <CodeBlock className="docs-code-block" language="css">{readingWidthCode}</CodeBlock>,
        longWords: (
          <DemoArea className="text-narrow-example">
            <Card><p lang="de">{textLongWordsExample}</p></Card>
          </DemoArea>
        ),
        tokens: <DocsTable aria-label="Reading width tokens" nameColumn="Token" rows={readingWidthTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
      }}
    />
  )
}
