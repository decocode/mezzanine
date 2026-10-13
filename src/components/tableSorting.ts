import type { SortDescriptor } from 'react-aria-components/Table'

export type TableRowComparator<T> = (first: T, second: T, column: SortDescriptor['column']) => number

function compareTableValues(first: unknown, second: unknown): number {
  if (typeof first === 'string' && typeof second === 'string') return first.localeCompare(second)
  if (typeof first === 'number' && typeof second === 'number' && Number.isFinite(first) && Number.isFinite(second)) {
    return first - second
  }
  throw new TypeError('sortTableRows expects text or finite numbers. Supply compareRows for other values or column IDs that are not row properties.')
}

/** Returns a sorted copy. Custom comparators describe ascending order; direction is applied here. */
export function sortTableRows<T extends object>(
  rows: readonly T[],
  sortDescriptor: SortDescriptor,
  compareRows?: TableRowComparator<T>,
): T[] {
  const column = sortDescriptor.column
  const direction = sortDescriptor.direction === 'descending' ? -1 : 1
  return [...rows].sort((first, second) => {
    const comparison = compareRows
      ? compareRows(first, second, column)
      : compareTableValues(first[column as keyof T], second[column as keyof T])
    return comparison * direction
  })
}
