import { Button, DemoBlock, Form, Switch, TextField } from '@decocode/mezzanine'
import { useState } from 'react'
import { PanelSelect } from '../../../../components/PanelSelect'
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
  const [validationBehavior, setValidationBehavior] = useState<(typeof textFieldValidationBehaviors)[number]>('native')

  const panelSwitch = (name: (typeof textFieldFlags)[number]) => (
    <Switch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
  )
  return (
    <ContentPage
      content={textFieldContent}
      parts={{
        example: (
          <DemoBlock
            codeView={textFieldExampleCode({ type, flags })}
            endPanel={<>
              {/* The field's kind first, then its parts in their own order, top to bottom: help text, error,
                  then the box. The states that affect the whole field come last. A field is either disabled or invalid, so each of
                  those switches hides while the other is on. */}
              <PanelSelect label="type" options={textFieldTypes} value={type} onChange={setType} />
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('placeholder')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            <TextField
              label={textFieldExampleText.label}
              description={flags.description ? textFieldExampleText.description : undefined}
              errorMessage={flags.isInvalid ? textFieldExampleText.errorMessage : undefined}
              placeholder={flags.placeholder ? textFieldExampleText.placeholder : undefined}
              type={type} isDisabled={flags.isDisabled} isReadOnly={flags.isReadOnly} isInvalid={flags.isInvalid} validationBehavior="aria" value={value} onChange={setValue}
            />
            <p>Current value: {value || 'Empty'}</p>
          </DemoBlock>
        ),
        validation: (
          <DemoBlock
            codeView={textFieldValidationCode(validationBehavior)}
            endPanel={<PanelSelect label="validationBehavior" options={textFieldValidationBehaviors} value={validationBehavior} onChange={setValidationBehavior} />}
          >
            {/* A new key starts the form again, so a change of behaviour clears its errors. */}
            <Form key={validationBehavior} validationBehavior={validationBehavior} onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
              <TextField
                label="Email address (required)"
                description="Enter an address such as name@example.com."
                name="email" type="email" autoComplete="email" isRequired onChange={() => setSubmitted(false)}
              />
              <p><Button type="submit">Validate field</Button></p>
              <p role="status">{submitted ? 'The email address passed validation.' : ''}</p>
            </Form>
          </DemoBlock>
        ),
      }}
    />
  )
}
