import { CodeBlock, DemoArea } from '@decocode/mezzanine'
import { codeBlockContent, codeBlockExampleCode } from './codeBlockContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CodeBlockPage() {
  return (
    <ContentPage
      content={codeBlockContent}
      parts={{
        example: <DemoArea><CodeBlock>{codeBlockExampleCode}</CodeBlock></DemoArea>,
      }}
    />
  )
}
