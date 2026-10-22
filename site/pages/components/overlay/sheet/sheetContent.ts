import type { DocsPageContent } from '../../../../templates/docsPageContent'
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
