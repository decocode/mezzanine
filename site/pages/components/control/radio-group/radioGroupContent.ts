import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export const radioGroupContent: DocsPageContent = {
  id: 'radio-group',
  kind: 'component',
  title: 'Radio group',
  description: 'A radio group is a set of choices where only one option can be selected at a time, such as a delivery method. Choosing a different option replaces the previous selection.',
  sections: [
    { key: 'example', intro: ['Option A starts selected. Choose Option B to change the selection; Option C is disabled.'] },
    {
      key: 'states',
      subsections: [{ id: 'radio-group-read-only', label: 'Read only' }, { id: 'radio-group-validation', label: 'Validation' }],
      intro: [
        'Selection belongs to the group. Pointer and keyboard states follow the `RadioButton`being used. Try selection, hover and keyboard focus in the Example above; read-only and invalid states have working examples below.',
        'The selected option can receive focus, but the selection cannot change.',
        'This required group starts invalid. Select an option to clear the validation feedback.',
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
  { name: 'Unselected', property: 'value', description: 'An option whose value does not match the group selection. Option B starts unselected in the example.' },
  { name: 'Selected', property: 'value / defaultValue', description: 'The option matching the group selection. Option A starts selected in the example; choosing Option B moves the selection.' },
  { name: 'Hover', property: 'data-hovered', description: 'Moving the pointer over an available `RadioButton` changes its indicator background.' },
  { name: 'Pressed', property: 'data-pressed', description: 'React Aria tracks a press on `RadioButton`. Mezzanine does not add a separate pressed appearance.' },
  { name: 'Focused', property: 'data-focus-visible', description: 'Keyboard focus adds an outline around the `RadioButton` indicator.' },
  { name: 'Disabled', property: 'isDisabled', description: 'Disables the whole `RadioGroup` or an individual `RadioField`. Option C is disabled in the example.' },
  { name: 'Read only', property: 'isReadOnly', description: 'Keeps the selection available to inspect but prevents changing it.' },
  { name: 'Invalid', property: 'isInvalid', description: 'Uses the invalid indicator border. `FieldError` provides the associated validation message.' },
]

// The States section's two smaller headed examples. Their descriptions repeat the second and third States paragraphs.
export const radioGroupStateExamples: Record<'readOnly' | 'validation', { readonly title: string; readonly description: Copy }> = {
  readOnly: { title: 'Read only', description: 'The selected option can receive focus, but the selection cannot change.' },
  validation: { title: 'Validation', description: 'This required group starts invalid. Select an option to clear the validation feedback.' },
}
