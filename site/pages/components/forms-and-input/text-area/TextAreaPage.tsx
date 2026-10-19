import { ExampleZone } from '../../../../components/ExampleZone'
import { FieldError, Label, Text, TextArea, TextField } from '@decocode/mezzanine'
import { textAreaContent } from './textAreaContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TextAreaPage() {
  return (
    <ContentPage
      content={textAreaContent}
      parts={{
        example: (
          <ExampleZone>
            <TextField>
              <Label>Text area label</Label>
              <TextArea rows={4} placeholder="Enter multiple lines of text" />
              <Text slot="description">Supporting information about this field.</Text>
            </TextField>
          </ExampleZone>
        ),
        states: (<>
          <ExampleZone>
            <TextField isReadOnly defaultValue={'First read-only line\nSecond read-only line'}>
              <Label>Read-only text area</Label>
              <TextArea rows={3} />
            </TextField>
          </ExampleZone>
          <ExampleZone>
            <TextField isDisabled defaultValue="Disabled value">
              <Label>Disabled text area</Label>
              <TextArea rows={3} />
            </TextField>
          </ExampleZone>
          <ExampleZone>
            <TextField isInvalid validationBehavior="aria" defaultValue="Invalid value">
              <Label>Invalid text area</Label>
              <TextArea rows={3} />
              <FieldError>This example shows an externally supplied error.</FieldError>
            </TextField>
          </ExampleZone>
        </>),
      }}
    />
  )
}
