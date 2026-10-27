import { Card, CodeBlock, DemoBlock } from '@decocode/mezzanine'
import { DocsTable } from '../../../../components/DocsTable'
import { TokenValue } from '../../../../components/TokenValue'
import { linesAndWordsContent, readingWidthCode, readingWidthTokens, textLongWordsExample } from './linesAndWordsContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function LinesAndWordsPage() {
  return (
    <ContentPage
      content={linesAndWordsContent}
      parts={{
        lineLength: <CodeBlock className="docs-code-block" language="css">{readingWidthCode}</CodeBlock>,
        longWords: (
          <DemoBlock align="stretch" className="text-narrow-example">
            <Card><p lang="de">{textLongWordsExample}</p></Card>
          </DemoBlock>
        ),
        tokens: <DocsTable aria-label="Lines and words tokens" nameColumn="Token" rows={readingWidthTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
      }}
    />
  )
}
