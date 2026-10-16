import { ExampleZone } from '../components/ExampleZone'
import { Button, FieldError, Input, Label, Text, TextField } from '@decocode/mezzanine'
import { useState } from 'react'
import { Form } from 'react-aria-components/Form'
import { textFieldContent } from '../content/textFieldContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <DocsPageTemplate
      title={textFieldContent.title}
      description={textFieldContent.description}
      relatedPages={textFieldContent.relatedPages}
      references={textFieldContent.references}
      sections={[
        {
          id: 'text-field-example',
          title: 'Example',
          content: (<>
            <ExampleZone>
              <TextField value={value} onChange={setValue}>
                <Label>Field label</Label>
                <Input placeholder="Enter text" />
                <Text slot="description">Supporting information about this field.</Text>
              </TextField>
              <p>Current value: {value || 'Empty'}</p>
            </ExampleZone>
          </>),
        },
        {
          id: 'text-field-states',
          title: 'States',
          content: (<>
            {textFieldContent.statesParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
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
        },
        {
          id: 'text-field-validation',
          title: 'Validation',
          content: (<>
            {textFieldContent.validationParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
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
                <DocsTable aria-label="TextField anatomy" nameColumn="Component" rows={textFieldContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'text-field-composition',
              title: 'Usage',
              content: (<>
                {textFieldContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'text-field-accessibility-heading',
              title: 'Accessibility',
              content: (<>
                {textFieldContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'text-field-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {textFieldContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="TextField CSS tokens" nameColumn="CSS token" rows={textFieldContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
