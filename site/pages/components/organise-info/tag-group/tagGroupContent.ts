import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const tagGroupContent: DocsPageContent = {
  id: 'tag-group',
  kind: 'component',
  title: 'Tag group',
  description: 'A tag group shows a set of small labels, such as categories or filters, that can be chosen or removed.',
  sections: [
    { key: 'example', intro: ['With `selectionMode`, tags can be chosen, and a chosen tag takes the accent fill.'] },
    { key: 'variants', intro: ['With `onRemove`, each tag gets a remove button.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Tag group anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'TagGroup', description: 'Holds the tags and their selection. Mezzanine draws the label, list, and help and error text.' },
          { name: 'TagList', description: 'The wrapping list of tags.' },
          { name: 'Tag', description: 'One tag. Mezzanine adds the remove button when the group allows removing.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass `Tag`s as children, or `items` with a function that renders each one. `selectionMode` lets people choose tags, with `selectedKeys` and `onSelectionChange`.',
        '`onRemove` receives the keys of removed tags; remove them from your data to take them out of the group.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The arrow keys move between tags, and Space or Enter chooses one. Backspace or Delete removes the focused tag when removing is allowed. Screen readers announce the group’s label and each tag.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Tag group pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('TagGroup'),
      },
    },
  ],
  relatedPages: [
    { label: 'Token field', href: '/token-field' },
    { label: 'Badge', href: '/badge' },
    { label: 'Toggle button', href: '/toggle-button' },
  ],
  references: [
    { label: 'React Aria TagGroup', href: 'https://react-aria.adobe.com/TagGroup' },
  ],
}

// The examples' labels and tags.
export const tagGroupExampleLabels = { selectable: 'Tag group A', removable: 'Tag group B', tags: ['Tag A', 'Tag B', 'Tag C'] } as const
