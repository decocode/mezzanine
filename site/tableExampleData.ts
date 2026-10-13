import type { SortDescriptor } from '@decocode/mezzanine'

export interface TableExampleRow {
  id: string
  columnA: string
  columnB: string
  columnC: string
}

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
