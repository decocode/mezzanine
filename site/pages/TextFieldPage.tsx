import { ComponentExample } from '../components/ComponentExample'
import { Button, FieldError, Input, Label, Text, TextField } from '@decocode/mezzanine'
import { useState } from 'react'
import { Form } from 'react-aria-components/Form'
import { textFieldContent } from '../content/textFieldContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <ComponentPageTemplate
      title={textFieldContent.title}
      description={textFieldContent.description}
      relatedPages={textFieldContent.relatedPages}
      references={textFieldContent.references}
      sections={[
        {
          id: 'text-field-example',
          title: 'Example',
          content: (<>
            <ComponentExample>
              <TextField value={value} onChange={setValue}>
                <Label>Field label</Label>
                <Input placeholder="Enter text" />
                <Text slot="description">Supporting information about this field.</Text>
              </TextField>
              <p>Current value: {value || 'Empty'}</p>
            </ComponentExample>
          </>),
        },
        {
          id: 'text-field-states',
          title: 'States',
          content: (<>
            {textFieldContent.statesParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <ComponentExample>
              <TextField isReadOnly defaultValue="Read-only value">
                <Label>Read-only field</Label><Input />
              </TextField>
            </ComponentExample>
            <ComponentExample>
              <TextField isDisabled defaultValue="Disabled value">
                <Label>Disabled field</Label><Input />
              </TextField>
            </ComponentExample>
            <ComponentExample>
              <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
                <Label>Invalid field</Label><Input />
                <FieldError>This example shows an externally supplied error.</FieldError>
              </TextField>
            </ComponentExample>
          </>),
        },
        {
          id: 'text-field-validation',
          title: 'Validation',
          content: (<>
            {textFieldContent.validationParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <Form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
              <ComponentExample>
                <TextField name="email" type="email" isRequired onChange={() => setSubmitted(false)}>
                  <Label>Email address (required)</Label>
                  <Input autoComplete="email" />
                  <Text slot="description">Enter an address such as name@example.com.</Text>
                  <FieldError />
                </TextField>
                <p><Button type="submit">Validate field</Button></p>
                <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
              </ComponentExample>
            </Form>
          </>),
        },
        {
          id: 'text-field-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'text-field-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <ComponentReferenceTable aria-label="TextField anatomy" nameColumn="Component" rows={textFieldContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'text-field-composition',
              title: 'Usage and accessibility',
              content: (<>
                {textFieldContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
