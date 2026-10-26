import { useState } from 'react'
import { DemoArea, ListBoxItem, Select, ToggleButton, ToggleButtonGroup, type ButtonSize } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { buttonSizes } from '../button/buttonContent'
import {
  toggleButtonGroupContent, toggleButtonGroupExample, toggleButtonGroupExampleCode, toggleButtonGroupFlags, toggleButtonGroupHierarchies,
  toggleButtonGroupOrientations, toggleButtonGroupSelectionModes,
} from './toggleButtonGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ToggleButtonGroupPage() {
  const [selectionMode, setSelectionMode] = useState<(typeof toggleButtonGroupSelectionModes)[number]>('single')
  const [orientation, setOrientation] = useState<(typeof toggleButtonGroupOrientations)[number]>('horizontal')
  const [hierarchy, setHierarchy] = useState<(typeof toggleButtonGroupHierarchies)[number]>('primary')
  const [size, setSize] = useState<ButtonSize>('md')
  const [flags, setFlags] = useState<Record<(typeof toggleButtonGroupFlags)[number], boolean>>({ disallowEmptySelection: false, isDisabled: false })
  const props = {
    selectionMode, orientation: orientation === 'horizontal' ? undefined : orientation, hierarchy: hierarchy === 'primary' ? undefined : hierarchy,
    size: size === 'md' ? undefined : size, ...flags,
  }
  return (
    <ContentPage
      content={toggleButtonGroupContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the group looks like or does.
        example: (
          <DemoArea
            codeView={toggleButtonGroupExampleCode(props)}
            endPanel={<>
              <Select label="selectionMode" selectedKey={selectionMode} onSelectionChange={(key) => { if (key != null) setSelectionMode(key as (typeof toggleButtonGroupSelectionModes)[number]) }}>
                {toggleButtonGroupSelectionModes.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label="orientation" selectedKey={orientation} onSelectionChange={(key) => { if (key != null) setOrientation(key as (typeof toggleButtonGroupOrientations)[number]) }}>
                {toggleButtonGroupOrientations.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label="hierarchy" selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as (typeof toggleButtonGroupHierarchies)[number]) }}>
                {toggleButtonGroupHierarchies.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label="size" selectedKey={size} onSelectionChange={(key) => { if (key != null) setSize(key as ButtonSize) }}>
                {buttonSizes.map((option) => <ListBoxItem key={option.size} id={option.size}>{option.size}</ListBoxItem>)}
              </Select>
              {toggleButtonGroupFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
            </>}
          >
            {/* A new key starts the group again, so a change of selection mode clears its choices. */}
            <ToggleButtonGroup key={selectionMode} aria-label={toggleButtonGroupExample.label} {...props}>
              {toggleButtonGroupExample.toggles.map((toggle) => <ToggleButton key={toggle} id={toggle}>{toggle}</ToggleButton>)}
            </ToggleButtonGroup>
          </DemoArea>
        ),
      }}
    />
  )
}
