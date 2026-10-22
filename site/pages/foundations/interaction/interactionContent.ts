import type { DocsPageContent } from '../../../templates/docsPageContent'

export const interactionSharedTokens: { token: string; description: string }[] = [
  { token: '--color-focus', description: 'Focus ring colour' },
  { token: '--color-neutral-muted-hovered', description: 'Row or surface colour while hovered' },
  { token: '--color-neutral-muted-pressed', description: 'Row or surface colour while pressed' },
  { token: '--color-link-hovered', description: 'Link colour while hovered' },
  { token: '--color-link-pressed', description: 'Link colour while pressed' },
  { token: '--opacity-disabled', description: 'Opacity of disabled controls' },
  { token: '--indicator-width', description: 'Thickness of the bar that marks the current page or selected tab' },
]

export const interactionContent: DocsPageContent = {
  id: 'interaction',
  kind: 'foundation',
  title: 'Interaction',
  description: 'Interaction describes how components respond when people point, tap, type and move focus. The behaviour is the same in every theme.',
  sections: [
    {
      key: 'focus',
      title: 'Focus',
      intro: [
        'React Aria sets `data-focus-visible` only when focus comes from the keyboard, so clicking a button does not leave a ring behind. Text inputs are the exception: they use `data-focused` and show the ring after a click as well, because people need to see where they are typing.',
        'Focus rings use the `--color-focus` colour role and the shared ring width and offset, `--focus-ring-width` and `--focus-ring-offset`. Controls that sit edge to edge, such as tabs and table cells, draw the ring inside with `--focus-ring-offset-inset`.',
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
    { label: 'States', href: '/interaction/states' },
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
