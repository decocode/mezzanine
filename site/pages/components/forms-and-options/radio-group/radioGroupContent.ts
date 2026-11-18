import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxElementLines, formatJsxPropLines, formatJsxProps } from '../../../../components/formatJsxProps'

export const radioGroupContent: DocsPageContent = {
  id: 'radio-group',
  kind: 'component',
  title: 'Radio group',
  description: '`RadioGroup` is a component that presents several options, of which only one can be selected.',
  sections: [
    { key: 'example', intro: ['A `RadioGroup` has a label, a description and its options. Option C is disabled on its own `RadioField`.'] },
    {
      key: 'states',
      intro: [
        'Selection belongs to the group. Pointer and keyboard states follow the `RadioButton` being used.',
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      intro: ['Put a `RadioField` inside the `RadioGroup` for each option. Each `RadioField` supplies the value for its `RadioButton`, and can have its own description.'],
      table: {
        label: 'RadioGroup anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'RadioGroup', description: 'Manages the options’ shared selection and its validation. Mezzanine draws the label, help text, error, then the options.' },
          { name: 'RadioField', description: 'Defines an option with a unique value and an optional description.' },
          { name: 'RadioButton', description: 'Contains the option label and its interactive indicator.' },
          { name: 'SelectionIndicator', description: 'Displays the mark inside the selected `RadioButton`.' },
          { name: 'Text', description: 'An option’s supporting text, using `slot="description"`.' },
        ],
      },
    },
    {
      key: 'usage',
      intro: [
        'Give each `RadioField` a unique `value`. Use `defaultValue` for an initial selection, or `value` with `onChange` to control it from your app.',
        '`label` names the group. `description` adds help text and `errorMessage` the message shown when the group is invalid. Both sit under the label, above the options.',
      ],
    },
    {
      key: 'accessibility',
      intro: [
        'Give the group a visible `label` and a clear label inside each `RadioButton`.',
        'Tab moves into the group and arrow keys move between available options. Disabled options cannot be selected. Use a description or `errorMessage` to explain an option or validation problem in text.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Radio group pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('RadioGroup'),
      },
    },
  ],
  relatedPages: [
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Color', href: '/color' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria RadioGroup', href: 'https://react-aria.adobe.com/RadioGroup' },
  ],
}

// Rows of the States table, which shows each state's name with its React Aria property.
export const radioGroupStates: readonly { readonly name: string; readonly property: string; readonly description: Copy }[] = [
  { name: 'Unselected', property: 'value', description: 'An option whose value does not match the group selection.' },
  { name: 'Selected', property: 'value / defaultValue', description: 'The option matching the group selection.' },
  { name: 'Hover', property: 'data-hovered', description: 'Moving the pointer over an available `RadioButton` changes its indicator background.' },
  { name: 'Pressed', property: 'data-pressed', description: 'React Aria tracks a press on `RadioButton`. Mezzanine does not add a separate pressed appearance.' },
  { name: 'Focused', property: 'data-focus-visible', description: 'Keyboard focus adds an outline around the `RadioButton` indicator.' },
  { name: 'Disabled', property: 'isDisabled', description: 'Disables the whole `RadioGroup` or an individual `RadioField`. Option C is disabled in the example.' },
  { name: 'Read only', property: 'isReadOnly', description: 'Keeps the selection available to inspect but prevents changing it.' },
  { name: 'Invalid', property: 'isInvalid', description: 'Uses the invalid indicator border. `errorMessage` gives the message shown above the options.' },
]

// The Example's text and options, and the Properties panel's props, in panel order. The error message
// shows whenever isInvalid is on.
export const radioGroupExample = {
  label: 'RadioGroup label',
  description: 'RadioGroup description',
  options: [
    { value: 'option-a', label: 'Option A', description: 'RadioField A description' },
    { value: 'option-b', label: 'Option B', description: 'RadioField B description' },
    { value: 'option-c', label: 'Option C', description: 'Disabled RadioField description', isDisabled: true },
  ],
  errorMessage: 'Select an option to continue.',
  defaultValueLabel: 'defaultValue',
  orientationLabel: 'orientation',
} as const
export const radioGroupOrientations = ['vertical', 'horizontal'] as const
export const radioGroupFlags = ['description', 'isInvalid', 'isReadOnly', 'isDisabled'] as const

// The example's props, in panel order, shared by the demo and its code.
export function radioGroupExampleProps(defaultValue: string | null, orientation: (typeof radioGroupOrientations)[number], flags: Record<(typeof radioGroupFlags)[number], boolean>) {
  return {
    label: radioGroupExample.label,
    defaultValue: defaultValue ?? undefined,
    orientation: orientation === 'vertical' ? undefined : orientation,
    description: flags.description ? radioGroupExample.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? radioGroupExample.errorMessage : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
}

export function radioGroupExampleCode(props: ReturnType<typeof radioGroupExampleProps>) {
  return formatJsxElementLines('RadioGroup', formatJsxPropLines(props), radioGroupExample.options.flatMap((option) => [
    `<RadioField${formatJsxProps({ value: option.value, isDisabled: 'isDisabled' in option })}>`,
    `  <RadioButton><SelectionIndicator />${option.label}</RadioButton>`,
    `  <Text slot="description">${option.description}</Text>`,
    '</RadioField>',
  ]))
}
