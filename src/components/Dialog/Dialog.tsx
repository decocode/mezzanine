import type { RefAttributes } from 'react'
import { Dialog as ReactAriaDialog, type DialogProps } from 'react-aria-components/Dialog'
import { composeClassName } from '../composeClassName'

export function Dialog(props: DialogProps & RefAttributes<HTMLElement>) {
  return <ReactAriaDialog {...props} className={composeClassName('mz-dialog', props.className)} />
}

export { DialogTrigger } from 'react-aria-components/Dialog'

export type {
  DialogProps,
  DialogRenderProps,
  DialogTriggerProps,
} from 'react-aria-components/Dialog'
