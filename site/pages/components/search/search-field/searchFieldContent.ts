import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxElementLines, formatJsxPropLines } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const searchFieldContent: DocsPageContent = {
  id: 'search-field',
  kind: 'component',
  title: 'Search field',
  description: '`SearchField` is a component for typing search terms, with a search icon and a button that clears it.',
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
          { name: 'SearchField', description: 'Holds the value and its validation. Mezzanine draws the label, help text, error, then the input with a decorative search icon and a clear button.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Give `SearchField` a `label`, or an `aria-label` when the purpose is already clear. Use `defaultValue` for a starting value, or `value` with `onChange` to control it. `onSubmit` runs when Enter is pressed.',
        '`description` adds help text and `errorMessage` the message shown when the field is invalid. Both sit under the label, above the input.',
      ],
    },
    {
      key: 'accessibility',
      body: ['React Aria names the clear button and keeps it out of the Tab order. Escape clears the field.'],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'SearchField pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('SearchField'),
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

// The Properties panel's switches, in panel order. The error message shows whenever isInvalid is on.
export const searchFieldFlags = ['description', 'isInvalid', 'isReadOnly', 'isDisabled'] as const
const searchFieldExampleText = { label: 'Search', description: 'Search description', errorMessage: 'Search error message' } as const

// The example's props, in panel order, shared by the demo and its code.
export function searchFieldExampleProps(flags: Record<(typeof searchFieldFlags)[number], boolean>) {
  return {
    label: searchFieldExampleText.label,
    description: flags.description ? searchFieldExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? searchFieldExampleText.errorMessage : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
}

export function searchFieldExampleCode(flags: Record<(typeof searchFieldFlags)[number], boolean>) {
  return formatJsxElementLines('SearchField', formatJsxPropLines(searchFieldExampleProps(flags)))
}
