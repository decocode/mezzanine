import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const gridListContent: DocsPageContent = {
  id: 'grid-list',
  kind: 'component',
  title: 'Grid list',
  description: 'A grid list shows items that can be chosen, and each item can hold its own controls, such as buttons or links.',
  sections: [
    { key: 'example', intro: ['In the stack layout, items are rows. With `selectionMode="multiple"`, each gets a checkbox, and a chosen item takes the soft tint and the indicator bar.'] },
    { key: 'variants', intro: ['With `layout="grid"`, items are cards that wrap onto as many columns as fit.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Grid list anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'GridList', description: 'Holds the items and their selection.' },
          { name: 'GridListItem', description: 'One item. Mezzanine adds the checkbox and the drag handle when they apply.' },
          { name: 'GridListSection', description: 'Optional group of items, with a `GridListHeader`.' },
          { name: 'Text', description: 'Optional description, with `slot="description"`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass `GridListItem`s as children, or `items` with a function that renders each one. `selectionMode` lets people choose items, with `selectedKeys` and `onSelectionChange`.',
        'Unlike a list box, an item can hold interactive content. `layout="grid"` arranges the items as cards.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The arrow keys move between items, and Space chooses one. Tab moves into an item’s own controls. Screen readers announce each item, with whether it is chosen.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Grid list pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('GridList'),
      },
    },
  ],
  relatedPages: [
    { label: 'List box', href: '/list-box' },
    { label: 'Tree', href: '/tree' },
    { label: 'Card', href: '/card' },
  ],
  references: [
    { label: 'React Aria GridList', href: 'https://react-aria.adobe.com/GridList' },
  ],
}

// The examples' labels and items.
export const gridListExampleLabels = { stack: 'Grid list A', grid: 'Grid list B', items: ['Item A', 'Item B', 'Item C'] } as const
