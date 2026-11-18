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
  const [flags, setFlags] = useState<Record<(typeof selectFlags)[number], boolean>>({ description: false, isInvalid: false, isDisabled: false })
  const [icon, setIcon] = useState(false)
  const [isIconOnly, setIsIconOnly] = useState(false)
  const fields = {
    size: size === 'md' ? undefined : size,
    description: flags.description ? selectExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? selectExampleText.errorMessage : undefined,
    // valuePosition applies once the options have icons, so its control appears with icon.
    valuePosition: icon && isIconOnly ? 'iconOnly' as const : undefined,
    isDisabled: flags.isDisabled,
  }
  const panelSwitch = (name: (typeof selectFlags)[number]) => (
    <PanelSwitch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
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
              {/* The field's parts in their own order, then the state that affects the whole field. A field
                  is either disabled or invalid, so each of those switches hides while the other is on. */}
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              <PanelSwitch isSelected={icon} onChange={setIcon}>icon</PanelSwitch>
              {icon && <PanelSwitch isSelected={isIconOnly} onChange={setIsIconOnly}>valuePosition</PanelSwitch>}
              {!flags.isInvalid && panelSwitch('isDisabled')}
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
