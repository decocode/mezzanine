import { Button, DemoArea, FieldError, Form, Input, Label, TextField } from '@decocode/mezzanine'
import { formContent, formExampleLabels } from './formContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function FormPage() {
  return (
    <ContentPage
      content={formContent}
      parts={{
        example: <DemoArea>
          <Form onSubmit={(event) => event.preventDefault()}>
            <TextField name="field-a" isRequired>
              <Label>{formExampleLabels.field}</Label>
              <Input />
              <FieldError />
            </TextField>
            <Button type="submit">{formExampleLabels.submit}</Button>
          </Form>
        </DemoArea>,
      }}
    />
  )
}
