import { useState } from 'react'
import { Form } from 'react-aria-components/Form'
import { Button, FieldError, Input, Label, Text, TextField } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <ComponentPageTemplate
      title="Text field"
      reactAriaPage="TextField"
      description="A single-line field for entering text. Compose TextField with Input, Label, optional description Text and FieldError."
      sections={[
        {
          id: 'text-field-example',
          title: 'Example',
          content: (<>
            <div className="component-example">
              <TextField value={value} onChange={setValue}>
                <Label>Field label</Label>
                <Input placeholder="Enter text" />
                <Text slot="description">Supporting information about this field.</Text>
              </TextField>
              <p>Current value: {value || 'Empty'}</p>
            </div>
          </>),
        },
        {
          id: 'text-field-states',
          title: 'States',
          content: (<>
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
          </>),
        },
        {
          id: 'text-field-validation',
          title: 'Validation',
          content: (<>
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
          </>),
        },
        {
          id: 'text-field-composition',
          title: 'Composition',
          content: (<>
            <p><code>TextField</code> and <code>Input</code> expose the React Aria APIs directly. Use Mezzanine’s <code>Label</code>, <code>Text slot="description"</code> and <code>FieldError</code> inside the field for automatically associated text.</p>
            <p>Use <code>defaultValue</code> for an initial value, or <code>value</code> with <code>onChange</code> for a value managed by your application. Set <code>isRequired</code>, <code>isReadOnly</code>, <code>isDisabled</code> or <code>isInvalid</code> on <code>TextField</code>. Put <code>placeholder</code> on <code>Input</code>; it does not replace a label.</p>
            <p>The validation example uses React Aria’s <code>Form</code> directly; Mezzanine does not yet export Form. The field has no animation, and its colours and dimensions can be overridden through tokens.</p>
          </>),
        }
      ]}
    />
  )
}
