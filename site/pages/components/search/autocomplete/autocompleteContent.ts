import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const autocompleteContent: DocsPageContent = {
  id: 'autocomplete',
  kind: 'component',
  title: 'Autocomplete',
  description: 'Autocomplete connects a search field to a list, and filters the list as you type.',
  sections: [
    { key: 'example', intro: ['Typing filters the options. Focus stays in the field while the arrow keys move through them, and Enter chooses one.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Autocomplete anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Autocomplete', description: 'Connects the field to the list and filters it. It has no appearance of its own.' },
          { name: 'SearchField', description: 'Where the search terms are typed. A TextField works too.' },
          { name: 'ListBox', description: 'The options being filtered.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put a `SearchField` and a `ListBox` inside `Autocomplete`, and pass a `filter`, such as `contains` from `useFilter({ sensitivity: \'base\' })`. Give the ListBox a `renderEmptyState` for when nothing matches.',
      ],
    },
    {
      key: 'accessibility',
      body: ['Focus stays in the field. The arrow keys move a virtual focus through the options, which screen readers announce, and Enter chooses the highlighted one.'],
    },
  ],
  relatedPages: [
    { label: 'SearchField', href: '/search-field' },
    { label: 'ListBox', href: '/list-box' },
  ],
  references: [
    { label: 'React Aria Autocomplete', href: 'https://react-aria.adobe.com/Autocomplete' },
  ],
}

// The options the example filters.
export const autocompleteOptions = ['Option A', 'Option B', 'Option C', 'Option D'] as const
