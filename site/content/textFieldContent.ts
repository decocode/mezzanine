import type { DocsPageContent } from '../templates/docsPageContent'

// Field tokens shared by Input and TextArea.
export const fieldTokensRows = [
  { name: '--text-field-gap', description: 'Space between the label, field, description and error message.' },
  { name: '--input-padding-block', description: 'Vertical padding inside the field.' },
  { name: '--input-padding-inline', description: 'Horizontal padding inside the field.' },
  { name: '--input-border-width', description: 'Field border thickness.' },
  { name: '--input-border-radius', description: 'Rounding of the field corners.' },
  { name: '--input-background', description: 'Field background.' },
  { name: '--input-border', description: 'Field border colour.' },
  { name: '--input-border-hovered', description: 'Field border colour when hovered, unless the field is disabled, read-only or invalid.' },
  { name: '--input-border-invalid', description: 'Field border colour when invalid.' },
  { name: '--input-focus-ring-width', description: 'Focus outline thickness.' },
  { name: '--input-focus-ring-offset', description: 'Distance between the field and its focus outline.' },
  { name: '--text-field-error-content', description: '`FieldError` text colour.' },
]

export const textFieldContent: DocsPageContent = {
  id: 'text-field',
  kind: 'component',
  title: 'Text field',
  description: 'A text field is a box for entering one line of text, such as a name or an email address. Its label tells people what to enter, and supporting text can explain any requirements or errors.',
  sections: [
    { key: 'example' },
    {
      key: 'states',
      body: ['Focus or hover the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.'],
    },
    {
      key: 'validation',
      title: 'Validation',
      body: ['Submit an empty or incomplete email address to see validation. This local example does not send data.'],
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
          { name: 'TextField', description: 'Manages value, validation and associations between field parts.' },
          { name: 'Label', description: 'Provides the visible field label.' },
          { name: 'Input', description: 'Renders the single-line input.' },
          { name: 'Text slot="description"', description: 'Provides optional supporting text.' },
          { name: 'FieldError', description: 'Displays validation feedback.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        '`TextField` and `Input` expose the React Aria APIs directly.',
        'Use `defaultValue` for an initial value, or `value` with `onChange` for a value managed by your application. Set `isRequired`, `isReadOnly`, `isDisabled` or `isInvalid` on `TextField`.',
        'The validation example uses React Aria’s `Form` directly; Mezzanine does not yet export Form. Its colours and dimensions can be overridden through tokens.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use Mezzanine’s `Label`, `Text slot="description"` and `FieldError` inside the field for automatically associated text.',
        'Put `placeholder` on `Input`; it does not replace a label.',
      ],
    },
    {
      key: 'tokens',
      intro: ["These tokens style `TextField` and its `Input`. `TextArea` shares all of them. A single-line field's height is the shared `--control-size-md`, and `TextArea` sets its own minimum. The field also uses shared typography, text colour, focus colour and disabled-opacity tokens."],
      table: {
        label: 'TextField CSS tokens',
        nameColumn: 'CSS token',
        rows: fieldTokensRows,
      },
    },
  ],
  relatedPages: [
    { label: 'Text area', href: '/text-area' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria TextField', href: 'https://react-aria.adobe.com/TextField' },
  ],
}
