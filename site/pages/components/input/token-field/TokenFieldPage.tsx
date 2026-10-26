import { useState } from 'react'
import { DemoArea, Token, TokenField, TokenFieldValue } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { tokenFieldContent, tokenFieldExampleCode, tokenFieldExampleLabels, tokenFieldExampleText, tokenFieldFlags } from './tokenFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

// Two tokens with a space after each, so there is room to type.
const exampleValue = new TokenFieldValue(tokenFieldExampleLabels.tokens.flatMap((token) => [{ type: 'token' as const, text: token }, { type: 'text' as const, text: ' ' }]))

export default function TokenFieldPage() {
  const [flags, setFlags] = useState<Record<(typeof tokenFieldFlags)[number], boolean>>({ description: false, isDisabled: false, isReadOnly: false })
  const props = { description: flags.description ? tokenFieldExampleText.description : undefined, isDisabled: flags.isDisabled, isReadOnly: flags.isReadOnly }
  return (
    <ContentPage
      content={tokenFieldContent}
      parts={{
        example: (
          <DemoArea
            codeView={tokenFieldExampleCode(props)}
            endPanel={tokenFieldFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <TokenField label={tokenFieldExampleLabels.label} defaultValue={exampleValue} {...props}>
              {(segment) => <Token>{segment.text}</Token>}
            </TokenField>
          </DemoArea>
        ),
      }}
    />
  )
}
