import type { RefAttributes } from 'react'
import {
  Input as ReactAriaInput,
  TextField as ReactAriaTextField,
  type InputProps,
  type TextFieldProps,
} from 'react-aria-components/TextField'
import { composeClassName } from '../composeClassName'

export function TextField(props: TextFieldProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTextField {...props} className={composeClassName('mz-text-field', props.className)} />
}

export function Input(props: InputProps & RefAttributes<HTMLInputElement>) {
  return <ReactAriaInput {...props} className={composeClassName('mz-input', props.className)} />
}

export type { TextFieldProps, TextFieldRenderProps, InputProps } from 'react-aria-components/TextField'
