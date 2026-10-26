import { useState } from 'react'
import { Cell, Checkbox, CheckboxGroup, Column, DemoArea, Label, ListBoxItem, Row, Select, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import {
  checkboxContent, checkboxExampleCode, checkboxExampleLabel, checkboxFlags, checkboxGroupDefaultValueLabel, checkboxGroupExampleCode,
  checkboxGroupExampleLabels, checkboxGroupFlags, checkboxStateLabels,
} from './checkboxContent'
import { ContentPage } from '../../../../templates/ContentPage'

type Flags<T extends readonly string[]> = Record<T[number], boolean>
const allOff = <T extends readonly string[]>(names: T) => Object.fromEntries(names.map((name) => [name, false])) as Flags<T>

export default function CheckboxPage() {
  const [flags, setFlags] = useState(allOff(checkboxFlags))
  const [groupFlags, setGroupFlags] = useState(allOff(checkboxGroupFlags))
  const [groupDefault, setGroupDefault] = useState<string | null>(null)
  const groupProps = { defaultValue: groupDefault == null ? undefined : [groupDefault], ...groupFlags }
  return (
    <ContentPage
      content={checkboxContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the checkbox looks like or does.
        example: (
          <DemoArea
            codeView={checkboxExampleCode(flags)}
            endPanel={checkboxFlags.map((name) => (
              <Checkbox key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Checkbox>
            ))}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Checkbox key={String(flags.defaultSelected)} {...flags}>{checkboxExampleLabel}</Checkbox>
          </DemoArea>
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
          <DemoArea
            codeView={checkboxGroupExampleCode(groupProps)}
            endPanel={<>
              <Select label={checkboxGroupDefaultValueLabel} selectedKey={groupDefault} onSelectionChange={(key) => { if (key != null) setGroupDefault(String(key)) }}>
                {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <ListBoxItem key={checkbox} id={checkbox}>{checkbox}</ListBoxItem>)}
              </Select>
              {checkboxGroupFlags.map((name) => (
                <Checkbox key={name} isSelected={groupFlags[name]} onChange={(isSelected) => setGroupFlags({ ...groupFlags, [name]: isSelected })}>{name}</Checkbox>
              ))}
            </>}
          >
            <CheckboxGroup key={groupDefault ?? ''} {...groupProps}>
              <Label>{checkboxGroupExampleLabels.group}</Label>
              {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <Checkbox key={checkbox} value={checkbox}>{checkbox}</Checkbox>)}
              <Text slot="description">{checkboxGroupExampleLabels.description}</Text>
            </CheckboxGroup>
          </DemoArea>
        ),
      }}
    />
  )
}
