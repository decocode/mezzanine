import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const checkboxContent: DocsPageContent = {
  id: 'checkbox',
  kind: 'component',
  title: 'Checkbox',
  description: 'A checkbox is a small box that can be ticked or unticked to turn a choice on or off. Use checkboxes when people can choose several options, or confirm something such as accepting terms.',
  sections: [
    { key: 'example', intro: ['Select or clear the `Checkbox` using its label or the Space key when focused.'] },
    { key: 'states' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Checkbox anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Checkbox', description: 'Provides the interactive checkbox, native input and visible label. Mezzanine adds a decorative check or indeterminate indicator internally.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Place the visible label inside `Checkbox`. Use `defaultSelected` for initial state, or `isSelected` with `onChange` for controlled state. The callback receives a boolean.',
        '`isDisabled` prevents interaction; `isReadOnly` prevents value changes. `isIndeterminate` controls the mixed-state appearance independently of selection; the application must clear it when appropriate.',
        'For form submission, provide `name` and `value`. Use `isRequired` with native validation to require selection, or `isInvalid` to communicate an application validation result.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab focuses the checkbox and Space changes its selection.',
        'Provide visible error guidance and associate it using `aria-describedby`; this wrapper does not insert error text automatically.',
      ],
    },
  ],
  relatedPages: [
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Text field', href: '/text-field' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Checkbox', href: 'https://react-aria.adobe.com/Checkbox' },
  ],
}

// Row labels for the States table; the page renders a live checkbox in each state.
export const checkboxStateLabels = {
  unselected: 'Unselected',
  selected: 'Selected',
  indeterminate: 'Indeterminate',
  disabled: 'Disabled',
} as const
