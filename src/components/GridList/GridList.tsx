import { composeRenderProps } from 'react-aria-components'
import {
  GridListItem as ReactAriaGridListItem,
  type GridListItemProps,
} from 'react-aria-components/GridList'
import { Button } from 'react-aria-components/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { DragHandleIcon } from '../../icons/Icons'

// One item in a GridList. Mezzanine adds a drag handle when the list allows dragging, and a checkbox
// when several items can be chosen one by one, following React Aria's vanilla starter.
export function GridListItem<T extends object>(props: GridListItemProps<T>) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaGridListItem {...props} textValue={textValue}>
      {composeRenderProps(props.children, (children, { selectionMode, selectionBehavior, allowsDragging }) => <>
        {allowsDragging && <Button slot="drag" className="mz-grid-list-drag"><DragHandleIcon /></Button>}
        {selectionMode === 'multiple' && selectionBehavior === 'toggle' && <Checkbox slot="selection" />}
        {children}
      </>)}
    </ReactAriaGridListItem>
  )
}

export { GridList, GridListHeader, GridListSection } from 'react-aria-components/GridList'

export type {
  GridListHeaderProps,
  GridListItemProps,
  GridListItemRenderProps,
  GridListProps,
  GridListRenderProps,
  GridListSectionProps,
} from 'react-aria-components/GridList'
