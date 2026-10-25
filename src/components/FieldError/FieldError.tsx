import type { RefAttributes } from 'react'
import { FieldError as ReactAriaFieldError, type FieldErrorProps } from 'react-aria-components/FieldError'
import { composeClassName } from '../composeClassName'

export function FieldError(props: FieldErrorProps & RefAttributes<HTMLElement>) {
  return <ReactAriaFieldError {...props} className={composeClassName('mz-field-error', props.className)} />
}

export type {
  FieldErrorProps,
  FieldErrorRenderProps,
} from 'react-aria-components/FieldError'
