import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const textAreaContent: DocsPageContent = {
  id: 'text-area',
  kind: 'component',
  title: 'Text area',
  description: 'A text area is a box for writing several lines of text, such as a message or a description. It gives people room for longer answers and can be made taller by dragging its resize handle where the browser supports one.',
  sections: [
    {
      key: 'example',
      body: ['Enter text and press Enter to add a line. Where your browser provides a resize handle, drag it to make the field taller.'],
    },
    {
      key: 'states',
      body: ['Hover or focus the editable fields to inspect their interaction states. Read-only text remains selectable; disabled fields are skipped when using Tab.'],
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
          { name: 'TextField', description: 'Manages value, validation and associations between field parts.' },
          { name: 'Label', description: 'Provides the visible field label.' },
          { name: 'TextArea', description: 'Renders a multiline input with vertical resizing.' },
          { name: 'Text slot="description"', description: 'Provides optional supporting text.' },
          { name: 'FieldError', description: 'Displays validation feedback.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        '`TextArea` replaces `Input` inside `TextField`.',
        'Set `defaultValue` on `TextField` for an initial value, or use `value` and `onChange` to manage its value in your application. Set `isRequired`, `isReadOnly`, `isDisabled` and `isInvalid` on `TextField`. The invalid example above remains invalid while you edit it.',
        'Set `rows` on `TextArea` to choose its initial visible line count. The field permits vertical resizing and stays within its container width. `--height-text-area-min` sets its minimum height; otherwise it looks and behaves like a text field.',
        'Put `placeholder` on `TextArea`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use Mezzanine’s `Label`, `Text slot="description"` and `FieldError` for automatically associated labels, supporting text and errors.',
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
