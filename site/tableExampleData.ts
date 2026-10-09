import type { SortDescriptor } from '@decocode/mezzanine'

export interface TableExampleRow {
  id: string
  name: string
  type: string
  updated: string
}

export const tableAnatomy = [
  { name: 'Table', purpose: 'Contains the complete table and its interaction settings.' },
  { name: 'TableHeader', purpose: 'Groups the column headings.' },
  { name: 'Column', purpose: 'Names a column and can enable sorting for it.' },
  { name: 'TableBody', purpose: 'Groups the rows and provides the empty state.' },
  { name: 'Row', purpose: 'Contains one record and its cells.' },
  { name: 'Cell', purpose: 'Contains one piece of data within a row.' },
] as const

export const tableExampleRows: TableExampleRow[] = [
  { id: 'brand-guidelines', name: 'Brand guidelines', type: 'Document', updated: '2026-09-18' },
  { id: 'component-library', name: 'Component library', type: 'Project', updated: '2026-10-04' },
  { id: 'research-notes', name: 'Research notes', type: 'Document', updated: '2026-08-27' },
]

type SortableTableColumn = 'name' | 'type' | 'updated'

export function sortTableExampleRows(
  rows: TableExampleRow[],
  descriptor: SortDescriptor,
) {
  const column = descriptor.column as SortableTableColumn
  const direction = descriptor.direction === 'descending' ? -1 : 1

  return [...rows].sort((firstRow, secondRow) => (
    firstRow[column].localeCompare(secondRow[column]) * direction
  ))
}
