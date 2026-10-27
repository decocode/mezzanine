import { useState } from 'react'
import { DemoBlock, ListBoxItem, PlaceholderIcon, Select, type SelectHierarchy } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  selectContent, selectDefaultKeyLabel, selectNoDefaultKey, selectSizes, selectExampleCode, selectExampleLabels, selectExampleText, selectFlags, selectHierarchies, selectHierarchyLabel,
} from './selectContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SelectPage() {
  const [hierarchy, setHierarchy] = useState<SelectHierarchy>('primary')
  const [size, setSize] = useState<(typeof selectSizes)[number]>('md')
  const [defaultKey, setDefaultKey] = useState<string | null>(null)
  const [flags, setFlags] = useState<Record<(typeof selectFlags)[number], boolean>>({ description: false, isDisabled: false, isInvalid: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  const [icon, setIcon] = useState(false)
  const [isIconOnly, setIsIconOnly] = useState(false)
  // errorMessage only shows on an invalid field, so its control appears with isInvalid.
  const fields = {
    size: size === 'md' ? undefined : size,
    description: flags.description ? selectExampleText.description : undefined,
    isDisabled: flags.isDisabled,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid && hasErrorMessage ? selectExampleText.errorMessage : undefined,
    // valuePosition applies once the options have icons, so its control appears with icon.
    valuePosition: icon && isIconOnly ? 'iconOnly' as const : undefined,
  }
  return (
    <ContentPage
      content={selectContent}
      parts={{
        example: (
          <DemoBlock
            codeView={selectExampleCode(hierarchy, defaultKey, fields, icon)}
            endPanel={<>
              <Select size="sm" label={selectHierarchyLabel} selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as SelectHierarchy) }}>
                {selectHierarchies.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <PanelSelect label="size" options={selectSizes} value={size} onChange={setSize} />
              {/* "none" leaves the prop out, so no item starts selected. */}
              <Select size="sm" label={selectDefaultKeyLabel} selectedKey={defaultKey ?? selectNoDefaultKey} onSelectionChange={(key) => { if (key != null) setDefaultKey(key === selectNoDefaultKey ? null : String(key)) }}>
                {[selectNoDefaultKey, ...selectExampleLabels.options].map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              {selectFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
              <PanelSwitch isSelected={icon} onChange={setIcon}>icon</PanelSwitch>
              {icon && <PanelSwitch isSelected={isIconOnly} onChange={setIsIconOnly}>valuePosition</PanelSwitch>}
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
              {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option} icon={icon ? <PlaceholderIcon /> : undefined}>{option}</ListBoxItem>)}
            </Select>
          </DemoBlock>
        ),
      }}
    />
  )
}
