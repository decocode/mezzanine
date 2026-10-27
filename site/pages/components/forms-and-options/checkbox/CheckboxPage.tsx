import { useState } from 'react'
import { Cell, Checkbox, CheckboxGroup, Column, DemoBlock, FieldError, Label, ListBoxItem, Row, Select, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  checkboxContent, checkboxExampleCode, checkboxExampleDescription, checkboxExampleError, checkboxExampleLabel, checkboxFlags, checkboxGroupDefaultValueLabel, checkboxGroupExampleCode, checkboxGroupExampleError,
  checkboxGroupExampleLabels, checkboxGroupFlags, checkboxStateLabels,
} from './checkboxContent'
import { ContentPage } from '../../../../templates/ContentPage'

type Flags<T extends readonly string[]> = Record<T[number], boolean>
const allOff = <T extends readonly string[]>(names: T) => Object.fromEntries(names.map((name) => [name, false])) as Flags<T>

export default function CheckboxPage() {
  const [flags, setFlags] = useState(allOff(checkboxFlags))
  const [hasDescription, setHasDescription] = useState(false)
  const description = hasDescription ? checkboxExampleDescription : undefined
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  // errorMessage only shows on an invalid checkbox, so its control appears with isInvalid.
  const errorMessage = flags.isInvalid && hasErrorMessage ? checkboxExampleError : undefined
  const [groupFlags, setGroupFlags] = useState(allOff(checkboxGroupFlags))
  const [groupDefault, setGroupDefault] = useState<string | null>(null)
  const [groupHasErrorMessage, setGroupHasErrorMessage] = useState(false)
  const groupShowsError = groupFlags.isInvalid && groupHasErrorMessage
  const groupProps = { defaultValue: groupDefault == null ? undefined : [groupDefault], ...groupFlags }
  return (
    <ContentPage
      content={checkboxContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the checkbox looks like or does.
        example: (
          <DemoBlock
            codeView={checkboxExampleCode({ description, ...flags, errorMessage })}
            endPanel={[<PanelSwitch key="description" isSelected={hasDescription} onChange={setHasDescription}>description</PanelSwitch>, ...checkboxFlags.flatMap((name) => [
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>,
              ...(name === 'isInvalid' && flags.isInvalid
                ? [<PanelSwitch key="errorMessage" isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>]
                : []),
            ])]}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Checkbox key={String(flags.defaultSelected)} {...flags} description={description} errorMessage={errorMessage}>{checkboxExampleLabel}</Checkbox>
          </DemoBlock>
        ),
        states: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Checkbox states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                <Row id="unselected">
                  <Cell><strong>{checkboxStateLabels.unselected}</strong></Cell>
                  <Cell><Checkbox>Checkbox</Checkbox></Cell>
                </Row>
                <Row id="selected">
                  <Cell><strong>{checkboxStateLabels.selected}</strong></Cell>
                  <Cell><Checkbox defaultSelected>Checkbox</Checkbox></Cell>
                </Row>
                <Row id="indeterminate">
                  <Cell><strong>{checkboxStateLabels.indeterminate}</strong></Cell>
                  <Cell><Checkbox isIndeterminate>Checkbox</Checkbox></Cell>
                </Row>
                <Row id="disabled">
                  <Cell><strong>{checkboxStateLabels.disabled}</strong></Cell>
                  <Cell><Checkbox isDisabled>Checkbox</Checkbox></Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
        checkboxGroup: (
          <DemoBlock
            codeView={checkboxGroupExampleCode({ ...groupProps, errorMessage: groupShowsError })}
            endPanel={<>
              <Select size="sm" label={checkboxGroupDefaultValueLabel} selectedKey={groupDefault} onSelectionChange={(key) => { if (key != null) setGroupDefault(String(key)) }}>
                {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <ListBoxItem key={checkbox} id={checkbox}>{checkbox}</ListBoxItem>)}
              </Select>
              {checkboxGroupFlags.map((name) => (
                <PanelSwitch key={name} isSelected={groupFlags[name]} onChange={(isSelected) => setGroupFlags({ ...groupFlags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {groupFlags.isInvalid && <PanelSwitch isSelected={groupHasErrorMessage} onChange={setGroupHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            <CheckboxGroup key={groupDefault ?? ''} {...groupProps}>
              {/* The help text comes after the label, so people read it before choosing. */}
              <Label>{checkboxGroupExampleLabels.group}</Label>
              <Text slot="description">{checkboxGroupExampleLabels.description}</Text>
              {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <Checkbox key={checkbox} value={checkbox}>{checkbox}</Checkbox>)}
              {groupShowsError && <FieldError>{checkboxGroupExampleError}</FieldError>}
            </CheckboxGroup>
          </DemoBlock>
        ),
      }}
    />
  )
}
