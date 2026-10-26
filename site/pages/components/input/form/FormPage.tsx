import { useState } from 'react'
import { Button, DemoArea, FieldError, Form, Input, Label, TextField } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { formContent, formExampleCode, formExampleLabels, formValidationBehaviors } from './formContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function FormPage() {
  const [validationBehavior, setValidationBehavior] = useState<(typeof formValidationBehaviors)[number]>('native')
  return (
    <ContentPage
      content={formContent}
      parts={{
        example: (
          <DemoArea
            codeView={formExampleCode(validationBehavior)}
            endPanel={<PanelSelect label="validationBehavior" options={formValidationBehaviors} value={validationBehavior} onChange={setValidationBehavior} />}
          >
            {/* A new key starts the form again, so a change of behaviour clears its errors. */}
            <Form key={validationBehavior} validationBehavior={validationBehavior} onSubmit={(event) => event.preventDefault()}>
              <TextField name="field-a" isRequired>
                <Label>{formExampleLabels.field}</Label>
                <Input />
                <FieldError />
              </TextField>
              <Button type="submit">{formExampleLabels.submit}</Button>
            </Form>
          </DemoArea>
        ),
      }}
    />
  )
}
