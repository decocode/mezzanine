import type { RefAttributes } from 'react'
import { Label as ReactAriaLabel, type LabelProps } from 'react-aria-components/Label'
import { composeClassName } from '../composeClassName'

export function Label(props: LabelProps & RefAttributes<HTMLLabelElement>) {
  return <ReactAriaLabel {...props} className={composeClassName('mz-label', props.className)} />
}

export type {
  LabelProps,
} from 'react-aria-components/Label'
