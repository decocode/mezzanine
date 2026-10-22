import { Button, DemoArea, FieldError, Form, Input, Label, Text, TextField } from '@decocode/mezzanine'
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
          <DemoArea>
            <TextField value={value} onChange={setValue}>
              <Label>Field label</Label>
              <Input placeholder="Enter text" />
              <Text slot="description">Supporting information about this field.</Text>
            </TextField>
            <p>Current value: {value || 'Empty'}</p>
          </DemoArea>
        ),
        states: (<>
          <DemoArea>
            <TextField isReadOnly defaultValue="Read-only value">
              <Label>Read-only field</Label><Input />
            </TextField>
          </DemoArea>
          <DemoArea>
            <TextField isDisabled defaultValue="Disabled value">
              <Label>Disabled field</Label><Input />
            </TextField>
          </DemoArea>
          <DemoArea>
            <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
              <Label>Invalid field</Label><Input />
              <FieldError>This example shows an externally supplied error.</FieldError>
            </TextField>
          </DemoArea>
        </>),
        validation: (
          <Form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <DemoArea>
              <TextField name="email" type="email" isRequired onChange={() => setSubmitted(false)}>
                <Label>Email address (required)</Label>
                <Input autoComplete="email" />
                <Text slot="description">Enter an address such as name@example.com.</Text>
                <FieldError />
              </TextField>
              <p><Button type="submit">Validate field</Button></p>
              <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
            </DemoArea>
          </Form>
        ),
      }}
    />
  )
}
