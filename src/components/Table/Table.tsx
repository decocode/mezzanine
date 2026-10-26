import {
  Cell as ReactAriaCell,
  Column as ReactAriaColumn,
  Row as ReactAriaRow,
  Table as ReactAriaTable,
  TableBody as ReactAriaTableBody,
  TableHeader as ReactAriaTableHeader,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from 'react-aria-components/Table'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import type { RefAttributes } from 'react'
import { composeClassName } from '../composeClassName'
import { ArrowDownIcon, ArrowUpIcon } from '../../icons/Icons'

// A table wider than the space it has scrolls sideways inside its own container, so the page never does.
// The table's rows take keyboard focus, and focus scrolls them into view, so the container needs no
// focus of its own.
export function Table(props: TableProps & RefAttributes<HTMLDivElement | HTMLTableElement>) {
  return (
    <div className="mz-table-scroll">
      <ReactAriaTable {...props} className={composeClassName('mz-table', props.className)} />
    </div>
  )
}

export function TableHeader<T>(props: TableHeaderProps<T> & RefAttributes<HTMLDivElement | HTMLTableSectionElement>) {
  return <ReactAriaTableHeader<T> {...props} className={composeClassName('mz-table-header', props.className)} />
}

export function TableBody<T>(props: TableBodyProps<T> & RefAttributes<HTMLDivElement | HTMLTableSectionElement>) {
  return <ReactAriaTableBody<T> {...props} className={composeClassName('mz-table-body', props.className)} />
}

export function Row<T>(props: RowProps<T> & RefAttributes<HTMLDivElement | HTMLTableRowElement>) {
  return <ReactAriaRow<T> {...props} className={composeClassName('mz-row', props.className)} />
}

export function Cell(props: CellProps & RefAttributes<HTMLDivElement | HTMLTableCellElement>) {
  return <ReactAriaCell {...props} className={composeClassName('mz-cell', props.className)} />
}

// React Aria owns sorting interactions and announcements; Mezzanine adds the visual indicator.
export function Column(props: ColumnProps & RefAttributes<HTMLDivElement | HTMLTableCellElement>) {
  return (
    <ReactAriaColumn {...props} className={composeClassName('mz-column', props.className)}>
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
