import { useState } from 'react'
import { Cell, Column, DemoBlock, Row, Switch, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { switchContent, switchExampleCode, switchExampleProps, switchExampleText, switchFlags, switchStateLabels } from './switchContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SwitchPage() {
  const [flags, setFlags] = useState<Record<(typeof switchFlags)[number], boolean>>({ isInvalid: false, defaultSelected: false, description: false, isReadOnly: false, isDisabled: false })
  const panelSwitch = (name: (typeof switchFlags)[number]) => (
    <Switch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
  )
  return (
    <ContentPage
      content={switchContent}
      parts={{
        example: (
          <DemoBlock
            codeView={switchExampleCode(flags)}
            endPanel={<>
              {/* The switch's parts in their own order, top to bottom, then the states that affect the
                  whole switch. It's either disabled or invalid, so each of those switches hides while the
                  other is on. */}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('defaultSelected')}
              {panelSwitch('description')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Switch key={String(flags.defaultSelected)} {...switchExampleProps(flags)}>{switchExampleText.label}</Switch>
          </DemoBlock>
        ),
        states: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Switch states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                <Row id="unselected">
                  <Cell><strong>{switchStateLabels.unselected}</strong></Cell>
                  <Cell><Switch>Switch</Switch></Cell>
                </Row>
                <Row id="selected">
                  <Cell><strong>{switchStateLabels.selected}</strong></Cell>
                  <Cell><Switch defaultSelected>Switch</Switch></Cell>
                </Row>
                <Row id="disabled">
                  <Cell><strong>{switchStateLabels.disabled}</strong></Cell>
                  <Cell><Switch isDisabled>Switch</Switch></Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
