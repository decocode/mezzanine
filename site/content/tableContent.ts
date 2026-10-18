import type { DocsPageContent } from '../templates/docsPageContent'

interface TableExampleRow {
  id: string
  columnA: string
  columnB: string
  columnC: string
}

export const tableExampleColumns = [
  { id: 'columnA', label: 'Column A', isRowHeader: true },
  { id: 'columnB', label: 'Column B', isRowHeader: false },
  { id: 'columnC', label: 'Column C', isRowHeader: false },
] as const

export const tableExampleRows: TableExampleRow[] = [
  { id: 'row-a', columnA: 'Row A', columnB: 'Cell A2', columnC: 'Cell A3' },
  { id: 'row-b', columnA: 'Row B', columnB: 'Cell B2', columnC: 'Cell B3' },
  { id: 'row-c', columnA: 'Row C', columnB: 'Cell C2', columnC: 'Cell C3' },
]

// Headings and the note inside the Example section's two live examples. The note also appears in the intro.
export const tableExampleGroups = {
  singleSelection: 'Single selection',
  multipleSelection: 'Multiple selection',
  disabledRowNote: 'Row C is disabled in this example.',
}

export const tableContent: DocsPageContent = {
  id: 'table',
  kind: 'component',
  title: 'Table',
  description: 'A table organises information into rows and columns, with headings explaining what each column contains. It helps people compare items and find details, such as the name, price and availability of a product.',
  sections: [
    {
      key: 'example',
      intro: [
        'Tables have no selectable rows by default. Use single selection when one row can be chosen, or multiple selection when several rows can be chosen.',
        tableExampleGroups.disabledRowNote,
      ],
      subsections: [
        { id: 'table-single-selection-heading', label: tableExampleGroups.singleSelection },
        { id: 'table-multiple-selection-heading', label: tableExampleGroups.multipleSelection },
      ],
    },
    { key: 'sorting', title: 'Sorting', intro: ['Select a column heading to change the order of its rows.'] },
    { key: 'emptyState', title: 'Empty state', intro: ['Use an empty state to explain clearly when the table has no rows to display.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      intro: ['A table is assembled from six React Aria components. Selection and sorting are optional.'],
      table: {
        label: 'Table anatomy',
        nameColumn: 'Component',
        rows: [
          { name: 'Table', description: 'Contains the complete table and its interaction settings.' },
          { name: 'TableHeader', description: 'Groups the column headings.' },
          { name: 'Column', description: 'Names a column and can enable sorting for it.' },
          { name: 'TableBody', description: 'Groups the rows and provides the empty state.' },
          { name: 'Row', description: 'Contains one record and its cells.' },
          { name: 'Cell', description: 'Contains one piece of data within a row.' },
        ],
      },
    },
    {
      key: 'responsiveBehaviour',
      title: 'Responsive behaviour',
      intro: ['When a table is wider than the available space, it scrolls horizontally without causing the whole page to overflow.'],
    },
    {
      key: 'usage',
      body: [
        'Use `Column isRowHeader` for the cell that identifies each row, and stable row and column IDs so selection and sorting refer to consistent records.',
        'Use `selectionMode` to opt into selection. Set `defaultSelectedKeys` for initial selection or `selectedKeys` with `onSelectionChange` for application-controlled selection. Disabled rows are identified through `disabledKeys`.',
        'Set `allowsSorting` on a `Column` to enable sorting controls and the shared direction indicator. Pass `sortDescriptor` and `onSortChange` to `Table`. React Aria reports the requested column and direction; your application supplies the rows in that order, either by sorting locally or requesting sorted data from a server.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Give the table an `aria-label` or `aria-labelledby`.',
        'Arrow keys move through the table’s rows, cells and focusable controls, and Tab moves between focusable regions or controls. Keep labels on any buttons and links placed inside cells.',
      ],
    },
    {
      key: 'tokens',
      intro: ['`Table` also uses shared typography, border, surface, text and focus colour tokens.'],
      table: {
        label: 'Table CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--table-cell-padding-block', description: 'Vertical padding in header and body cells.' },
          { name: '--table-cell-padding-inline', description: 'Horizontal padding in header and body cells.' },
          { name: '--table-border-width', description: 'Thickness of the borders around and between rows.' },
          { name: '--table-header-background', description: 'Column header background.' },
          { name: '--table-row-background-selected', description: 'Selected row background.' },
          { name: '--table-row-background-selected-hovered', description: 'Selected row background when hovered.' },
          { name: '--table-row-background-selected-pressed', description: 'Selected row background when pressed.' },
          { name: '--table-row-content-selected', description: 'Selected row text colour.' },
          { name: '--table-disabled-opacity', description: 'Opacity of disabled rows and cells.' },
          { name: '--table-focus-ring-width', description: 'Thickness of the keyboard-focus and drop-target outlines.' },
          { name: '--table-focus-ring-offset', description: 'Position of the keyboard-focus and drop-target outlines.' },
          { name: '--table-drop-target-color', description: 'Outline colour when the table or its body is a drop target.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Badge', href: '/badge' },
  ],
  references: [
    { label: 'React Aria Table', href: 'https://react-aria.adobe.com/Table' },
  ],
}
