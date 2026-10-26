import { useState } from 'react'
import { ComboBox, DemoArea, ListBoxItem } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { comboBoxContent, comboBoxExampleCode, comboBoxExampleLabels, comboBoxExampleText, comboBoxFlags, comboBoxMenuTriggers } from './comboBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ComboBoxPage() {
  const [menuTrigger, setMenuTrigger] = useState<(typeof comboBoxMenuTriggers)[number]>('input')
  const [defaultKey, setDefaultKey] = useState<(typeof comboBoxExampleLabels.options)[number] | null>(null)
  const [flags, setFlags] = useState<Record<(typeof comboBoxFlags)[number], boolean>>({ description: false, isDisabled: false, isReadOnly: false, isInvalid: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  const props = {
    menuTrigger: menuTrigger === 'input' ? undefined : menuTrigger,
    defaultSelectedKey: defaultKey ?? undefined,
    description: flags.description ? comboBoxExampleText.description : undefined,
    isDisabled: flags.isDisabled,
    isReadOnly: flags.isReadOnly,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid && hasErrorMessage ? comboBoxExampleText.errorMessage : undefined,
  }
  return (
    <ContentPage
      content={comboBoxContent}
      parts={{
        example: (
          <DemoArea
            codeView={comboBoxExampleCode(props)}
            endPanel={<>
              <PanelSelect label="menuTrigger" options={comboBoxMenuTriggers} value={menuTrigger} onChange={setMenuTrigger} />
              <PanelSelect label="defaultSelectedKey" options={comboBoxExampleLabels.options} value={defaultKey} onChange={setDefaultKey} />
              {comboBoxFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <ComboBox key={defaultKey ?? ''} label={comboBoxExampleLabels.label} {...props}>
              {comboBoxExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
            </ComboBox>
          </DemoArea>
        ),
      }}
    />
  )
}
