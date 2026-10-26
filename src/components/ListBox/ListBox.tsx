import type { ReactNode, RefAttributes } from 'react'
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

export interface ListBoxItemIconProps {
  // A decorative icon before the option's text, hidden from screen readers. A Select shows it in its
  // trigger too, with the chosen option's text.
  icon?: ReactNode
}

// A selected option shows a checkmark at its end, so selection doesn't rely on colour alone. Plain-text
// options keep their text for typeahead, because the checkmark makes the children more than a string.
export function ListBoxItem<T>({ icon, ...props }: ListBoxItemProps<T> & ListBoxItemIconProps & RefAttributes<HTMLDivElement>) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  return (
    <ReactAriaListBoxItem<T>
      {...props}
      textValue={textValue}
      className={composeClassName('mz-list-box-item', props.className)}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => <>
        {icon == null ? children : (
          <span className="mz-list-box-item-with-icon">
            <span aria-hidden="true" className="mz-list-box-item-icon">{icon}</span>
            <span className="mz-list-box-item-text">{children}</span>
          </span>
        )}
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
