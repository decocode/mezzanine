import { Token, TokenField, TokenFieldValue } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { tokenFieldContent, tokenFieldExampleLabels } from './tokenFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

// Two tokens with a space after each, so there is room to type.
const exampleValue = new TokenFieldValue(tokenFieldExampleLabels.tokens.flatMap((token) => [{ type: 'token' as const, text: token }, { type: 'text' as const, text: ' ' }]))

export default function TokenFieldPage() {
  return (
    <ContentPage
      content={tokenFieldContent}
      parts={{
        example: <ExampleZone>
          <TokenField label={tokenFieldExampleLabels.label} defaultValue={exampleValue}>
            {(segment) => <Token>{segment.text}</Token>}
          </TokenField>
        </ExampleZone>,
      }}
    />
  )
}
