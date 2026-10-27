import { useState } from 'react'
import { DemoBlock, FieldError, Input, Label, SearchField, Text } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { searchFieldContent, searchFieldExampleCode, searchFieldExampleLabel, searchFieldExampleText, searchFieldFlags } from './searchFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchFieldPage() {
  const [flags, setFlags] = useState<Record<(typeof searchFieldFlags)[number], boolean>>({ description: false, isDisabled: false, isReadOnly: false, isInvalid: false })
  // errorMessage only shows on an invalid field, so its control appears with isInvalid.
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  const { description, ...props } = flags
  return (
    <ContentPage
      content={searchFieldContent}
      parts={{
        example: (
          <DemoBlock
            codeView={searchFieldExampleCode({ ...flags, hasErrorMessage })}
            endPanel={<>
              {searchFieldFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            <SearchField {...props}>
              <Label>{searchFieldExampleLabel}</Label>
              <Input />
              {description && <Text slot="description">{searchFieldExampleText.description}</Text>}
              {flags.isInvalid && hasErrorMessage && <FieldError>{searchFieldExampleText.errorMessage}</FieldError>}
            </SearchField>
          </DemoBlock>
        ),
      }}
    />
  )
}
