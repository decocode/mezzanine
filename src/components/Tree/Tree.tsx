import type { ReactNode } from 'react'
import { useLocale } from 'react-aria'
import {
  TreeItem as ReactAriaTreeItem,
  TreeItemContent as ReactAriaTreeItemContent,
  type TreeItemContentProps,
  type TreeItemProps as ReactAriaTreeItemProps,
} from 'react-aria-components/Tree'
import { Button } from 'react-aria-components/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { ChevronLeftIcon, ChevronRightIcon, DragHandleIcon } from '../../icons/Icons'

// A row's content. Mezzanine adds the drag handle, the selection checkbox and the expand chevron,
// following React Aria's vanilla starter.
export function TreeItemContent({ children, ...props }: Omit<TreeItemContentProps, 'children'> & { children?: ReactNode }) {
  // The chevron points towards the end of the line, and turns down when the row is open.
  const Chevron = useLocale().direction === 'rtl' ? ChevronLeftIcon : ChevronRightIcon
  return (
    <ReactAriaTreeItemContent {...props}>
      {({ selectionBehavior, selectionMode, allowsDragging }) => <>
        {allowsDragging && <Button slot="drag" className="mz-tree-drag"><DragHandleIcon /></Button>}
        {selectionBehavior === 'toggle' && selectionMode !== 'none' && <Checkbox slot="selection" />}
        <Button slot="chevron" className="mz-tree-chevron"><Chevron className="mz-tree-chevron-icon" /></Button>
        {children}
      </>}
    </ReactAriaTreeItemContent>
  )
}

export interface TreeItemProps<T extends object = object> extends Partial<ReactAriaTreeItemProps<T>> {
  // The row's content. With a title, the children are its nested rows.
  title?: ReactNode
}

// One row in a Tree. Give it a title and nest TreeItems inside it, following React Aria's starter.
export function TreeItem<T extends object = object>({ title, children, ...props }: TreeItemProps<T>) {
  const textValue = props.textValue ?? (typeof title === 'string' ? title : '')
  return (
    <ReactAriaTreeItem {...props} textValue={textValue}>
      {title != null ? <><TreeItemContent>{title}</TreeItemContent>{children as ReactNode}</> : children}
    </ReactAriaTreeItem>
  )
}

export { Tree, TreeHeader, TreeSection } from 'react-aria-components/Tree'

export type {
  TreeHeaderProps,
  TreeItemContentProps,
  TreeItemContentRenderProps,
  TreeItemRenderProps,
  TreeProps,
  TreeRenderProps,
  TreeSectionProps,
} from 'react-aria-components/Tree'
