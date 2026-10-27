import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
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

// The Example's label and the Properties panel's on/off props, in panel order.
export const searchFieldExampleLabel = 'Search'
export const searchFieldFlags = ['description', 'isDisabled', 'isReadOnly', 'isInvalid'] as const
export const searchFieldExampleText = { description: 'Search description', errorMessage: 'Search error message' } as const

// The example's code: the help text and error message appear as the Text and FieldError they are.
export function searchFieldExampleCode({ description, hasErrorMessage, ...props }: Record<(typeof searchFieldFlags)[number], boolean> & { hasErrorMessage: boolean }) {
  return [
    `<SearchField${formatJsxProps(props)}>`,
    `  <Label>${searchFieldExampleLabel}</Label>`,
    '  <Input />',
    ...(description ? [`  <Text slot="description">${searchFieldExampleText.description}</Text>`] : []),
    ...(props.isInvalid && hasErrorMessage ? [`  <FieldError>${searchFieldExampleText.errorMessage}</FieldError>`] : []),
    '</SearchField>',
  ].join('\n')
}
