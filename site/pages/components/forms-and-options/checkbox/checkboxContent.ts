import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxElementLines, formatJsxPropLines } from '../../../../components/formatJsxProps'

// The Checkbox group example's checkboxes.
export const checkboxGroupExampleLabels = { checkboxes: ['Checkbox A', 'Checkbox B', 'Checkbox C'] }

export const checkboxContent: DocsPageContent = {
  id: 'checkbox',
  kind: 'component',
  title: 'Checkbox',
  description: '`Checkbox` is a component that lets people turn an option on or off, or confirm something.',
  sections: [
    { key: 'example', intro: ['Select or clear the `Checkbox` using its label or the Space key when focused.'] },
    { key: 'states' },
    { key: 'checkboxGroup', title: 'Checkbox group', intro: ['`CheckboxGroup` gives related checkboxes one label, with any help text and error message after the label, before the checkboxes.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Checkbox anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Checkbox', description: 'Holds the selection and its validation. Mezzanine draws any error, then the box with its check or indeterminate indicator and the visible label, then any help text.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Place the visible label inside `Checkbox`. Use `defaultSelected` for initial state, or `isSelected` with `onChange` for controlled state. The callback receives a boolean.',
        '`isDisabled` prevents interaction; `isReadOnly` prevents value changes. `isIndeterminate` controls the mixed-state appearance independently of selection; the application must clear it when appropriate.',
        'For form submission, provide `name` and `value`. Use `isRequired` with native validation to require selection, or `isInvalid` to communicate an application validation result.',
        '`description` adds help text under the label, lined up with it. `errorMessage` is the message shown above the checkbox while it is invalid.',
        '`CheckboxGroup` takes `label`, `description` and `errorMessage` in the same way, and the `Checkbox`es as its content.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab focuses the checkbox and Space changes its selection.',
        'Screen readers read the help text and any error with the checkbox.',
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

// The Properties panels' on/off props, in panel order, and the examples' text. Each error message shows
// whenever isInvalid is on.
export const checkboxExampleText = { label: 'Checkbox label', description: 'Checkbox description', errorMessage: 'Checkbox error message' } as const
export const checkboxFlags = ['isInvalid', 'defaultSelected', 'isIndeterminate', 'description', 'isReadOnly', 'isDisabled'] as const
export const checkboxGroupFlags = ['description', 'isInvalid', 'isReadOnly', 'isDisabled'] as const
export const checkboxGroupExampleText = { label: 'Group', description: 'Group help text.', errorMessage: 'Group error message' } as const
export const checkboxGroupDefaultValueLabel = 'defaultValue'

// The examples' props, in panel order, shared by each demo and its code.
export function checkboxExampleProps(flags: Record<(typeof checkboxFlags)[number], boolean>) {
  return {
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? checkboxExampleText.errorMessage : undefined,
    defaultSelected: flags.defaultSelected,
    isIndeterminate: flags.isIndeterminate,
    description: flags.description ? checkboxExampleText.description : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
}

export function checkboxGroupExampleProps(defaultValue: string | null, flags: Record<(typeof checkboxGroupFlags)[number], boolean>) {
  return {
    label: checkboxGroupExampleText.label,
    defaultValue: defaultValue == null ? undefined : [defaultValue],
    description: flags.description ? checkboxGroupExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? checkboxGroupExampleText.errorMessage : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
}

export function checkboxExampleCode(flags: Record<(typeof checkboxFlags)[number], boolean>) {
  return formatJsxElementLines('Checkbox', formatJsxPropLines(checkboxExampleProps(flags)), [checkboxExampleText.label])
}

export function checkboxGroupExampleCode(defaultValue: string | null, flags: Record<(typeof checkboxGroupFlags)[number], boolean>) {
  return formatJsxElementLines(
    'CheckboxGroup',
    formatJsxPropLines(checkboxGroupExampleProps(defaultValue, flags)),
    checkboxGroupExampleLabels.checkboxes.map((checkbox) => `<Checkbox value="${checkbox}">${checkbox}</Checkbox>`),
  )
}

// Row labels for the States table; the page renders a live checkbox in each state.
export const checkboxStateLabels = {
  unselected: 'Unselected',
  selected: 'Selected',
  indeterminate: 'Indeterminate',
  disabled: 'Disabled',
} as const
