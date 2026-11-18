import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxElementLines, formatJsxPropLines } from '../../../../components/formatJsxProps'

export const switchContent: DocsPageContent = {
  id: 'switch',
  kind: 'component',
  title: 'Switch',
  description: '`Switch` is a component that turns a setting or feature on or off, with immediate effect.',
  sections: [
    { key: 'example', intro: ['The `Switch` turns on or off from its label, or with the Space key when focused.'] },
    { key: 'states' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Switch anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Switch', description: 'Holds the switch state and its validation. Mezzanine draws any error, then the decorative track and handle with the clickable label, then any help text.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put the visible label inside `Switch`. Use `defaultSelected` for its starting state, or `isSelected` with `onChange` to control it.',
        '`description` adds help text under the label, lined up with it. `errorMessage` is the message shown above the switch while it is invalid.',
        '`isDisabled` prevents interaction; `isReadOnly` prevents changes. For forms, give `Switch` a `name` and `value`.',
      ],
    },
    {
      key: 'accessibility',
      body: ['Tab focuses the switch and Space turns it on or off. Screen readers announce it as a switch, with its label and whether it is on.'],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Switch pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Switch'),
      },
    },
  ],
  relatedPages: [
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Switch', href: 'https://react-aria.adobe.com/Switch' },
  ],
}

// Row labels for the States table; the page renders a live switch in each state.
export const switchStateLabels = {
  unselected: 'Off',
  selected: 'On',
  disabled: 'Disabled',
} as const

// The Example's text, and the Properties panel's on/off props, in panel order. The error message shows
// whenever isInvalid is on.
export const switchExampleText = { label: 'Switch label', description: 'Switch description', errorMessage: 'Switch error message' } as const
export const switchFlags = ['isInvalid', 'defaultSelected', 'description', 'isReadOnly', 'isDisabled'] as const

// The example's props, in panel order, shared by the demo and its code.
export function switchExampleProps(flags: Record<(typeof switchFlags)[number], boolean>) {
  return {
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? switchExampleText.errorMessage : undefined,
    defaultSelected: flags.defaultSelected,
    description: flags.description ? switchExampleText.description : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
}

export function switchExampleCode(flags: Record<(typeof switchFlags)[number], boolean>) {
  return formatJsxElementLines('Switch', formatJsxPropLines(switchExampleProps(flags)), [switchExampleText.label])
}
