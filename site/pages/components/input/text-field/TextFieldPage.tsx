import { ExampleZone } from '../../../../components/ExampleZone'
import { Button, FieldError, Form, Input, Label, Text, TextField } from '@decocode/mezzanine'
import { useState } from 'react'
import { textFieldContent } from './textFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <ContentPage
      content={textFieldContent}
      parts={{
        example: (
          <ExampleZone>
            <TextField value={value} onChange={setValue}>
              <Label>Field label</Label>
              <Input placeholder="Enter text" />
              <Text slot="description">Supporting information about this field.</Text>
            </TextField>
            <p>Current value: {value || 'Empty'}</p>
          </ExampleZone>
        ),
        states: (<>
          <ExampleZone>
            <TextField isReadOnly defaultValue="Read-only value">
              <Label>Read-only field</Label><Input />
            </TextField>
          </ExampleZone>
          <ExampleZone>
            <TextField isDisabled defaultValue="Disabled value">
              <Label>Disabled field</Label><Input />
            </TextField>
          </ExampleZone>
          <ExampleZone>
            <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
              <Label>Invalid field</Label><Input />
              <FieldError>This example shows an externally supplied error.</FieldError>
            </TextField>
          </ExampleZone>
        </>),
        validation: (
          <Form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <ExampleZone>
              <TextField name="email" type="email" isRequired onChange={() => setSubmitted(false)}>
                <Label>Email address (required)</Label>
                <Input autoComplete="email" />
                <Text slot="description">Enter an address such as name@example.com.</Text>
                <FieldError />
              </TextField>
              <p><Button type="submit">Validate field</Button></p>
              <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
            </ExampleZone>
          </Form>
        ),
      }}
    />
  )
}
