import { useState } from 'react'
import { ComboBox, DemoBlock, ListBoxItem, Switch } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { comboBoxContent, comboBoxExampleCode, comboBoxExampleLabels, comboBoxExampleText, comboBoxFlags, comboBoxMenuTriggers } from './comboBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ComboBoxPage() {
  const [menuTrigger, setMenuTrigger] = useState<(typeof comboBoxMenuTriggers)[number]>('input')
  const [defaultKey, setDefaultKey] = useState<(typeof comboBoxExampleLabels.options)[number] | null>(null)
  const [flags, setFlags] = useState<Record<(typeof comboBoxFlags)[number], boolean>>({ description: false, isInvalid: false, isReadOnly: false, isDisabled: false })
  const props = {
    menuTrigger: menuTrigger === 'input' ? undefined : menuTrigger,
    defaultSelectedKey: defaultKey ?? undefined,
    description: flags.description ? comboBoxExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? comboBoxExampleText.errorMessage : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
  const panelSwitch = (name: (typeof comboBoxFlags)[number]) => (
    <Switch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
  )
  return (
    <ContentPage
      content={comboBoxContent}
      parts={{
        example: (
          <DemoBlock
            codeView={comboBoxExampleCode(props)}
            endPanel={<>
              <PanelSelect label="menuTrigger" options={comboBoxMenuTriggers} value={menuTrigger} onChange={setMenuTrigger} />
              <PanelSelect label="defaultSelectedKey" options={comboBoxExampleLabels.options} value={defaultKey} onChange={setDefaultKey} />
              {/* The field's parts in their own order, then the states that affect the whole field. A
                  field is either disabled or invalid, so each of those switches hides while the other is on. */}
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <ComboBox key={defaultKey ?? ''} label={comboBoxExampleLabels.label} {...props}>
              {comboBoxExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
            </ComboBox>
          </DemoBlock>
        ),
      }}
    />
  )
}
