// Written guidance and reference entries; live examples stay in the page.
export const tooltipContent = {
  title: 'Tooltip',
  description: 'A tooltip is a small text bubble that appears when you hover over a control or reach it with the keyboard. It gives a short label or extra explanation without taking up space on the page.',
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'React Aria Tooltip', href: 'https://react-aria.adobe.com/Tooltip' },
  ],
  exampleParagraphs: [
    'To view the example tooltip, hover over the button. If using keyboard navigation, press Tab to focus it and Escape to dismiss it.',
    "Note: Tooltips don't appear when the trigger (e.g. a button) is pressed. This means tooltips cannot be viewed on touchscreen devices, so make sure important information is visible on the page itself.",
  ],
  exampleLabel: 'Settings',
  exampleTooltip: 'Settings',
  anatomyRows: [
    { name: 'TooltipTrigger', description: <>Connects the control and tooltip, managing when the tooltip opens and closes.</> },
    { name: 'Button', description: <>Mezzanine’s icon-only <code>Button</code> with a cog icon and the accessible name Settings in this example. Other focusable React Aria controls, such as <code>ToggleButton</code> and <code>Link</code>, can also act as triggers.</> },
    { name: 'Tooltip', description: <>The text bubble, positioned relative to its trigger and associated with it through <code>aria-describedby</code>.</> },
  ],
  behaviourParagraphs: [
    <>The first tooltip opens after a 300ms hover delay. Keyboard focus opens it immediately. React Aria allows subsequent tooltips to open immediately while its warmup state is active.</>,
    <>The tooltip stays open while the pointer is over the trigger or tooltip. Moving away starts the close delay, which defaults to 500ms. Escape dismisses it; moving focus away or pressing the trigger also closes it by default.</>,
    <>React Aria positions the tooltip and can flip it when there is not enough room. Mezzanine limits its width to fit the viewport and disables the fade animation when reduced motion is requested.</>,
  ],
  usageParagraphs: [
    <>Keep the content short and supplementary. Important instructions should be visible on the page because tooltips do not appear on touch interactions.</>,
    <>Give icon-only controls an accessible name, such as <code>aria-label="Dark theme"</code>, even when they have a tooltip. A tooltip must not be the only way to understand a control.</>,
    <>Place a focusable control and <code>Tooltip</code> inside <code>TooltipTrigger</code>. Keep links, buttons and other interactive content out of the tooltip; use a <code>Dialog</code> when people need to interact with the content.</>,
    <>Set <code>isDisabled</code> on <code>TooltipTrigger</code> to suppress its tooltip without disabling the control. A disabled control cannot receive keyboard focus, so do not rely on its tooltip to explain why it is disabled.</>,
  ],
  propsRows: [
    { name: 'TooltipTrigger: delay', description: 'Hover delay in milliseconds. Mezzanine defaults to 300; React Aria defaults to 1500. Focus opens immediately.' },
    { name: 'TooltipTrigger: closeDelay', description: 'Delay before closing after hover ends. Defaults to 500ms.' },
    { name: 'TooltipTrigger: trigger', description: <>Defaults to <code>hover</code>, supporting both hover and focus. Set <code>focus</code> to open only on keyboard focus.</> },
    { name: 'TooltipTrigger: isDisabled', description: 'Disables the tooltip independently of its control.' },
    { name: 'TooltipTrigger: shouldCloseOnPress', description: 'Whether pressing the trigger closes the tooltip. Defaults to true.' },
    { name: 'TooltipTrigger: isOpen / defaultOpen / onOpenChange', description: 'Control open state, set its initial value, or respond to changes.' },
    { name: 'Tooltip: placement', description: <>Preferred position. Defaults to <code>top</code>; this example uses <code>bottom</code>.</> },
    { name: 'Tooltip: offset / crossOffset / shouldFlip', description: 'Adjust positioning and whether the tooltip may flip to fit the available space.' },
    { name: 'Tooltip: className', description: <>Accepts a class name or render function. Include <code>react-aria-Tooltip</code> to retain Mezzanine styling when supplying your own classes.</> },
  ],
  tokensParagraph: 'Tooltips also use the shared surface, text, border, spacing, small body typography, small radius and overlay elevation tokens. The hover delay is a component prop, not a CSS token.',
  tokensRows: [
    { name: '--tooltip-max-width', description: 'Maximum tooltip width, additionally constrained by the viewport.' },
    { name: '--tooltip-border-width', description: 'Tooltip border thickness.' },
    { name: '--tooltip-z-index', description: 'Tooltip stacking level.' },
    { name: '--tooltip-motion-duration', description: 'Entry and exit fade duration; disabled for reduced motion.' },
  ],
}
