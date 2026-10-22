import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const formContent: DocsPageContent = {
  id: 'form',
  kind: 'component',
  title: 'Form',
  description: 'A form groups fields and the button that sends them, and shows their errors together.',
  sections: [
    { key: 'example', intro: ['`Form` lays its fields out one above another, with room between them. Sending it with a required field empty shows that field’s error.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Form anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Form', description: 'A `form` element that collects its fields’ errors.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put fields and a submit `Button` inside `Form`, and handle `onSubmit`. `validationErrors` shows errors from the server against each field’s `name`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Sending the form moves focus to the first field with an error, and screen readers announce its message.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Form pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Form'),
      },
    },
  ],
  relatedPages: [
    { label: 'Text field', href: '/text-field' },
    { label: 'Button', href: '/button' },
  ],
  references: [
    { label: 'React Aria Form', href: 'https://react-aria.adobe.com/Form' },
  ],
}

// The example's labels.
export const formExampleLabels = { field: 'Field A', submit: 'Submit' } as const
