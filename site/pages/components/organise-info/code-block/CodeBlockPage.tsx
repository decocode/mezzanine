import { CodeBlock, DemoArea } from '@decocode/mezzanine'
import { codeBlockContent, codeBlockExampleCode, codeBlockFeatureExamples } from './codeBlockContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CodeBlockPage() {
  return (
    <ContentPage
      content={codeBlockContent}
      parts={{
        example: <DemoArea align="stretch"><CodeBlock>{codeBlockExampleCode}</CodeBlock></DemoArea>,
        language: <DemoArea align="stretch"><CodeBlock language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        title: <DemoArea align="stretch"><CodeBlock title={codeBlockFeatureExamples.title} language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        lineNumbers: <DemoArea align="stretch"><CodeBlock showLineNumbers startLine={codeBlockFeatureExamples.lineNumbersStart} language="css">{codeBlockExampleCode}</CodeBlock></DemoArea>,
        markedLines: (
          <DemoArea align="stretch">
            <CodeBlock showLineNumbers highlightedLines={[1]} removedLines={[3]} addedLines={[4]} language="css">{codeBlockFeatureExamples.markedCode}</CodeBlock>
          </DemoArea>
        ),
      }}
    />
  )
}
