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
import { composeClassName } from '../composeClassName'

export function ListBox<T>(props: ListBoxProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaListBox<T> {...props} className={composeClassName('mz-list-box', props.className)} />
}

export function ListBoxItem<T>(props: ListBoxItemProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaListBoxItem<T> {...props} className={composeClassName('mz-list-box-item', props.className)} />
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
