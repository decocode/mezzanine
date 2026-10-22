import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const virtualizerContent: DocsPageContent = {
  id: 'virtualizer',
  kind: 'component',
  title: 'Virtualizer',
  description: 'A virtualizer keeps a long list fast by drawing only the items in view, and swapping them as the list scrolls.',
  sections: [
    { key: 'example', intro: ['A list box of a thousand options inside a `Virtualizer`. Only the rows in view, and a few either side, are on the page at once.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Virtualizer anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Virtualizer', description: 'Draws only the visible items of the collection inside it.' },
          { name: 'ListLayout', description: 'Lays the items out in a column, with a row height.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Wrap a `ListBox`, `GridList`, `Tree` or `Table` in `Virtualizer`, with `layout={ListLayout}` and `layoutOptions` such as `rowHeight`. Give its container a height, so the list scrolls.',
        'It draws nothing of its own, so the collection keeps its usual look.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers still announce the full number of items and each item’s position, and keyboard focus moves through them all.',
      ],
    },

  ],
  relatedPages: [
    { label: 'List box', href: '/list-box' },
    { label: 'Grid list', href: '/grid-list' },
  ],
  references: [
    { label: 'React Aria Virtualizer', href: 'https://react-aria.adobe.com/Virtualizer' },
  ],
}

// The example's label, and a thousand option labels.
export const virtualizerExampleLabel = 'List box A'
export const virtualizerExampleItems = Array.from({ length: 1000 }, (_, index) => ({ id: index + 1, name: `Option ${index + 1}` }))
