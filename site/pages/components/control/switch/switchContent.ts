import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

export const switchContent: DocsPageContent = {
  id: 'switch',
  kind: 'component',
  title: 'Switch',
  description: 'A switch turns a setting on or off, and the change takes effect straight away.',
  sections: [
    { key: 'example', intro: ['The `SwitchButton` turns on or off from its label, or with the Space key when focused.'] },
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
          { name: 'SwitchField', description: 'Holds the switch state, its optional description and its error message.' },
          { name: 'SwitchButton', description: 'The clickable label, with the native input. Mezzanine adds a decorative track and handle internally.' },
          { name: 'Text', description: 'Optional description, with `slot="description"`.' },
          { name: 'FieldError', description: 'Optional error message, shown when the field is invalid.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put the visible label inside `SwitchButton`, and the `SwitchButton` inside `SwitchField`. Use `defaultSelected` on `SwitchField` for its starting state, or `isSelected` with `onChange` to control it.',
        '`isDisabled` prevents interaction; `isReadOnly` prevents changes. For forms, give `SwitchField` a `name` and `value`.',
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

// The Example's label, and the Properties panel's on/off props, in panel order.
export const switchExampleLabel = 'Switch label'
export const switchFlags = ['defaultSelected', 'isDisabled', 'isReadOnly'] as const

export function switchExampleCode(props: Record<string, unknown>) {
  return [`<SwitchField${formatJsxProps(props)}>`, `  <SwitchButton>${switchExampleLabel}</SwitchButton>`, '</SwitchField>'].join('\n')
}
