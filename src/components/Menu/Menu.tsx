import type { RefAttributes } from 'react'
import { composeRenderProps } from 'react-aria-components'
import { useLocale } from 'react-aria'
import {
  Menu as ReactAriaMenu,
  MenuItem as ReactAriaMenuItem,
  MenuSection as ReactAriaMenuSection,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
} from 'react-aria-components/Menu'
import { composeClassName } from '../composeClassName'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '../../icons/Icons'

export function Menu<T>(props: MenuProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaMenu<T> {...props} className={composeClassName('mz-menu', props.className)} />
}

// One action in a Menu. Mezzanine adds a tick for a selected item in a menu that allows selection,
// and a chevron for an item that opens a submenu, following React Aria's vanilla starter.
export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined)
  // The submenu chevron points towards the end of the line.
  const SubmenuChevron = useLocale().direction === 'rtl' ? ChevronLeftIcon : ChevronRightIcon
  return (
    <ReactAriaMenuItem {...props} textValue={textValue} className={composeClassName('mz-menu-item', props.className)}>
      {composeRenderProps(props.children, (children, { selectionMode, isSelected, hasSubmenu }) => <>
        {selectionMode !== 'none' && <span className="mz-menu-item-check" aria-hidden="true">{isSelected && <CheckIcon />}</span>}
        <span className="mz-menu-item-content">{children}</span>
        {hasSubmenu && <SubmenuChevron className="mz-menu-item-chevron" />}
      </>)}
    </ReactAriaMenuItem>
  )
}

export function MenuSection<T>(props: MenuSectionProps<T> & RefAttributes<HTMLElement>) {
  return <ReactAriaMenuSection<T> {...props} className={composeClassName('mz-menu-section', props.className)} />
}

export { MenuTrigger, SubmenuTrigger } from 'react-aria-components/Menu'

export type {
  MenuItemProps,
  MenuItemRenderProps,
  MenuProps,
  MenuSectionProps,
  MenuTriggerProps,
  SubmenuTriggerProps,
} from 'react-aria-components/Menu'
