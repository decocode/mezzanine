import { useState } from 'react'
import {
  Cell, Column, DemoArea, FieldError, Label, ListBoxItem, RadioButton, RadioField, RadioGroup, Row, Select, SelectionIndicator, Table, TableBody,
  TableHeader, Text,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { radioGroupContent, radioGroupExample, radioGroupExampleCode, radioGroupFlags, radioGroupOrientations, radioGroupStates } from './radioGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'
import { RichText } from '../../../../components/RichText'

export default function RadioGroupPage() {
  const [defaultValue, setDefaultValue] = useState<string | null>(null)
  const [orientation, setOrientation] = useState<(typeof radioGroupOrientations)[number]>('vertical')
  const [flags, setFlags] = useState<Record<(typeof radioGroupFlags)[number], boolean>>({ isDisabled: false, isInvalid: false, isReadOnly: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  // errorMessage only shows on an invalid group, so its control appears with isInvalid.
  const showsError = flags.isInvalid && hasErrorMessage
  const props = { defaultValue: defaultValue ?? undefined, orientation: orientation === 'vertical' ? undefined : orientation, ...flags }
  return (
    <ContentPage
      content={radioGroupContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the group looks like or does.
        example: (
          <DemoArea
            codeView={radioGroupExampleCode({ ...props, errorMessage: showsError })}
            endPanel={<>
              <Select label={radioGroupExample.defaultValueLabel} selectedKey={defaultValue} onSelectionChange={(key) => { if (key != null) setDefaultValue(String(key)) }}>
                {radioGroupExample.options.map((option) => <ListBoxItem key={option.value} id={option.value}>{option.value}</ListBoxItem>)}
              </Select>
              <Select label={radioGroupExample.orientationLabel} selectedKey={orientation} onSelectionChange={(key) => { if (key != null) setOrientation(key as (typeof radioGroupOrientations)[number]) }}>
                {radioGroupOrientations.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              {radioGroupFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <RadioGroup key={defaultValue ?? ''} {...props}>
              <Label>{radioGroupExample.label}</Label>
              <Text slot="description">{radioGroupExample.description}</Text>
              {radioGroupExample.options.map((option) => (
                <RadioField key={option.value} value={option.value} isDisabled={'isDisabled' in option}>
                  <RadioButton>
                    <SelectionIndicator />
                    {option.label}
                  </RadioButton>
                  <Text slot="description">{option.description}</Text>
                </RadioField>
              ))}
              {showsError && <FieldError>{radioGroupExample.error}</FieldError>}
            </RadioGroup>
          </DemoArea>
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
