import { Column as ReactAriaColumn, type ColumnProps } from 'react-aria-components/Table'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import type { RefAttributes } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '../../icons/Icons'

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
          {allowsSorting && sortDirection && (sortDirection === 'ascending'
            ? <ArrowUpIcon className="mz-table-sort-indicator" />
            : <ArrowDownIcon className="mz-table-sort-indicator" />)}
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
