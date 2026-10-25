import type { RefAttributes } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  GridList as ReactAriaGridList,
  GridListHeader as ReactAriaGridListHeader,
  GridListItem as ReactAriaGridListItem,
  GridListSection as ReactAriaGridListSection,
  type GridListHeaderProps,
  type GridListItemProps,
  type GridListProps,
  type GridListSectionProps,
} from 'react-aria-components/GridList'
import { Button } from 'react-aria-components/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { composeClassName } from '../composeClassName'
import { DragHandleIcon } from '../../icons/Icons'

export function GridList<T>(props: GridListProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaGridList<T> {...props} className={composeClassName('mz-grid-list', props.className)} />
}

// One item in a GridList. Mezzanine adds a drag handle when the list allows dragging, and a checkbox
// when several items can be chosen one by one, following React Aria's vanilla starter.
export function GridListItem<T extends object>(props: GridListItemProps<T>) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaGridListItem {...props} textValue={textValue} className={composeClassName('mz-grid-list-item', props.className)}>
      {composeRenderProps(props.children, (children, { selectionMode, selectionBehavior, allowsDragging }) => <>
        {allowsDragging && <Button slot="drag" className="mz-grid-list-drag"><DragHandleIcon /></Button>}
        {selectionMode === 'multiple' && selectionBehavior === 'toggle' && <Checkbox slot="selection" />}
        {children}
      </>)}
    </ReactAriaGridListItem>
  )
}

export function GridListHeader(props: GridListHeaderProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaGridListHeader {...props} className={composeClassName('mz-grid-list-header', props.className)} />
}

export function GridListSection<T>(props: GridListSectionProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaGridListSection<T> {...props} className={composeClassName('mz-grid-list-section', props.className)} />
}

export type {
  GridListHeaderProps,
  GridListItemProps,
  GridListItemRenderProps,
  GridListProps,
  GridListRenderProps,
  GridListSectionProps,
} from 'react-aria-components/GridList'
