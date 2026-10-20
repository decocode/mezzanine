import type { Copy, DocsPageContent } from '../../../templates/docsPageContent'

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

export const interactionSharedTokens: { token: string; description: string }[] = [
  { token: '--color-focus', description: 'Focus ring colour' },
  { token: '--color-neutral-muted-hovered', description: 'Row or surface colour while hovered' },
  { token: '--color-neutral-muted-pressed', description: 'Row or surface colour while pressed' },
  { token: '--color-link-hovered', description: 'Link colour while hovered' },
  { token: '--color-link-pressed', description: 'Link colour while pressed' },
  { token: '--opacity-disabled', description: 'Opacity of disabled controls' },
]

// Shown between the two token tables, so it is part of the page's Tokens part rather than the section intro.
export const interactionFocusRingIntro: Copy = 'Focus ring width and offset are set per component:'

export const interactionFocusRingComponents: { component: string; prefix: string }[] = [
  { component: 'Button', prefix: '--button' },
  { component: 'Checkbox', prefix: '--checkbox' },
  { component: 'Disclosure', prefix: '--disclosure' },
  { component: 'Link', prefix: '--link' },
  { component: 'TopBar', prefix: '--top-bar' },
  { component: 'NavTree', prefix: '--navigation-tree' },
  { component: 'RadioGroup', prefix: '--radio' },
  { component: 'Table', prefix: '--table' },
  { component: 'Tabs', prefix: '--tabs' },
  { component: 'TextField and TextArea', prefix: '--input' },
  { component: 'ToggleButton', prefix: '--toggle-button' },
]

export const interactionContent: DocsPageContent = {
  id: 'interaction',
  kind: 'foundation',
  title: 'Interaction',
  description: 'Interaction describes how components respond when people point, tap, type and move focus. The behaviour is the same in every theme.',
  sections: [
    {
      key: 'states',
      intro: ['React Aria sets a data attribute on a component while it is in each state. Mezzanine styles those attributes.'],
    },
    {
      key: 'focus',
      title: 'Focus',
      intro: [
        'React Aria sets `data-focus-visible` only when focus comes from the keyboard, so clicking a button does not leave a ring behind. Text inputs are the exception: they use `data-focused` and show the ring after a click as well, because people need to see where they are typing.',
        'Focus rings use the `--color-focus` colour role. Each component sets its own ring width and offset with component tokens, listed under Tokens below.',
        'When a Dialog opens, React Aria keeps focus inside it until it closes, then returns focus to the control that opened it.',
      ],
    },
    {
      key: 'pointerAndTouch',
      title: 'Pointer and touch',
      intro: [
        'React Aria handles press events so that mouse, touch, pen and keyboard behave the same way. A press completes only if the pointer is released over the control, so dragging away cancels it.',
        'Hover styles apply only to a mouse or other hovering pointer. React Aria does not treat a tap as a hover, so touch screens never show a hover state that sticks.',
        'Tooltips do not open on tap. The Tooltip page explains its touch behaviour.',
      ],
    },
    {
      key: 'keyboard',
      title: 'Keyboard',
      table: {
        label: 'Keyboard behaviour',
        nameColumn: 'Keys',
        descriptionColumn: 'Behaviour',
        namesAreCode: false,
        rows: [
          { name: 'Tab and Shift+Tab', description: 'Move focus between controls and groups of controls.' },
          { name: 'Enter', description: 'Activates a `Button` or follows a `Link`.' },
          { name: 'Space', description: 'Activates a `Button`, Checkbox or ToggleButton. Space does not follow links, which is one reason Button and Link stay separate behaviours.' },
          { name: 'Arrow keys', description: 'Move between items inside one group: Tabs, RadioGroup, NavTree, Table and ToggleButtonGroup. The group itself is a single Tab stop.' },
          { name: 'Escape', description: 'Closes an open Dialog, Tooltip or Panel drawer.' },
        ],
      },
    },
    {
      key: 'disabled',
      title: 'Disabled',
      intro: ['Pass `isDisabled` to disable a control. React Aria sets `data-disabled` and the matching accessibility semantics, and Mezzanine shows the control at `--opacity-disabled`.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Interaction CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'outline', description: 'Draws focus rings outside the control without changing its size.' },
          { name: 'outline-offset', description: 'Sets the gap between the control and its focus ring. A negative offset draws the ring inside, for controls that sit edge to edge such as tabs and table cells.' },
          { name: 'opacity', description: 'Dims disabled controls using `--opacity-disabled`.' },
          { name: 'cursor', description: '`pointer` on clickable controls, `default` elsewhere, and `progress` on a pending Button.' },
        ],
      },
    },
    {
      key: 'tokens',
      intro: ['The colour tokens below come from the active theme and are documented on the Color page. Their values here are for the theme you are viewing.'],
    },
  ],
  relatedPages: [
    { label: 'Target size', href: '/interaction/target-size' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Color', href: '/color' },
    { label: 'Motion', href: '/motion' },
    { label: 'Button', href: '/button' },
    { label: 'Tooltip', href: '/tooltip' },
  ],
  references: [
    { label: 'React Aria: Interactions', href: 'https://react-aria.adobe.com/quality#interactions' },
    { label: 'WCAG 2.2: Focus visible', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html' },
  ],
}
