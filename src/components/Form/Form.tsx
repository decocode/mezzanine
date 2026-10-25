import type { RefAttributes } from 'react'
import { Form as ReactAriaForm, type FormProps } from 'react-aria-components/Form'
import { composeClassName } from '../composeClassName'

export function Form(props: FormProps & RefAttributes<HTMLFormElement>) {
  return <ReactAriaForm {...props} className={composeClassName('mz-form', props.className)} />
}

export type {
  FormProps,
} from 'react-aria-components/Form'
