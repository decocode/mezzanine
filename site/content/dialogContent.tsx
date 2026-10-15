// Written guidance and reference entries; live examples stay in the page.
export const dialogContent = {
  title: 'Dialog',
  description: 'A dialog is a box that presents a message or asks someone to complete a small task, such as confirming a decision. When shown over the page as a modal, it must be closed before the person can use the page behind it.',
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Disclosure', href: '/disclosure' },
  ],
  references: [
    { label: 'React Aria Modal and Dialog', href: 'https://react-aria.adobe.com/Modal' },
  ],
  exampleParagraphs: [
    <>
      A modal dialog blocks interaction with the page behind it. This example can be
      closed with the Close button, Escape, or a click outside the dialog.
    </>,
  ],
  anatomyRows: [
    { name: 'DialogTrigger', description: <>Connects the opening control to the dialog and manages open state.</> },
    { name: 'ModalOverlay', description: <>The backdrop; accepts dismissal and controlled open-state props.</> },
    { name: 'Modal', description: <>The modal container. Blocks interaction outside it. Can also create its own overlay when used without an explicit <code>ModalOverlay</code>.</> },
    { name: 'Dialog', description: <>The accessible content container. Use its close render prop for a custom action.</> },
    { name: 'Heading slot="title"', description: <>Provides the visible title and accessible name.</> },
    { name: 'Button slot="close"', description: <>Closes the dialog without an additional event handler.</> },
  ],
  confirmationDialogParagraphs: [
    <>
      Use <code>Dialog</code> with <code>role="alertdialog"</code> for a confirmation
      that needs an immediate response. Cancel receives initial focus. Clicking outside
      does not dismiss this example; Escape still cancels. Confirm only updates the message below.
    </>,
  ],
  usageItems: <>
    <li><code>Dialog</code> describes the content; <code>Modal</code> adds blocking behaviour. A non-modal dialog leaves the rest of the page usable. Non-modal presentation is not included in this first release.</li>
    <li><code>isDismissable</code> enables outside-click dismissal. Escape closes by default; <code>isKeyboardDismissDisabled</code> can disable it. Always provide a visible way to close.</li>
    <li>For controlled use, pass <code>isOpen</code> and <code>onOpenChange</code> to <code>DialogTrigger</code>, or to <code>ModalOverlay</code> when there is no trigger.</li>
    <li>Use <code>mezzanine-dialog-actions</code> on a footer to arrange buttons. <code>Dialog</code> content scrolls when it exceeds the available height.</li>
  </>,
  accessibilityItems: <>
    <li>Give every dialog a title. For a short confirmation, connect the explanatory text with <code>aria-describedby</code>.</li>
    <li>React Aria manages focus containment, background interaction blocking, and focus return to the trigger.</li>
    <li>Entry and exit animations respect reduced motion.</li>
  </>,
  tokensRows: [
    { name: '--modal-z-index', description: 'Overlay stacking level.' },
    { name: '--modal-viewport-padding', description: 'Minimum space between the modal and viewport edges.' },
    { name: '--modal-max-width', description: 'Maximum modal width.' },
    { name: '--modal-border-width', description: 'Modal border thickness.' },
    { name: '--modal-border-radius', description: 'Modal corner radius.' },
    { name: '--modal-backdrop', description: 'Backdrop behind the modal.' },
    { name: '--modal-background', description: 'Modal surface colour.' },
    { name: '--modal-content', description: 'Modal text colour.' },
    { name: '--modal-border', description: 'Modal border colour.' },
    { name: '--motion-duration-interface', description: 'Entry and exit duration; motion stops with reduced motion.' },
    { name: '--motion-scale-enter', description: 'Modal scale at the start of entry and end of exit.' },
    { name: '--dialog-padding', description: 'Padding inside the dialog.' },
    { name: '--dialog-content-gap', description: 'Space after the title and paragraphs, and before the actions.' },
    { name: '--dialog-actions-gap', description: 'Space between action buttons.' },
    { name: '--dialog-focus-ring-width', description: 'Dialog keyboard-focus outline thickness.' },
  ],
  tokensParagraphs: [
    <><code>Dialog</code> and <code>Modal</code> also use shared typography and focus colour tokens, and the <code>--elevation-raised-3</code> elevation token. React Aria supplies the page and visual-viewport dimensions.</>,
  ],
}
