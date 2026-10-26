import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

// The Checkbox group example's teaching labels.
export const checkboxGroupExampleLabels = {
  group: 'Group A',
  checkboxes: ['Checkbox A', 'Checkbox B', 'Checkbox C'],
  description: 'Group A help text.',
}

export const checkboxContent: DocsPageContent = {
  id: 'checkbox',
  kind: 'component',
  title: 'Checkbox',
  description: 'A checkbox is a small box that can be ticked or unticked to turn a choice on or off. Use checkboxes when people can choose several options, or confirm something such as accepting terms.',
  sections: [
    { key: 'example', intro: ['Select or clear the `Checkbox` using its label or the Space key when focused.'] },
    { key: 'states' },
    { key: 'checkboxGroup', title: 'Checkbox group', intro: ['`CheckboxGroup` gives related checkboxes one label, with any help text or error message after them.'] },
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
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Checkbox pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Checkbox'),
      },
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

// The Properties panels' on/off props, in panel order, and the Example's label.
export const checkboxExampleLabel = 'Checkbox label'
export const checkboxFlags = ['defaultSelected', 'isIndeterminate', 'isDisabled', 'isInvalid', 'isReadOnly'] as const
export const checkboxGroupFlags = ['isDisabled', 'isInvalid', 'isReadOnly'] as const
export const checkboxGroupDefaultValueLabel = 'defaultValue'

export function checkboxExampleCode(props: Record<string, unknown>) {
  return `<Checkbox${formatJsxProps(props)}>${checkboxExampleLabel}</Checkbox>`
}

export function checkboxGroupExampleCode(props: Record<string, unknown>) {
  return [
    `<CheckboxGroup${formatJsxProps(props)}>`,
    `  <Label>${checkboxGroupExampleLabels.group}</Label>`,
    ...checkboxGroupExampleLabels.checkboxes.map((checkbox) => `  <Checkbox value="${checkbox}">${checkbox}</Checkbox>`),
    `  <Text slot="description">${checkboxGroupExampleLabels.description}</Text>`,
    '</CheckboxGroup>',
  ].join('\n')
}

// Row labels for the States table; the page renders a live checkbox in each state.
export const checkboxStateLabels = {
  unselected: 'Unselected',
  selected: 'Selected',
  indeterminate: 'Indeterminate',
  disabled: 'Disabled',
} as const
