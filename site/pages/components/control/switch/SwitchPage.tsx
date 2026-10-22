import { Cell, Column, DemoArea, Row, SwitchButton, SwitchField, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { switchContent, switchStateLabels } from './switchContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SwitchPage() {
  return (
    <ContentPage
      content={switchContent}
      parts={{
        example: <DemoArea><SwitchField><SwitchButton>Switch label</SwitchButton></SwitchField></DemoArea>,
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
                  <Cell><SwitchField><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
                <Row id="selected">
                  <Cell><strong>{switchStateLabels.selected}</strong></Cell>
                  <Cell><SwitchField defaultSelected><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
                <Row id="disabled">
                  <Cell><strong>{switchStateLabels.disabled}</strong></Cell>
                  <Cell><SwitchField isDisabled><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
