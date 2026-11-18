import { useState } from 'react'
import {
  Cell, Column, DemoBlock, ListBoxItem, RadioButton, RadioField, RadioGroup, Row, Select, SelectionIndicator, Table, TableBody, TableHeader, Text,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { radioGroupContent, radioGroupExample, radioGroupExampleCode, radioGroupExampleProps, radioGroupFlags, radioGroupOrientations, radioGroupStates } from './radioGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'
import { RichText } from '../../../../components/RichText'

export default function RadioGroupPage() {
  const [defaultValue, setDefaultValue] = useState<string | null>(null)
  const [orientation, setOrientation] = useState<(typeof radioGroupOrientations)[number]>('vertical')
  const [flags, setFlags] = useState<Record<(typeof radioGroupFlags)[number], boolean>>({ description: false, isInvalid: false, isReadOnly: false, isDisabled: false })
  const props = radioGroupExampleProps(defaultValue, orientation, flags)
  const panelSwitch = (name: (typeof radioGroupFlags)[number]) => (
    <PanelSwitch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  return (
    <ContentPage
      content={radioGroupContent}
      parts={{
        example: (
          <DemoBlock
            codeView={radioGroupExampleCode(props)}
            endPanel={<>
              <Select size="sm" label={radioGroupExample.defaultValueLabel} selectedKey={defaultValue} onSelectionChange={(key) => { if (key != null) setDefaultValue(String(key)) }}>
                {radioGroupExample.options.map((option) => <ListBoxItem key={option.value} id={option.value}>{option.value}</ListBoxItem>)}
              </Select>
              <Select size="sm" label={radioGroupExample.orientationLabel} selectedKey={orientation} onSelectionChange={(key) => { if (key != null) setOrientation(key as (typeof radioGroupOrientations)[number]) }}>
                {radioGroupOrientations.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              {/* The group's parts in their own order, then the states that affect the whole group. It's
                  either disabled or invalid, so each of those switches hides while the other is on. */}
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <RadioGroup key={defaultValue ?? ''} {...props}>
              {radioGroupExample.options.map((option) => (
                <RadioField key={option.value} value={option.value} isDisabled={'isDisabled' in option}>
                  <RadioButton>
                    <SelectionIndicator />
                    {option.label}
                  </RadioButton>
                  <Text slot="description">{option.description}</Text>
                </RadioField>
              ))}
            </RadioGroup>
          </DemoBlock>
        ),
        states: (
          <div className="documentation-table">
            <Table aria-label="RadioGroup states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="behaviour">Behaviour</Column>
              </TableHeader>
              <TableBody>
                {radioGroupStates.map((state) => (
                  <Row id={state.name} key={state.name}>
                    <Cell>
                      <span className="table-item-heading">
                        <strong>{state.name}</strong>
                        <code>{state.property}</code>
                      </span>
                    </Cell>
                    <Cell><RichText text={state.description} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
