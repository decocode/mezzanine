import type { ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Tag as ReactAriaTag,
  TagGroup as ReactAriaTagGroup,
  TagList,
  type TagGroupProps as ReactAriaTagGroupProps,
  type TagListProps,
  type TagProps,
} from 'react-aria-components/TagGroup'
import { Button } from 'react-aria-components/Button'
import { Label } from 'react-aria-components/Label'
import { Text } from 'react-aria-components/Text'
import { CloseIcon } from '../../icons/Icons'

export interface TagGroupProps<T extends object> extends Omit<ReactAriaTagGroupProps, 'children'>, Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  // The visible label. Without one, give the TagGroup an aria-label.
  label?: ReactNode
  // Help text under the tags.
  description?: ReactNode
  // The message shown when the group is invalid.
  errorMessage?: ReactNode
}

// A group of tags. Mezzanine draws the label, the list and the help and error text, following React
// Aria's vanilla starter.
export function TagGroup<T extends object>({ label, description, errorMessage, items, children, renderEmptyState, ...props }: TagGroupProps<T>) {
  return (
    <ReactAriaTagGroup {...props}>
      {label != null && <Label>{label}</Label>}
      <TagList items={items} renderEmptyState={renderEmptyState}>{children}</TagList>
      {description != null && <Text slot="description">{description}</Text>}
      {errorMessage != null && <Text slot="errorMessage">{errorMessage}</Text>}
    </ReactAriaTagGroup>
  )
}

// One tag. Mezzanine adds a remove button when the group allows removing.
export function Tag(props: TagProps) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaTag {...props} textValue={textValue}>
      {composeRenderProps(props.children, (children, { allowsRemoving }) => <>
        {children}
        {allowsRemoving && <Button slot="remove" className="mz-tag-remove"><CloseIcon className="mz-tag-remove-icon" /></Button>}
      </>)}
    </ReactAriaTag>
  )
}

export { TagList }

export type {
  TagListProps,
  TagListRenderProps,
  TagProps,
  TagRenderProps,
} from 'react-aria-components/TagGroup'
