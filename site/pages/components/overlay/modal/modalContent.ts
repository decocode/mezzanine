import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const modalContent: DocsPageContent = {
  id: 'modal',
  kind: 'component',
  title: 'Modal',
  description: '`Modal` places a component in the centre of the screen, in front of the page content, so it becomes the focus of attention.',
  sections: [
    {
      key: 'about',
      title: 'About Modal',
      body: [
        '`Modal` places a component in the centre of the screen, in front of the page content, so it becomes the focus of attention. `ModalOverlay` dims the page behind it. `Modal` is used to display components such as Dialog and Search.',
      ],
    },
    { key: 'example' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Modal anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ModalOverlay', description: 'The dimmed layer over the page.' },
          { name: 'Modal', description: 'The raised surface in the middle of the screen, up to the lg width.' },
          { name: 'Dialog', description: 'The content, with its title.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: ['It fades and grows a little as it opens.'],
    },
    {
      key: 'usage',
      body: [
        'Put a `Button`, then a `ModalOverlay` holding the `Modal` and its `Dialog`, inside `DialogTrigger`. `isDismissable` closes it on a press outside.',
        'For short decisions, see Dialog, which describes the content of a modal.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Focus moves into the modal when it opens and stays there until it closes, then returns to the trigger. Escape closes it, and the page behind it can’t be reached.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Modal pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Modal'),
      },
    },
  ],
  relatedPages: [
    { label: 'Dialog', href: '/dialog' },
    { label: 'Sheet', href: '/sheet' },
  ],
  references: [
    { label: 'React Aria Modal', href: 'https://react-aria.adobe.com/Modal' },
  ],
}

// The example's labels and copy.
export const modalExampleLabels = { trigger: 'Modal trigger', title: 'Example', body: 'This component is a Dialog. It has been placed in the centre of the screen by Modal.', close: 'Close' } as const

// The Properties panel's on/off props, on ModalOverlay: whether a press outside closes it, and whether
// Escape is turned off.
export const modalFlags = ['isDismissable', 'isKeyboardDismissDisabled'] as const

export function modalExampleCode(props: Record<string, unknown>) {
  return [
    '<DialogTrigger>',
    `  <Button hierarchy="secondary">${modalExampleLabels.trigger}</Button>`,
    `  <ModalOverlay${formatJsxProps(props)}>`,
    '    <Modal>',
    '      <Dialog>',
    `        <Heading slot="title">${modalExampleLabels.title}</Heading>`,
    `        <Text elementType="p" className="mz-text-body-md">${modalExampleLabels.body}</Text>`,
    '        <footer className="mz-dialog-actions">',
    `          <Button slot="close" hierarchy="secondary">${modalExampleLabels.close}</Button>`,
    '        </footer>',
    '      </Dialog>',
    '    </Modal>',
    '  </ModalOverlay>',
    '</DialogTrigger>',
  ].join('\n')
}
