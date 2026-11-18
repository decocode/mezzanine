import { useState } from 'react'
import { Cell, Checkbox, CheckboxGroup, Column, DemoBlock, ListBoxItem, Row, Select, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  checkboxContent, checkboxExampleCode, checkboxExampleProps, checkboxExampleText, checkboxFlags, checkboxGroupDefaultValueLabel, checkboxGroupExampleCode, checkboxGroupExampleLabels,
  checkboxGroupExampleProps, checkboxGroupFlags, checkboxStateLabels,
} from './checkboxContent'
import { ContentPage } from '../../../../templates/ContentPage'

type Flags<T extends readonly string[]> = Record<T[number], boolean>
const allOff = <T extends readonly string[]>(names: T) => Object.fromEntries(names.map((name) => [name, false])) as Flags<T>

export default function CheckboxPage() {
  const [flags, setFlags] = useState(allOff(checkboxFlags))
  const [groupFlags, setGroupFlags] = useState(allOff(checkboxGroupFlags))
  const [groupDefault, setGroupDefault] = useState<string | null>(null)
  const panelSwitch = (name: (typeof checkboxFlags)[number]) => (
    <PanelSwitch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  const groupPanelSwitch = (name: (typeof checkboxGroupFlags)[number]) => (
    <PanelSwitch isSelected={groupFlags[name]} onChange={(isSelected) => setGroupFlags({ ...groupFlags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  return (
    <ContentPage
      content={checkboxContent}
      parts={{
        example: (
          <DemoBlock
            codeView={checkboxExampleCode(flags)}
            endPanel={<>
              {/* The checkbox's parts in their own order, top to bottom, then the states that affect the
                  whole checkbox. It's either disabled or invalid, so each of those switches hides while
                  the other is on. */}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('defaultSelected')}
              {panelSwitch('isIndeterminate')}
              {panelSwitch('description')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Checkbox key={String(flags.defaultSelected)} {...checkboxExampleProps(flags)}>{checkboxExampleText.label}</Checkbox>
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
            codeView={checkboxGroupExampleCode(groupDefault, groupFlags)}
            endPanel={<>
              <Select size="sm" label={checkboxGroupDefaultValueLabel} selectedKey={groupDefault} onSelectionChange={(key) => { if (key != null) setGroupDefault(String(key)) }}>
                {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <ListBoxItem key={checkbox} id={checkbox}>{checkbox}</ListBoxItem>)}
              </Select>
              {groupPanelSwitch('description')}
              {!groupFlags.isDisabled && groupPanelSwitch('isInvalid')}
              {groupPanelSwitch('isReadOnly')}
              {!groupFlags.isInvalid && groupPanelSwitch('isDisabled')}
            </>}
          >
            <CheckboxGroup key={groupDefault ?? ''} {...checkboxGroupExampleProps(groupDefault, groupFlags)}>
              {checkboxGroupExampleLabels.checkboxes.map((checkbox) => <Checkbox key={checkbox} value={checkbox}>{checkbox}</Checkbox>)}
            </CheckboxGroup>
          </DemoBlock>
        ),
      }}
    />
  )
}
