import { CodeBlock, DemoArea } from '@decocode/mezzanine'
import { codeBlockContent, codeBlockExampleCode, codeBlockFeatureExamples } from './codeBlockContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CodeBlockPage() {
  return (
    <ContentPage
      content={codeBlockContent}
      parts={{
        example: <DemoArea><CodeBlock>{codeBlockExampleCode}</CodeBlock></DemoArea>,
        language: <DemoArea><CodeBlock language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        title: <DemoArea><CodeBlock title={codeBlockFeatureExamples.title} language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        lineNumbers: <DemoArea><CodeBlock showLineNumbers startLine={codeBlockFeatureExamples.lineNumbersStart} language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        markedLines: (
          <DemoArea>
            <CodeBlock showLineNumbers highlightedLines={[1]} removedLines={[3]} addedLines={[4]} language="css">{codeBlockFeatureExamples.markedCode}</CodeBlock>
          </DemoArea>
        ),
      }}
    />
  )
}
