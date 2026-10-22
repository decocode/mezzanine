import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const tooltipContent: DocsPageContent = {
  id: 'tooltip',
  kind: 'component',
  title: 'Tooltip',
  description: 'A tooltip is a small text bubble that appears when you hover over a control or reach it with the keyboard. It gives a short label or extra explanation without taking up space on the page.',
  sections: [
    {
      key: 'example',
      intro: [
        'To view the example tooltip, hover over the button. If using keyboard navigation, press Tab to focus it and Escape to dismiss it.',
        "Note: Tooltips don't appear when the trigger (e.g. a button) is pressed. This means tooltips cannot be viewed on touchscreen devices, so make sure important information is visible on the page itself.",
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Tooltip anatomy',
        nameColumn: 'Component',
        rows: [
          { name: 'TooltipTrigger', description: 'Connects the control and tooltip, managing when the tooltip opens and closes.' },
          { name: 'Button', description: 'Mezzanine’s icon-only `Button` with a cog icon and the accessible name Settings in this example. Other focusable React Aria controls, such as `ToggleButton` and `Link`, can also act as triggers.' },
          { name: 'Tooltip', description: 'The text bubble, positioned relative to its trigger and associated with it through `aria-describedby`.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        'The first tooltip opens after a 500ms hover delay. Keyboard focus opens it immediately. React Aria allows subsequent tooltips to open immediately while its warmup state is active.',
        'The tooltip stays open while the pointer is over the trigger or tooltip. Moving away starts the close delay, which defaults to 500ms. Escape dismisses it; moving focus away or pressing the trigger also closes it by default.',
        'React Aria positions the tooltip and can flip it when there is not enough room. Mezzanine limits its width to fit the viewport and disables the fade animation when reduced motion is requested.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Keep the content short and supplementary. Important instructions should be visible on the page because tooltips do not appear on touch interactions.',
        'Place a focusable control and `Tooltip` inside `TooltipTrigger`. Keep links, buttons and other interactive content out of the tooltip; use a `Dialog` when people need to interact with the content.',
        'Set `isDisabled` on `TooltipTrigger` to suppress its tooltip without disabling the control.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Give icon-only controls an accessible name, such as `aria-label="Dark theme"`, even when they have a tooltip. A tooltip must not be the only way to understand a control.',
        'A disabled control cannot receive keyboard focus, so do not rely on its tooltip to explain why it is disabled.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'Tooltip props',
        nameColumn: 'Prop',
        rows: [
          { name: 'TooltipTrigger: delay', description: 'Hover delay in milliseconds. Mezzanine defaults to 500; React Aria defaults to 1500. Focus opens immediately.' },
          { name: 'TooltipTrigger: closeDelay', description: 'Delay before closing after hover ends. Defaults to 500ms.' },
          { name: 'TooltipTrigger: trigger', description: 'Defaults to `hover`, supporting both hover and focus. Set `focus` to open only on keyboard focus.' },
          { name: 'TooltipTrigger: isDisabled', description: 'Disables the tooltip independently of its control.' },
          { name: 'TooltipTrigger: shouldCloseOnPress', description: 'Whether pressing the trigger closes the tooltip. Defaults to true.' },
          { name: 'TooltipTrigger: isOpen / defaultOpen / onOpenChange', description: 'Control open state, set its initial value, or respond to changes.' },
          { name: 'Tooltip: placement', description: 'Preferred position. Defaults to `top`; this example uses `bottom`.' },
          { name: 'Tooltip: offset / crossOffset / shouldFlip', description: 'Adjust positioning and whether the tooltip may flip to fit the available space.' },
          { name: 'Tooltip: className', description: 'Accepts a class name or render function. Include `react-aria-Tooltip` to retain Mezzanine styling when supplying your own classes.' },
        ],
      },
    },
    {
      key: 'tokens',
      body: ['Tooltips also use the shared surface, text, border, spacing, small body typography and small radius tokens, and the `--elevation-raised-2` elevation token. The hover delay is a component prop, not a CSS token.'],
      table: {
        label: 'Tooltip CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--motion-duration-interface', description: 'Entry and exit fade duration; disabled for reduced motion.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'React Aria Tooltip', href: 'https://react-aria.adobe.com/Tooltip' },
  ],
}
