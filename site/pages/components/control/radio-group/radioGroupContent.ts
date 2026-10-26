import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

export const radioGroupContent: DocsPageContent = {
  id: 'radio-group',
  kind: 'component',
  title: 'Radio group',
  description: 'A radio group is a set of choices where only one option can be selected at a time, such as a delivery method. Choosing a different option replaces the previous selection.',
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
      intro: ['Compose these exported parts inside a `RadioGroup`. Each `RadioField` supplies the value for its `RadioButton`; descriptions and validation feedback are optional.'],
      table: {
        label: 'RadioGroup anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'RadioGroup', description: 'Contains the options and manages their shared selection.' },
          { name: 'Label', description: 'Gives the `RadioGroup` a visible, accessible name.' },
          { name: 'RadioField', description: 'Defines an option with a unique value and an optional description.' },
          { name: 'RadioButton', description: 'Contains the option label and its interactive indicator.' },
          { name: 'SelectionIndicator', description: 'Displays the mark inside the selected `RadioButton`.' },
          { name: 'Text', description: 'Provides supporting text using `slot="description"`, for the group or an option.' },
          { name: 'FieldError', description: 'Displays validation feedback when the `RadioGroup` is invalid.' },
        ],
      },
    },
    {
      key: 'usage',
      intro: ['Give each `RadioField` a unique `value`. Use `defaultValue` for an initial selection, or `value` with `onChange` to control it from your app.'],
    },
    {
      key: 'accessibility',
      intro: [
        'Use a visible `Label` for the group and a clear label inside each `RadioButton`.',
        'Tab moves into the group and arrow keys move between available options. Disabled options cannot be selected. Use a description or `FieldError` to explain an option or validation problem in text.',
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
  { name: 'Invalid', property: 'isInvalid', description: 'Uses the invalid indicator border. `FieldError` provides the associated validation message.' },
]

// The Example's options and error message, and the Properties panel's props, in panel order.
export const radioGroupExample = {
  label: 'RadioGroup label',
  description: 'RadioGroup description',
  options: [
    { value: 'option-a', label: 'Option A', description: 'RadioField A description' },
    { value: 'option-b', label: 'Option B', description: 'RadioField B description' },
    { value: 'option-c', label: 'Option C', description: 'Disabled RadioField description', isDisabled: true },
  ],
  error: 'Select an option to continue.',
  defaultValueLabel: 'defaultValue',
  orientationLabel: 'orientation',
} as const
export const radioGroupOrientations = ['vertical', 'horizontal'] as const
export const radioGroupFlags = ['isDisabled', 'isInvalid', 'isReadOnly'] as const

export function radioGroupExampleCode(props: Record<string, unknown>) {
  return [
    `<RadioGroup${formatJsxProps(props)}>`,
    `  <Label>${radioGroupExample.label}</Label>`,
    `  <Text slot="description">${radioGroupExample.description}</Text>`,
    ...radioGroupExample.options.flatMap((option) => [
      `  <RadioField value="${option.value}"${'isDisabled' in option ? ' isDisabled' : ''}>`,
      `    <RadioButton><SelectionIndicator />${option.label}</RadioButton>`,
      `    <Text slot="description">${option.description}</Text>`,
      '  </RadioField>',
    ]),
    `  <FieldError>${radioGroupExample.error}</FieldError>`,
    '</RadioGroup>',
  ].join('\n')
}
