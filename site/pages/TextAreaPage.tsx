import { ComponentExample } from '../components/ComponentExample'
import { FieldError, Label, Text, TextArea, TextField } from '@decocode/mezzanine'
import { textAreaContent } from '../content/textAreaContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function TextAreaPage() {
  return (
    <ComponentPageTemplate
      title={textAreaContent.title}
      reactAriaPage="TextField"
      description={textAreaContent.description}
      relatedPages={textAreaContent.relatedPages}
      references={textAreaContent.references}
      sections={[
        {
          id: 'text-area-example',
          title: 'Example',
          content: (<>
            {textAreaContent.exampleParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <ComponentExample>
              <TextField>
                <Label>Text area label</Label>
                <TextArea rows={4} placeholder="Enter multiple lines of text" />
                <Text slot="description">Supporting information about this field.</Text>
              </TextField>
            </ComponentExample>
          </>),
        },
        {
          id: 'text-area-states',
          title: 'States',
          content: (<>
            {textAreaContent.statesParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <ComponentExample>
              <TextField isReadOnly defaultValue={'First read-only line\nSecond read-only line'}>
                <Label>Read-only text area</Label>
                <TextArea rows={3} />
              </TextField>
            </ComponentExample>
            <ComponentExample>
              <TextField isDisabled defaultValue="Disabled value">
                <Label>Disabled text area</Label>
                <TextArea rows={3} />
              </TextField>
            </ComponentExample>
            <ComponentExample>
              <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
                <Label>Invalid text area</Label>
                <TextArea rows={3} />
                <FieldError>This example shows an externally supplied error.</FieldError>
              </TextField>
            </ComponentExample>
          </>),
        },
        {
          id: 'text-area-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'text-area-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <ComponentReferenceTable aria-label="TextArea anatomy" nameColumn="Component" rows={textAreaContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'text-area-composition',
              title: 'Usage and accessibility',
              content: (<>
                {textAreaContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
