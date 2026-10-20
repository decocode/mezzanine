import type { DocsPageContent } from '../../../../templates/docsPageContent'

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
      key: 'tokens',
      intro: ['`Switch` also uses shared typography, text colour, focus colour and disabled-opacity tokens.'],
      table: {
        label: 'Switch CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--switch-track-width', description: 'Width of the track.' },
          { name: '--switch-track-height', description: 'Height of the track.' },
          { name: '--switch-handle-size', description: 'Width and height of the handle.' },
          { name: '--switch-content-gap', description: 'Space between the track and its label.' },
          { name: '--switch-border-width', description: 'Track border thickness.' },
          { name: '--switch-border-radius', description: 'Rounding of the track and handle.' },
          { name: '--switch-track-border', description: 'Track border colour when off.' },
          { name: '--switch-track-border-invalid', description: 'Track border colour when invalid.' },
          { name: '--switch-track-background', description: 'Track background when off.' },
          { name: '--switch-track-background-hovered', description: 'Track background when off and hovered.' },
          { name: '--switch-track-background-selected', description: 'Track background and border colour when on.' },
          { name: '--switch-track-background-selected-hovered', description: 'Track background and border colour when on and hovered.' },
          { name: '--switch-handle-background', description: 'Handle colour when off.' },
          { name: '--switch-handle-background-selected', description: 'Handle colour when on.' },
          { name: '--switch-error-foreground', description: 'Error message colour.' },
          { name: '--switch-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--switch-focus-ring-offset', description: 'Distance between the track and its keyboard-focus outline.' },
        ],
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
