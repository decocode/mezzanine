import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export interface InteractionState {
  name: string
  attribute: string
  description: Copy
}

export const interactionStates: InteractionState[] = [
  { name: 'Hovered', attribute: 'data-hovered', description: 'A mouse pointer is over the control. Touch does not trigger hover.' },
  { name: 'Pressed', attribute: 'data-pressed', description: 'The control is being pressed with a pointer, touch or the keyboard.' },
  { name: 'Focus visible', attribute: 'data-focus-visible', description: 'The control has keyboard focus and shows a focus ring.' },
  { name: 'Focused', attribute: 'data-focused', description: 'The control has focus from any input, including a click. Text inputs use this state.' },
  { name: 'Selected', attribute: 'data-selected', description: 'The control or item is chosen.' },
  { name: 'Disabled', attribute: 'data-disabled', description: 'The control cannot be used.' },
  { name: 'Invalid', attribute: 'data-invalid', description: 'The value has failed validation.' },
  { name: 'Read-only', attribute: 'data-readonly', description: 'The value can be read and focused but not changed.' },
  { name: 'Expanded', attribute: 'data-expanded', description: 'A collapsible part is open.' },
  { name: 'Pending', attribute: 'data-pending', description: 'An action is in progress.' },
  { name: 'Indeterminate', attribute: 'data-indeterminate', description: 'A checkbox is neither fully checked nor unchecked.' },
]

export const statesContent: DocsPageContent = {
  id: 'states',
  kind: 'foundation',
  title: 'States',
  description: 'React Aria sets a data attribute on a component while it is in each state. Mezzanine styles those attributes.',
  sections: [{ key: 'states' }],
  relatedPages: [
    { label: 'Interaction', href: '/interaction' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria: Interactions', href: 'https://react-aria.adobe.com/quality#interactions' },
  ],
}
