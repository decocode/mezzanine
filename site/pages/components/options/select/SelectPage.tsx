import { useState } from 'react'
import { DemoArea, ListBoxItem, Select, type SelectHierarchy } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  selectContent, selectDefaultKeyLabel, selectExampleCode, selectExampleLabels, selectExampleText, selectFlags, selectHierarchies, selectHierarchyLabel,
} from './selectContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SelectPage() {
  const [hierarchy, setHierarchy] = useState<SelectHierarchy>('primary')
  const [defaultKey, setDefaultKey] = useState<string | null>(null)
  const [flags, setFlags] = useState<Record<(typeof selectFlags)[number], boolean>>({ description: false, isDisabled: false, isInvalid: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  // errorMessage only shows on an invalid field, so its control appears with isInvalid.
  const fields = {
    description: flags.description ? selectExampleText.description : undefined,
    isDisabled: flags.isDisabled,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid && hasErrorMessage ? selectExampleText.errorMessage : undefined,
  }
  return (
    <ContentPage
      content={selectContent}
      parts={{
        example: (
          <DemoArea
            codeView={selectExampleCode(hierarchy, defaultKey, fields)}
            endPanel={<>
              <Select label={selectHierarchyLabel} selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as SelectHierarchy) }}>
                {selectHierarchies.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label={selectDefaultKeyLabel} selectedKey={defaultKey} onSelectionChange={(key) => { if (key != null) setDefaultKey(String(key)) }}>
                {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              {selectFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Select
              key={defaultKey ?? ''}
              label={selectExampleLabels.label}
              hierarchy={hierarchy}
              defaultSelectedKey={defaultKey ?? undefined}
              {...fields}
            >
              {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
            </Select>
          </DemoArea>
        ),
      }}
    />
  )
}
