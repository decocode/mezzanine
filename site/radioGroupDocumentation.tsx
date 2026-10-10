// Reference content for the parts and tokens exported by Mezzanine's RadioGroup.
export const radioGroupAnatomy = [
  { name: 'RadioGroup', purpose: 'Contains the options and manages their shared selection.' },
  { name: 'Label', purpose: <>Gives the <code>RadioGroup</code> a visible, accessible name.</> },
  { name: 'RadioField', purpose: 'Defines an option with a unique value and an optional description.' },
  { name: 'RadioButton', purpose: 'Contains the option label and its interactive indicator.' },
  { name: 'SelectionIndicator', purpose: <>Displays the mark inside the selected <code>RadioButton</code>.</> },
  { name: 'Text', purpose: <>Provides supporting text using <code>slot="description"</code>, for the group or an option.</> },
  { name: 'FieldError', purpose: <>Displays validation feedback when the <code>RadioGroup</code> is invalid.</> },
] as const

export const radioGroupStates = [
  { name: 'Unselected', property: 'value', description: 'An option whose value does not match the group selection. Option B starts unselected in the example.' },
  { name: 'Selected', property: 'value / defaultValue', description: 'The option matching the group selection. Option A starts selected in the example; choosing Option B moves the selection.' },
  { name: 'Hover', property: 'data-hovered', description: <>Moving the pointer over an available <code>RadioButton</code> changes its indicator background.</> },
  { name: 'Pressed', property: 'data-pressed', description: <>React Aria tracks a press on <code>RadioButton</code>. Mezzanine does not add a separate pressed appearance.</> },
  { name: 'Focused', property: 'data-focus-visible', description: <>Keyboard focus adds an outline around the <code>RadioButton</code> indicator.</> },
  { name: 'Disabled', property: 'isDisabled', description: <>Disables the whole <code>RadioGroup</code> or an individual <code>RadioField</code>. Option C is disabled in the example.</> },
  { name: 'Read only', property: 'isReadOnly', description: 'Keeps the selection available to inspect but prevents changing it.' },
  { name: 'Invalid', property: 'isInvalid', description: <>Uses the invalid indicator border. <code>FieldError</code> provides the associated validation message.</> },
] as const

export const radioGroupTokens = [
  { token: '--radio-group-gap', description: 'Space between vertically arranged group content.' },
  { token: '--radio-group-horizontal-gap', description: 'Space between horizontally arranged options.' },
  { token: '--radio-field-gap-block', description: 'Vertical space between an option and its description.' },
  { token: '--radio-content-gap', description: 'Space between an indicator and its label.' },
  { token: '--radio-indicator-size', description: 'Width and height of the indicator.' },
  { token: '--radio-selection-size', description: 'Width and height of the selected mark.' },
  { token: '--radio-border-width', description: 'Width of the indicator border.' },
  { token: '--radio-indicator-border-radius', description: 'Shape of the indicator.' },
  { token: '--radio-selection-border-radius', description: 'Shape of the selected mark.' },
  { token: '--radio-focus-ring-width', description: 'Width of the keyboard-focus outline.' },
  { token: '--radio-focus-ring-offset', description: 'Position of the keyboard-focus outline.' },
  { token: '--radio-background', description: 'Unselected indicator background.' },
  { token: '--radio-background-hovered', description: 'Indicator background while hovered.' },
  { token: '--radio-selection', description: 'Selected mark and selected indicator border colour.' },
  { token: '--radio-border', description: 'Unselected indicator border colour.' },
  { token: '--radio-border-invalid', description: 'Invalid indicator border colour.' },
] as const
