import { Checkbox, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function CheckboxPage() {
  return (
    <ComponentPageTemplate
      description="Checkboxes let people select one or more independent options. Their label explains what will be selected."
      reactAriaPage="Checkbox"
      title="Checkbox"
      sections={[
        {
          id: 'checkbox-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              Select or clear the <code>Checkbox</code> using its label or the Space key when focused.
            </p>
            <div className="component-example">
              <Checkbox>Checkbox label</Checkbox>
            </div>
          </>),
        },
        {
          id: 'checkbox-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="Checkbox anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>Checkbox</code></Cell><Cell>Provides the interactive checkbox, native input and visible label. Mezzanine adds a decorative check or indeterminate indicator internally.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'checkbox-states-heading',
          title: 'States',
          content: (<>
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
          </>),
        },
        {
          id: 'checkbox-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p>Place the visible label inside <code>Checkbox</code>. Use <code>defaultSelected</code> for initial state, or <code>isSelected</code> with <code>onChange</code> for controlled state. The callback receives a boolean.</p>
            <p>Tab focuses the checkbox and Space changes its selection. <code>isDisabled</code> prevents interaction; <code>isReadOnly</code> prevents value changes. <code>isIndeterminate</code> controls the mixed-state appearance independently of selection; the application must clear it when appropriate.</p>
            <p>For form submission, provide <code>name</code> and <code>value</code>. Use <code>isRequired</code> with native validation to require selection, or <code>isInvalid</code> to communicate an application validation result. Provide visible error guidance and associate it using <code>aria-describedby</code>; this wrapper does not insert error text automatically.</p>
          </>),
        }
      ]}
    />
  )
}
