import type { SortDescriptor } from '@decocode/mezzanine'

export interface TableExampleRow {
  id: string
  columnA: string
  columnB: string
  columnC: string
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
  { id: 'row-a', columnA: 'Row A', columnB: 'Cell A2', columnC: 'Cell A3' },
  { id: 'row-b', columnA: 'Row B', columnB: 'Cell B2', columnC: 'Cell B3' },
  { id: 'row-c', columnA: 'Row C', columnB: 'Cell C2', columnC: 'Cell C3' },
]

type SortableTableColumn = 'columnA' | 'columnB' | 'columnC'

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
