import { Table, TableHeader, Column, TableBody, Row, Cell, FieldError, Label, Text, TextArea, TextField } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function TextAreaPage() {
  return (
    <ComponentPageTemplate
      title="Text area"
      reactAriaPage="TextField"
      description="A field for entering multiple lines of text. Compose TextField with TextArea, Label, optional description Text and FieldError."
      sections={[
        {
          id: 'text-area-example',
          title: 'Example',
          content: (<>
            <p>Enter text and press Enter to add a line. Where your browser provides a resize handle, drag it to make the field taller.</p>
            <div className="component-example">
              <TextField>
                <Label>Text area label</Label>
                <TextArea rows={4} placeholder="Enter multiple lines of text" />
                <Text slot="description">Supporting information about this field.</Text>
              </TextField>
            </div>
          </>),
        },
        {
          id: 'text-area-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="TextArea anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>TextField</code></Cell><Cell>Manages value, validation and associations between field parts.</Cell></Row>
                  <Row id="part-1"><Cell><code>Label</code></Cell><Cell>Provides the visible field label.</Cell></Row>
                  <Row id="part-2"><Cell><code>TextArea</code></Cell><Cell>Renders a multiline input with vertical resizing.</Cell></Row>
                  <Row id="part-3"><Cell><code>Text slot="description"</code></Cell><Cell>Provides optional supporting text.</Cell></Row>
                  <Row id="part-4"><Cell><code>FieldError</code></Cell><Cell>Displays validation feedback.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'text-area-states',
          title: 'States',
          content: (<>
            <p>Hover or focus the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.</p>
            <div className="component-example">
              <TextField isReadOnly defaultValue={'First read-only line\nSecond read-only line'}>
                <Label>Read-only text area</Label>
                <TextArea rows={3} />
              </TextField>
            </div>
            <div className="component-example">
              <TextField isDisabled defaultValue="Disabled value">
                <Label>Disabled text area</Label>
                <TextArea rows={3} />
              </TextField>
            </div>
            <div className="component-example">
              <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
                <Label>Invalid text area</Label>
                <TextArea rows={3} />
                <FieldError>This example shows an externally supplied error.</FieldError>
              </TextField>
            </div>
          </>),
        },
        {
          id: 'text-area-composition',
          title: 'Usage and accessibility',
          content: (<>
            <p><code>TextArea</code> replaces <code>Input</code> inside <code>TextField</code>. Use Mezzanine’s <code>Label</code>, <code>Text slot="description"</code> and <code>FieldError</code> for automatically associated labels, supporting text and errors.</p>
            <p>Set <code>defaultValue</code> on <code>TextField</code> for an initial value, or use <code>value</code> and <code>onChange</code> to manage its value in your application. Set <code>isRequired</code>, <code>isReadOnly</code>, <code>isDisabled</code> and <code>isInvalid</code> on <code>TextField</code>. The invalid example above remains invalid while you edit it.</p>
            <p>Set <code>rows</code> on <code>TextArea</code> to choose its initial visible line count. The field permits vertical resizing and stays within its container width. The <code>--text-area-min-height</code> token sets its minimum height; it shares Input’s appearance and state tokens. No animation is applied.</p>
            <p>Put <code>placeholder</code> on <code>TextArea</code>. Keep a visible label: a placeholder disappears when someone enters text.</p>
          </>),
        }
      ]}
    />
  )
}
