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
  { name: '--text-field-error-content', description: <><code>FieldError</code> text colour.</> },
]

// Written guidance and reference entries; live examples stay in the page.
export const textFieldContent = {
  title: 'Text field',
  description: 'A text field is a box for entering one line of text, such as a name or an email address. Its label tells people what to enter, and supporting text can explain any requirements or errors.',
  relatedPages: [
    { label: 'Text area', href: '/text-area' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria TextField', href: 'https://react-aria.adobe.com/TextField' },
  ],
  anatomyRows: [
    { name: 'TextField', description: <>Manages value, validation and associations between field parts.</> },
    { name: 'Label', description: <>Provides the visible field label.</> },
    { name: 'Input', description: <>Renders the single-line input.</> },
    { name: 'Text slot="description"', description: <>Provides optional supporting text.</> },
    { name: 'FieldError', description: <>Displays validation feedback.</> },
  ],
  statesParagraphs: [
    <>Focus or hover the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.</>,
  ],
  validationParagraphs: [
    <>Submit an empty or incomplete email address to see validation. This local example does not send data.</>,
  ],
  usageParagraphs: [
    <><code>TextField</code> and <code>Input</code> expose the React Aria APIs directly.</>,
    <>Use <code>defaultValue</code> for an initial value, or <code>value</code> with <code>onChange</code> for a value managed by your application. Set <code>isRequired</code>, <code>isReadOnly</code>, <code>isDisabled</code> or <code>isInvalid</code> on <code>TextField</code>.</>,
    <>The validation example uses React Aria’s <code>Form</code> directly; Mezzanine does not yet export Form. Its colours and dimensions can be overridden through tokens.</>,
  ],
  accessibilityParagraphs: [
    <>Use Mezzanine’s <code>Label</code>, <code>Text slot="description"</code> and <code>FieldError</code> inside the field for automatically associated text.</>,
    <>Put <code>placeholder</code> on <code>Input</code>; it does not replace a label.</>,
  ],
  tokensRows: [
    { name: '--input-min-height', description: <>Minimum <code>Input</code> height.</> },
    ...fieldTokensRows,
  ],
  tokensParagraphs: [
    <>These tokens style <code>TextField</code> and its <code>Input</code>. <code>TextArea</code> shares all of them except <code>--input-min-height</code>. The field also uses shared typography, text colour, focus colour and disabled-opacity tokens.</>,
  ],
}
