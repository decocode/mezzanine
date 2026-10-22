import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const listBoxContent: DocsPageContent = {
  id: 'list-box',
  kind: 'component',
  title: 'ListBox',
  description: 'A list box is a list of options to choose from, optionally grouped into sections.',
  sections: [
    { key: 'example', intro: ['The arrow keys move between options, and Space or Enter selects one.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'ListBox anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ListBox', description: 'The list, a single Tab stop.' },
          { name: 'ListBoxItem', description: 'One option.' },
          { name: 'Text', description: 'Inside an item, `slot="label"` for its title and `slot="description"` for a second line.' },
          { name: 'ListBoxSection', description: 'Optional group of items.' },
          { name: 'Header', description: 'A section’s heading.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Use `selectionMode` (`single` or `multiple`), with `selectedKeys` and `onSelectionChange` to control the selection. Give an item `href` when choosing it opens a page.',
        'ListBox styles the vertical list. Horizontal and grid layouts and drag and drop aren’t styled yet.',
      ],
    },
    {
      key: 'accessibility',
      body: ['The list is one Tab stop; the arrow keys move between options, and typing jumps to an option that starts with those letters.'],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'ListBox pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ListBox'),
      },
    },
  ],
  relatedPages: [
    { label: 'Autocomplete', href: '/autocomplete' },
    { label: 'Select', href: '/select' },
  ],
  references: [
    { label: 'React Aria ListBox', href: 'https://react-aria.adobe.com/ListBox' },
  ],
}

// The example's options: two sections of teaching labels.
export const listBoxSections = [
  { id: 'section-a', label: 'Section A', items: [{ id: 'option-a', label: 'Option A', description: 'Description A' }, { id: 'option-b', label: 'Option B', description: 'Description B' }] },
  { id: 'section-b', label: 'Section B', items: [{ id: 'option-c', label: 'Option C', description: 'Description C' }] },
] as const
