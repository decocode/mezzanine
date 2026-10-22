import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

// Field tokens shared by Input and TextArea.
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
