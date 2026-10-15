import { fieldTokensRows } from './textFieldContent'

// Written guidance and reference entries; live examples stay in the page.
export const textAreaContent = {
  title: 'Text area',
  description: 'A text area is a box for writing several lines of text, such as a message or a description. It gives people room for longer answers and can be made taller by dragging its resize handle where the browser supports one.',
  relatedPages: [
    { label: 'Text field', href: '/text-field' },
  ],
  references: [
    { label: 'React Aria TextField', href: 'https://react-aria.adobe.com/TextField' },
  ],
  exampleParagraphs: [
    <>Enter text and press Enter to add a line. Where your browser provides a resize handle, drag it to make the field taller.</>,
  ],
  anatomyRows: [
    { name: 'TextField', description: <>Manages value, validation and associations between field parts.</> },
    { name: 'Label', description: <>Provides the visible field label.</> },
    { name: 'TextArea', description: <>Renders a multiline input with vertical resizing.</> },
    { name: 'Text slot="description"', description: <>Provides optional supporting text.</> },
    { name: 'FieldError', description: <>Displays validation feedback.</> },
  ],
  statesParagraphs: [
    <>Hover or focus the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.</>,
  ],
  usageParagraphs: [
    <><code>TextArea</code> replaces <code>Input</code> inside <code>TextField</code>.</>,
    <>Set <code>defaultValue</code> on <code>TextField</code> for an initial value, or use <code>value</code> and <code>onChange</code> to manage its value in your application. Set <code>isRequired</code>, <code>isReadOnly</code>, <code>isDisabled</code> and <code>isInvalid</code> on <code>TextField</code>. The invalid example above remains invalid while you edit it.</>,
    <>Set <code>rows</code> on <code>TextArea</code> to choose its initial visible line count. The field permits vertical resizing and stays within its container width. The <code>--text-area-min-height</code> token sets its minimum height; it shares Input’s appearance and state tokens.</>,
    <>Put <code>placeholder</code> on <code>TextArea</code>.</>,
  ],
  accessibilityParagraphs: [
    <>Use Mezzanine’s <code>Label</code>, <code>Text slot="description"</code> and <code>FieldError</code> for automatically associated labels, supporting text and errors.</>,
    <>Keep a visible label: a placeholder disappears when someone enters text.</>,
  ],
  tokensRows: [
    { name: '--text-area-min-height', description: <>Minimum <code>TextArea</code> height.</> },
    ...fieldTokensRows,
  ],
  tokensParagraphs: [
    <><code>TextArea</code> shares these tokens with <code>Input</code>; only its minimum height token differs. The field also uses shared typography, text colour, focus colour and disabled-opacity tokens.</>,
  ],
}
