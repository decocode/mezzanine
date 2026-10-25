import type { RefAttributes } from 'react'
import { Popover as ReactAriaPopover, type PopoverProps } from 'react-aria-components/Popover'
import { composeClassName } from '../composeClassName'

export function Popover(props: PopoverProps & RefAttributes<HTMLElement>) {
  return <ReactAriaPopover {...props} className={composeClassName('mz-popover', props.className)} />
}

export type {
  PopoverProps,
  PopoverRenderProps,
} from 'react-aria-components/Popover'
