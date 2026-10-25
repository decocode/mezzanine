import type { RefAttributes } from 'react'
import {
  Header as ReactAriaHeader,
  ListBox as ReactAriaListBox,
  ListBoxItem as ReactAriaListBoxItem,
  ListBoxSection as ReactAriaListBoxSection,
  type HeaderProps,
  type ListBoxItemProps,
  type ListBoxProps,
  type ListBoxSectionProps,
} from 'react-aria-components/ListBox'
import { composeRenderProps } from 'react-aria-components'
import { CheckIcon } from '../../icons/Icons'
import { composeClassName } from '../composeClassName'

export function ListBox<T>(props: ListBoxProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaListBox<T> {...props} className={composeClassName('mz-list-box', props.className)} />
}

// A selected option shows a checkmark at its end, so selection doesn't rely on colour alone. Plain-text
// options keep their text for typeahead, because the checkmark makes the children more than a string.
export function ListBoxItem<T>(props: ListBoxItemProps<T> & RefAttributes<HTMLDivElement>) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaListBoxItem<T>
      {...props}
      textValue={textValue}
      className={composeClassName('mz-list-box-item', props.className)}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => <>
        {children}
        {isSelected && <CheckIcon className="mz-list-box-item-check" />}
      </>)}
    </ReactAriaListBoxItem>
  )
}

export function ListBoxSection<T>(props: ListBoxSectionProps<T> & RefAttributes<HTMLElement>) {
  return <ReactAriaListBoxSection<T> {...props} className={composeClassName('mz-list-box-section', props.className)} />
}

export function Header(props: HeaderProps & RefAttributes<HTMLElement>) {
  return <ReactAriaHeader {...props} className={composeClassName('mz-header', props.className)} />
}

export type {
  HeaderProps,
  ListBoxItemProps,
  ListBoxItemRenderProps,
  ListBoxProps,
  ListBoxRenderProps,
  ListBoxSectionProps,
} from 'react-aria-components/ListBox'
