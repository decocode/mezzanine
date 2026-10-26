import { Button, DemoArea, FieldError, Form, Input, Label, Text, TextField } from '@decocode/mezzanine'
import { useState } from 'react'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  textFieldContent, textFieldExampleCode, textFieldExampleText, textFieldFlags, textFieldTypes, textFieldValidationBehaviors, textFieldValidationCode,
} from './textFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TextFieldPage() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState<(typeof textFieldTypes)[number]>('text')
  const [flags, setFlags] = useState<Record<(typeof textFieldFlags)[number], boolean>>({
    placeholder: true, description: true, isDisabled: false, isReadOnly: false, isInvalid: false,
  })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  const [validationBehavior, setValidationBehavior] = useState<(typeof textFieldValidationBehaviors)[number]>('native')

  return (
    <ContentPage
      content={textFieldContent}
      parts={{
        example: (
          <DemoArea
            codeView={textFieldExampleCode({ type, flags, hasErrorMessage })}
            endPanel={<>
              <PanelSelect label="type" options={textFieldTypes} value={type} onChange={setType} />
              {textFieldFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            <TextField type={type} isDisabled={flags.isDisabled} isReadOnly={flags.isReadOnly} isInvalid={flags.isInvalid} validationBehavior="aria" value={value} onChange={setValue}>
              <Label>{textFieldExampleText.label}</Label>
              <Input placeholder={flags.placeholder ? textFieldExampleText.placeholder : undefined} />
              {flags.description && <Text slot="description">{textFieldExampleText.description}</Text>}
              {flags.isInvalid && hasErrorMessage && <FieldError>{textFieldExampleText.errorMessage}</FieldError>}
            </TextField>
            <p>Current value: {value || 'Empty'}</p>
          </DemoArea>
        ),
        validation: (
          <DemoArea
            codeView={textFieldValidationCode(validationBehavior)}
            endPanel={<PanelSelect label="validationBehavior" options={textFieldValidationBehaviors} value={validationBehavior} onChange={setValidationBehavior} />}
          >
            {/* A new key starts the form again, so a change of behaviour clears its errors. */}
            <Form key={validationBehavior} validationBehavior={validationBehavior} onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
              <TextField name="email" type="email" isRequired onChange={() => setSubmitted(false)}>
                <Label>Email address (required)</Label>
                <Input autoComplete="email" />
                <Text slot="description">Enter an address such as name@example.com.</Text>
                <FieldError />
              </TextField>
              <p><Button type="submit">Validate field</Button></p>
              <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
            </Form>
          </DemoArea>
        ),
      }}
    />
  )
}
