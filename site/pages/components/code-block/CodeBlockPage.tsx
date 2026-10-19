import { ExampleZone } from '../../../components/ExampleZone'
import { CodeBlock } from '@decocode/mezzanine'
import { codeBlockContent, codeBlockExampleCode } from './codeBlockContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function CodeBlockPage() {
  return (
    <ContentPage
      content={codeBlockContent}
      parts={{
        example: <ExampleZone><CodeBlock>{codeBlockExampleCode}</CodeBlock></ExampleZone>,
      }}
    />
  )
}
