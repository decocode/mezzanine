import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const numberFieldContent: DocsPageContent = {
  id: 'number-field',
  kind: 'component',
  title: 'Number field',
  description: 'A number field takes a number, typed in or changed one step at a time with its minus and plus buttons.',
  sections: [
    { key: 'example', intro: ['`NumberField` shows its `label` and an input joined to minus and plus buttons. The value is formatted for the reader’s language.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Number field anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'NumberField', description: 'Holds and formats the value. Mezzanine draws the label, input, buttons, and help and error text.' },
          { name: 'Group', description: 'Joins the input to its buttons.' },
          { name: 'Button', description: 'The minus and plus buttons, with the `decrement` and `increment` slots.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Use `defaultValue`, or `value` with `onChange`. `minValue`, `maxValue` and `step` limit the value, and `formatOptions` formats it, for example as a currency or percentage.',
        '`description` adds help text and `errorMessage` the message shown when the field is invalid.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The Up and Down Arrow keys change the value by one step, and Page Up and Page Down by larger steps. The buttons are skipped by Tab, so keyboard users change the value from the input. Screen readers announce the label and value.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Number field pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('NumberField'),
      },
    },
  ],
  relatedPages: [
    { label: 'Text field', href: '/text-field' },
    { label: 'Slider', href: '/slider' },
  ],
  references: [
    { label: 'React Aria NumberField', href: 'https://react-aria.adobe.com/NumberField' },
  ],
}

// The example's label.
export const numberFieldExampleLabel = 'Number field A'
