import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxElementLines, formatJsxPropLines, formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

// Field tokens shared by Input and TextArea.
export const textFieldContent: DocsPageContent = {
  id: 'text-field',
  kind: 'component',
  title: 'Text field',
  description: '`TextField` is a component for entering one line of text, such as a name or an email address. Its label tells people what to enter, and supporting text can explain any requirements or errors.',
  sections: [
    { key: 'example', body: ['Read-only text remains selectable; disabled fields are skipped when using Tab.'] },
    {
      key: 'validation',
      title: 'Validation',
      body: ['An empty or incomplete email address fails validation when the form is submitted. This local example does not send data.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'TextField anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'TextField', description: 'Holds the value and its validation. Mezzanine draws the label, help text, error and input, in that order.' },
          { name: 'Input', description: 'The single-line input.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Use `defaultValue` for an initial value, or `value` with `onChange` for a value managed by your application. Set `isRequired`, `isReadOnly`, `isDisabled` or `isInvalid` on `TextField`.',
        '`description` adds help text and `errorMessage` the message shown when the field is invalid. Both sit under the label, above the input, so people read them before they type.',
        '`TextField`’s colours and dimensions can be overridden through tokens.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers announce the `label`, the help text and any error with the input.',
        '`placeholder` does not replace a label.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Text field pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('TextField'),
      },
    },
  ],
  relatedPages: [
    { label: 'Text area', href: '/text-area' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria TextField', href: 'https://react-aria.adobe.com/TextField' },
  ],
}

// The Example's copy, and the Properties panel's choices in panel order. The error message shows
// whenever isInvalid is on.
export const textFieldExampleText = {
  label: 'Field label', placeholder: 'Enter text', description: 'Supporting information about this field.', errorMessage: 'Field error message',
} as const
export const textFieldTypes = ['text', 'email', 'password'] as const
export const textFieldFlags = ['description', 'isInvalid', 'placeholder', 'isReadOnly', 'isDisabled'] as const
export const textFieldValidationBehaviors = ['native', 'aria'] as const

// The props in the Properties panel's order, one to a line.
export function textFieldExampleCode({ type, flags }: { type: string, flags: Record<(typeof textFieldFlags)[number], boolean> }) {
  const props = {
    type: type === 'text' ? undefined : type,
    description: flags.description ? textFieldExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? textFieldExampleText.errorMessage : undefined,
    placeholder: flags.placeholder ? textFieldExampleText.placeholder : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
    validationBehavior: 'aria',
  }
  return formatJsxElementLines('TextField', [...formatJsxPropLines({ label: textFieldExampleText.label, ...props }), 'value={value}', 'onChange={setValue}'])
}

export function textFieldValidationCode(validationBehavior: string) {
  return [
    `<Form${formatJsxProps({ validationBehavior: validationBehavior === 'native' ? undefined : validationBehavior })} onSubmit={handleSubmit}>`,
    '  <TextField',
    '    label="Email address (required)"',
    '    description="Enter an address such as name@example.com."',
    '    name="email" type="email" autoComplete="email" isRequired',
    '  />',
    '  <Button type="submit">Validate field</Button>',
    '</Form>',
  ].join('\n')
}
