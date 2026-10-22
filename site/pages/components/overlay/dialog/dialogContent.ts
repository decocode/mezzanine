import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const dialogContent: DocsPageContent = {
  id: 'dialog',
  kind: 'component',
  title: 'Dialog',
  description: 'A dialog is a box that presents a message or asks someone to complete a small task, such as confirming a decision. When shown over the page as a modal, it must be closed before the person can use the page behind it.',
  sections: [
    { key: 'example', intro: ['A modal dialog blocks interaction with the page behind it. This example can be closed with the Close button, Escape, or a click outside the dialog.'] },
    {
      key: 'confirmationDialog',
      title: 'Confirmation dialog',
      intro: ['Use `Dialog` with `role="alertdialog"` for a confirmation that needs an immediate response. Cancel receives initial focus. Clicking outside does not dismiss this example; Escape still cancels. Confirm only updates the message below.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Dialog anatomy',
        nameColumn: 'Component',
        rows: [
          { name: 'DialogTrigger', description: 'Connects the opening control to the dialog and manages open state.' },
          { name: 'ModalOverlay', description: 'The backdrop; accepts dismissal and controlled open-state props.' },
          { name: 'Modal', description: 'The modal container. Blocks interaction outside it. Can also create its own overlay when used without an explicit `ModalOverlay`.' },
          { name: 'Dialog', description: 'The accessible content container. Use its close render prop for a custom action.' },
          { name: 'Heading slot="title"', description: 'Provides the visible title and accessible name.' },
          { name: 'Button slot="close"', description: 'Closes the dialog without an additional event handler.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [{
        list: [
          '`Dialog` describes the content; `Modal` adds blocking behaviour. A non-modal dialog leaves the rest of the page usable. Non-modal presentation is not included in this first release.',
          '`isDismissable` enables outside-click dismissal. Escape closes by default; `isKeyboardDismissDisabled` can disable it. Always provide a visible way to close.',
          'For controlled use, pass `isOpen` and `onOpenChange` to `DialogTrigger`, or to `ModalOverlay` when there is no trigger.',
          'Use `mz-dialog-actions` on a footer to arrange buttons. `Dialog` content scrolls when it exceeds the available height.',
        ],
      }],
    },
    {
      key: 'accessibility',
      body: [{
        list: [
          'Give every dialog a title. For a short confirmation, connect the explanatory text with `aria-describedby`.',
          'React Aria manages focus containment, background interaction blocking, and focus return to the trigger.',
        ],
      }],
    },
    {
      key: 'tokens',
      intro: ['`Dialog` and `Modal` also use shared typography and focus colour tokens, and the `--elevation-raised-3` elevation token. React Aria supplies the page and visual-viewport dimensions.'],
      table: {
        label: 'Dialog and Modal CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--motion-duration-interface', description: 'Entry and exit duration; motion stops with reduced motion.' },
          { name: '--motion-scale-enter', description: 'Modal scale at the start of entry and end of exit.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Dialog pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Dialog', 'Modal'),
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Disclosure', href: '/disclosure' },
  ],
  references: [
    { label: 'React Aria Modal and Dialog', href: 'https://react-aria.adobe.com/Modal' },
  ],
}

// The sentences inside the two live dialogs.
export const dialogExampleCopy = {
  modalBody: 'Dialog content. The page behind this modal cannot be used until it closes.',
  confirmationTitle: 'Confirm example action?',
  confirmationBody: 'This example updates a message on the page. No data will be deleted or saved.',
} as const

// The status message under the confirmation example, after it has been confirmed `count` times.
export function confirmationFeedback(count: number): string {
  return count === 0
    ? 'No action confirmed.'
    : `Example action confirmed ${count} ${count === 1 ? 'time' : 'times'}.`
}
