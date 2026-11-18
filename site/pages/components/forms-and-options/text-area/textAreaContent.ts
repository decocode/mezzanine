import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxElementLines, formatJsxPropLines } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const textAreaContent: DocsPageContent = {
  id: 'text-area',
  kind: 'component',
  title: 'Text area',
  description: '`TextArea` is a component for writing several lines of text, such as a message or a description. It gives people room for longer answers and can be made taller by dragging its resize handle where the browser supports one.',
  sections: [
    {
      key: 'example',
      body: ['Enter adds a line. Where the browser provides a resize handle, it makes the field taller. Read-only text remains selectable; disabled fields are skipped when using Tab.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'TextArea anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'TextArea', description: 'Holds the value and its validation. Mezzanine draws the label, help text, error and a multiline box with vertical resizing, in that order.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Set `defaultValue` for an initial value, or use `value` and `onChange` to manage its value in your application. Set `isRequired`, `isReadOnly`, `isDisabled` and `isInvalid`. An invalid text area stays invalid while it’s edited.',
        '`description` adds help text and `errorMessage` the message shown when the field is invalid. Both sit under the label, above the box.',
        '`rows` chooses its initial visible line count. The field permits vertical resizing and stays within its container width. `--height-text-area-min` sets its minimum height; otherwise it looks and behaves like a text field.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers announce the `label`, the help text and any error with the box.',
        'Keep a visible label: a placeholder disappears when someone enters text.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Text area pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('TextField'),
      },
    },
  ],
  relatedPages: [
    { label: 'Text field', href: '/text-field' },
  ],
  references: [
    { label: 'React Aria TextField', href: 'https://react-aria.adobe.com/TextField' },
  ],
}

// The Example's copy, and the Properties panel's choices in panel order. The error message shows
// whenever isInvalid is on.
export const textAreaExampleText = {
  label: 'Text area label', placeholder: 'Enter multiple lines of text', description: 'Supporting information about this field.', errorMessage: 'Text area error message',
} as const
export const textAreaRows = ['2', '4', '6'] as const
export const textAreaFlags = ['description', 'isInvalid', 'placeholder', 'isReadOnly', 'isDisabled'] as const

// The props in the Properties panel's order, one to a line.
export function textAreaExampleCode({ rows, flags }: { rows: number, flags: Record<(typeof textAreaFlags)[number], boolean> }) {
  const props = {
    rows: rows,
    description: flags.description ? textAreaExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? textAreaExampleText.errorMessage : undefined,
    placeholder: flags.placeholder ? textAreaExampleText.placeholder : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
    validationBehavior: 'aria',
  }
  return formatJsxElementLines('TextArea', formatJsxPropLines({ label: textAreaExampleText.label, ...props }))
}
