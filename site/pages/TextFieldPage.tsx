import { useState } from 'react'
import { Form } from 'react-aria-components/Form'
import { Button, FieldError, Input, Label, Text, TextField, TableOfContents } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <DocumentationHeading title="Text field" reactAriaPage="TextField"
        description="A single-line field for entering text. Compose TextField with Input, Label, optional description Text and FieldError." />
      <TableOfContents sections={[
        { id: 'text-field-example', label: 'Example' },
        { id: 'text-field-states', label: 'States' },
        { id: 'text-field-validation', label: 'Validation' },
        { id: 'text-field-composition', label: 'Composition' },
      ]} />
      <section className="component-section" aria-labelledby="text-field-example">
        <h2 className="mz-text-heading-md" id="text-field-example">Example</h2>
        <div className="component-example">
          <TextField value={value} onChange={setValue}>
            <Label>Field label</Label>
            <Input placeholder="Enter text" />
            <Text slot="description">Supporting information about this field.</Text>
          </TextField>
          <p>Current value: {value || 'Empty'}</p>
        </div>
      </section>
      <section className="component-section" aria-labelledby="text-field-states">
        <h2 className="mz-text-heading-md" id="text-field-states">States</h2>
        <p>Focus or hover the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.</p>
        <div className="component-example">
          <TextField isReadOnly defaultValue="Read-only value">
            <Label>Read-only field</Label><Input />
          </TextField>
        </div>
        <div className="component-example">
          <TextField isDisabled defaultValue="Disabled value">
            <Label>Disabled field</Label><Input />
          </TextField>
        </div>
        <div className="component-example">
          <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
            <Label>Invalid field</Label><Input />
            <FieldError>This example shows an externally supplied error.</FieldError>
          </TextField>
        </div>
      </section>
      <section className="component-section" aria-labelledby="text-field-validation">
        <h2 className="mz-text-heading-md" id="text-field-validation">Validation</h2>
        <p>Submit an empty or incomplete email address to see validation. This local example does not send data.</p>
        <Form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <div className="component-example">
            <TextField name="email" type="email" isRequired onChange={() => setSubmitted(false)}>
              <Label>Email address (required)</Label>
              <Input autoComplete="email" />
              <Text slot="description">Enter an address such as name@example.com.</Text>
              <FieldError />
            </TextField>
            <p><Button type="submit">Validate field</Button></p>
            <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
          </div>
        </Form>
      </section>
      <section className="component-section" aria-labelledby="text-field-composition">
        <h2 className="mz-text-heading-md" id="text-field-composition">Composition</h2>
        <p><code>TextField</code> and <code>Input</code> expose the React Aria APIs directly. Use Mezzanine’s <code>Label</code>, <code>Text slot="description"</code> and <code>FieldError</code> inside the field for automatically associated text.</p>
        <p>Use <code>defaultValue</code> for an initial value, or <code>value</code> with <code>onChange</code> for a value managed by your application. Set <code>isRequired</code>, <code>isReadOnly</code>, <code>isDisabled</code> or <code>isInvalid</code> on <code>TextField</code>. Put <code>placeholder</code> on <code>Input</code>; it does not replace a label.</p>
        <p>The validation example uses React Aria’s <code>Form</code> directly; Mezzanine does not yet export Form. The field has no animation, and its colours and dimensions can be overridden through tokens.</p>
      </section>
    </>
  )
}
