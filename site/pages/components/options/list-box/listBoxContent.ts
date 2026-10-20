import type { DocsPageContent } from '../../../../templates/docsPageContent'

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
      key: 'tokens',
      intro: ['`ListBox` also uses shared typography tokens.'],
      table: {
        label: 'ListBox CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--list-box-padding', description: 'Space around the list.' },
          { name: '--list-box-gap', description: 'Space between items.' },
          { name: '--list-box-section-gap', description: 'Space between sections.' },
          { name: '--list-box-header-padding-block', description: 'Space above and below a section header.' },
          { name: '--list-box-header-padding-inline', description: 'Space at the start and end of a section header.' },
          { name: '--list-box-item-padding-block', description: 'Space above and below an item.' },
          { name: '--list-box-item-padding-inline', description: 'Space at the start and end of an item.' },
          { name: '--list-box-item-gap', description: 'Space between an item’s label and description.' },
          { name: '--list-box-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--list-box-focus-ring-offset', description: 'Keyboard-focus outline position; inside the item.' },
          { name: '--list-box-item-background', description: 'Item background.' },
          { name: '--list-box-item-background-hovered', description: 'Item background when hovered.' },
          { name: '--list-box-item-background-pressed', description: 'Item background when pressed.' },
          { name: '--list-box-item-background-selected', description: 'Item background when selected.' },
          { name: '--list-box-item-background-selected-hovered', description: 'Item background when selected and hovered.' },
          { name: '--list-box-item-background-selected-pressed', description: 'Item background when selected and pressed.' },
          { name: '--list-box-item-foreground', description: 'Item text colour.' },
          { name: '--list-box-item-foreground-selected', description: 'Item text colour when selected.' },
          { name: '--list-box-item-description-foreground', description: 'Description text colour.' },
          { name: '--list-box-header-foreground', description: 'Section header text colour.' },
          { name: '--list-box-empty-foreground', description: 'Text colour of the empty state.' },
        ],
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
