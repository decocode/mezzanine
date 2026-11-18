import { useState } from 'react'
import { DemoBlock, TextArea } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { textAreaContent, textAreaExampleCode, textAreaExampleText, textAreaFlags, textAreaRows } from './textAreaContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TextAreaPage() {
  const [rows, setRows] = useState<(typeof textAreaRows)[number]>('4')
  const [flags, setFlags] = useState<Record<(typeof textAreaFlags)[number], boolean>>({
    placeholder: true, description: true, isDisabled: false, isReadOnly: false, isInvalid: false,
  })
  const panelSwitch = (name: (typeof textAreaFlags)[number]) => (
    <PanelSwitch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  return (
    <ContentPage
      content={textAreaContent}
      parts={{
        example: (
          <DemoBlock
            codeView={textAreaExampleCode({ rows: Number(rows), flags })}
            endPanel={<>
              {/* The field's kind first, then its parts in their own order, top to bottom: help text, error,
                  then the box. The states that affect the whole field come last. A field is either disabled or invalid, so each of
                  those switches hides while the other is on. */}
              <PanelSelect label="rows" options={textAreaRows} value={rows} onChange={setRows} />
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('placeholder')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            <TextArea
              label={textAreaExampleText.label}
              description={flags.description ? textAreaExampleText.description : undefined}
              errorMessage={flags.isInvalid ? textAreaExampleText.errorMessage : undefined}
              placeholder={flags.placeholder ? textAreaExampleText.placeholder : undefined}
              rows={Number(rows)} isDisabled={flags.isDisabled} isReadOnly={flags.isReadOnly} isInvalid={flags.isInvalid} validationBehavior="aria"
            />
          </DemoBlock>
        ),
      }}
    />
  )
}
