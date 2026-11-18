import type { ReactNode, RefAttributes } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Tag as ReactAriaTag,
  TagGroup as ReactAriaTagGroup,
  TagList as ReactAriaTagList,
  type TagGroupProps as ReactAriaTagGroupProps,
  type TagListProps,
  type TagProps,
} from 'react-aria-components/TagGroup'
import { Button } from 'react-aria-components/Button'
import { composeClassName } from '../composeClassName'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'
import { CloseIcon } from '../../icons/Icons'

export interface TagGroupProps<T extends object> extends Omit<ReactAriaTagGroupProps, 'children'>, Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  // The visible label. Without one, give the TagGroup an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // A message about a problem with the tags. React Aria's TagGroup has no validation, so it shows
  // whenever it's given, as in React Aria's starter.
  errorMessage?: string
}

// A group of tags, following React Aria's starter TagGroup. Mezzanine draws the label, help text, error,
// then the tags.
export function TagGroup<T extends object>({ label, description, errorMessage, items, children, renderEmptyState, ...props }: TagGroupProps<T>) {
  return (
    <ReactAriaTagGroup {...props} className={composeClassName('mz-tag-group', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      {errorMessage != null && <Text slot="errorMessage" className="mz-field-error">{errorMessage}</Text>}
      <TagList items={items} renderEmptyState={renderEmptyState}>{children}</TagList>
    </ReactAriaTagGroup>
  )
}

// One tag. Mezzanine adds a remove button when the group allows removing.
export function Tag(props: TagProps) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaTag {...props} textValue={textValue} className={composeClassName('mz-tag', props.className)}>
      {composeRenderProps(props.children, (children, { allowsRemoving }) => <>
        {children}
        {allowsRemoving && <Button slot="remove" className="mz-tag-remove"><CloseIcon className="mz-tag-remove-icon" /></Button>}
      </>)}
    </ReactAriaTag>
  )
}

export function TagList<T>(props: TagListProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTagList<T> {...props} className={composeClassName('mz-tag-list', props.className)} />
}

export type {
  TagListProps,
  TagListRenderProps,
  TagProps,
  TagRenderProps,
} from 'react-aria-components/TagGroup'
