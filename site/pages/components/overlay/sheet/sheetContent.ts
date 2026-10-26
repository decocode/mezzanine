import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const sheetContent: DocsPageContent = {
  id: 'sheet',
  kind: 'component',
  title: 'Sheet',
  description: 'A sheet is a panel that slides in from an edge of the screen and can be swiped away, often from the bottom on a phone.',
  sections: [
    { key: 'example', intro: ['A `SheetTrigger` opens the `Sheet` from a `Button`. It comes up from the bottom over a dimmed backdrop, with a handle on the side it is swiped from.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Sheet anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'SheetTrigger', description: 'Connects the Button to the Sheet.' },
          { name: 'Sheet', description: 'Mezzanine’s sheet: the backdrop, the panel, its handle and the scrolling content, from React Aria’s `SheetOverlay`, `SheetBackdrop`, `Sheet` and `SheetContent`.' },
          { name: 'Heading', description: 'The sheet’s title, with `slot="title"`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put a `Button`, then a `Sheet` holding the content, inside `SheetTrigger`. `position` chooses the edge, and `snapPoints` lets it stop part of the way open.',
        '`preventDismissal` keeps it open until the content closes it, and hides the handle.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Focus moves into the sheet when it opens and returns to the trigger when it closes. Escape closes it, as does a swipe towards its edge or a press on the backdrop.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Sheet pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Sheet'),
      },
    },
  ],
  relatedPages: [
    { label: 'Modal', href: '/modal' },
    { label: 'Panel', href: '/panel' },
  ],
  references: [
    { label: 'React Aria Sheet', href: 'https://react-aria.adobe.com/Sheet' },
  ],
}

// The example's labels and copy.
export const sheetExampleLabels = { trigger: 'Sheet trigger', title: 'Sheet title', body: 'Sheet content.', close: 'Close' } as const

// The Properties panel's choices: the edge the sheet comes from (bottom by default), whether it can be
// dismissed, and whether it seems to carry on past the edge when pulled further.
export const sheetPositions = ['bottom', 'top', 'start', 'end'] as const

export function sheetExampleCode({ position, preventDismissal, overscrollPadding }: { position: string, preventDismissal: boolean, overscrollPadding: boolean }) {
  return [
    '<SheetTrigger>',
    `  <Button hierarchy="secondary">${sheetExampleLabels.trigger}</Button>`,
    `  <Sheet${formatJsxProps({ position: position === 'bottom' ? undefined : position, preventDismissal })}${overscrollPadding ? '' : ' overscrollPadding={false}'}>`,
    `    <Heading slot="title">${sheetExampleLabels.title}</Heading>`,
    `    <Text elementType="p" className="mz-text-body-md">${sheetExampleLabels.body}</Text>`,
    `    <Button slot="close" hierarchy="secondary">${sheetExampleLabels.close}</Button>`,
    '  </Sheet>',
    '</SheetTrigger>',
  ].join('\n')
}
