import { Column as ReactAriaColumn, type ColumnProps } from 'react-aria-components/Table'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import type { RefAttributes } from 'react'

export {
  Cell,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components/Table'

// React Aria owns sorting interactions and announcements; Mezzanine adds the visual indicator.
export function Column(props: ColumnProps & RefAttributes<HTMLDivElement | HTMLTableCellElement>) {
  return (
    <ReactAriaColumn {...props}>
      {composeRenderProps(props.children, (children, { allowsSorting, sortDirection }) => (
        <>
          {children}
          {allowsSorting && sortDirection && (
            <span aria-hidden="true" className="mezzanine-table-sort-indicator">
              {sortDirection === 'ascending' ? '▲' : '▼'}
            </span>
          )}
        </>
      ))}
    </ReactAriaColumn>
  )
}

export type {
  CellProps,
  CellRenderProps,
  ColumnProps,
  ColumnRenderProps,
  RowProps,
  RowRenderProps,
  SortDescriptor,
  TableBodyProps,
  TableBodyRenderProps,
  TableHeaderProps,
  TableProps,
  TableRenderProps,
} from 'react-aria-components/Table'
