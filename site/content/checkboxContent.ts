import type { DocsPageContent } from '../templates/docsPageContent'

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
    {
      key: 'tokens',
      intro: ['`Checkbox` also uses shared typography, text colour, focus colour and disabled-opacity tokens.'],
      table: {
        label: 'Checkbox CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--checkbox-size', description: 'Width and height of the checkbox box.' },
          { name: '--checkbox-icon-size', description: 'Size of the check and indeterminate icons.' },
          { name: '--checkbox-content-gap', description: 'Space between the box and its label.' },
          { name: '--checkbox-border-width', description: 'Box border thickness.' },
          { name: '--checkbox-border-radius', description: 'Rounding of the box corners.' },
          { name: '--checkbox-border', description: 'Box border colour when not selected.' },
          { name: '--checkbox-border-invalid', description: 'Box border colour when invalid.' },
          { name: '--checkbox-background', description: 'Box background when not selected.' },
          { name: '--checkbox-background-hovered', description: 'Box background when not selected and hovered.' },
          { name: '--checkbox-background-selected', description: 'Box background and border colour when selected or indeterminate.' },
          { name: '--checkbox-background-selected-hovered', description: 'Box background and border colour when selected or indeterminate and hovered.' },
          { name: '--checkbox-content-selected', description: 'Icon colour when selected or indeterminate.' },
          { name: '--checkbox-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--checkbox-focus-ring-offset', description: 'Distance between the box and its keyboard-focus outline.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Text field', href: '/text-field' },
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
