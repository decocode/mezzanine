import { TableOfContents, Checkbox, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'

export default function CheckboxPage() {
  return (
    <>
      <DocumentationHeading
        description="Checkboxes let people select one or more independent options. Their label explains what will be selected."
        reactAriaPage="Checkbox"
        title="Checkbox"
      />
      <TableOfContents sections={[
        { id: 'checkbox-example-heading', label: 'Example' },
        { id: 'checkbox-states-heading', label: 'States' },
      ]} />
      <section aria-labelledby="checkbox-example-heading" className="component-section">
        <h2 id="checkbox-example-heading" className="mz-text-heading-md">Example</h2>
        <p className="component-section-description">
          Select or clear the <code>Checkbox</code> using its label or the Space key when focused.
        </p>
        <div className="component-example">
          <Checkbox>Checkbox label</Checkbox>
        </div>
      </section>
      <section aria-labelledby="checkbox-states-heading" className="component-section">
        <h2 id="checkbox-states-heading" className="mz-text-heading-md">
          States
        </h2>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Checkbox states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="unselected">
                <Cell><strong>Unselected</strong></Cell>
                <Cell><Checkbox>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="selected">
                <Cell><strong>Selected</strong></Cell>
                <Cell><Checkbox defaultSelected>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="indeterminate">
                <Cell><strong>Indeterminate</strong></Cell>
                <Cell><Checkbox isIndeterminate>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="disabled">
                <Cell><strong>Disabled</strong></Cell>
                <Cell><Checkbox isDisabled>Checkbox</Checkbox></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}
