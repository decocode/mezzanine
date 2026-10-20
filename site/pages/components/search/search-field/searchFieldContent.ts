import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const searchFieldContent: DocsPageContent = {
  id: 'search-field',
  kind: 'component',
  title: 'SearchField',
  description: 'A search field is a text box for search terms, with a search icon and a button that clears it.',
  sections: [
    { key: 'example', intro: ['The clear button or the Escape key empties the field.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'SearchField anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'SearchField', description: 'Holds the value. Mezzanine adds a decorative search icon and a clear button internally.' },
          { name: 'Label', description: 'The visible name. Use `aria-label` on SearchField instead when the purpose is already clear.' },
          { name: 'Input', description: 'The text box.' },
          { name: 'Text', description: 'Optional description, with `slot="description"`.' },
          { name: 'FieldError', description: 'Optional error message, shown when the field is invalid.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put a `Label` and an `Input` inside `SearchField`, as with TextField. Use `defaultValue` for a starting value, or `value` with `onChange` to control it. `onSubmit` runs when Enter is pressed.',
      ],
    },
    {
      key: 'accessibility',
      body: ['React Aria names the clear button and keeps it out of the Tab order. Escape clears the field.'],
    },
    {
      key: 'tokens',
      intro: ['`SearchField` also uses the shared field, typography, focus and colour tokens.'],
      table: {
        label: 'SearchField CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--search-field-gap', description: 'Space between the label, field and help text.' },
          { name: '--search-field-icon-size', description: 'Size of the search icon.' },
          { name: '--search-field-icon-gap', description: 'Space between the search icon and the text.' },
          { name: '--search-field-icon-foreground', description: 'Colour of the search icon.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Autocomplete', href: '/autocomplete' },
    { label: 'Text field', href: '/text-field' },
  ],
  references: [
    { label: 'React Aria SearchField', href: 'https://react-aria.adobe.com/SearchField' },
  ],
}
