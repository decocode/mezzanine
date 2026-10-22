import { Cell, Checkbox, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { checkboxContent, checkboxStateLabels } from './checkboxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CheckboxPage() {
  return (
    <ContentPage
      content={checkboxContent}
      parts={{
        example: <DemoArea><Checkbox>Checkbox label</Checkbox></DemoArea>,
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
      }}
    />
  )
}
