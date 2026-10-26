import { useState } from 'react'
import { DemoArea, FieldError, Label, Text, TextArea, TextField } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { textAreaContent, textAreaExampleCode, textAreaExampleText, textAreaFlags, textAreaRows } from './textAreaContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TextAreaPage() {
  const [rows, setRows] = useState<(typeof textAreaRows)[number]>('4')
  const [flags, setFlags] = useState<Record<(typeof textAreaFlags)[number], boolean>>({
    placeholder: true, description: true, isDisabled: false, isReadOnly: false, isInvalid: false,
  })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  return (
    <ContentPage
      content={textAreaContent}
      parts={{
        example: (
          <DemoArea
            codeView={textAreaExampleCode({ rows: Number(rows), flags, hasErrorMessage })}
            endPanel={<>
              <PanelSelect label="rows" options={textAreaRows} value={rows} onChange={setRows} />
              {textAreaFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            <TextField isDisabled={flags.isDisabled} isReadOnly={flags.isReadOnly} isInvalid={flags.isInvalid} validationBehavior="aria">
              <Label>{textAreaExampleText.label}</Label>
              <TextArea rows={Number(rows)} placeholder={flags.placeholder ? textAreaExampleText.placeholder : undefined} />
              {flags.description && <Text slot="description">{textAreaExampleText.description}</Text>}
              {flags.isInvalid && hasErrorMessage && <FieldError>{textAreaExampleText.errorMessage}</FieldError>}
            </TextField>
          </DemoArea>
        ),
      }}
    />
  )
}
