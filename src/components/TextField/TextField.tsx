import type { ReactNode, RefAttributes } from 'react'
import {
  Input as ReactAriaInput,
  TextField as ReactAriaTextField,
  type InputProps,
  type TextFieldProps as ReactAriaTextFieldProps,
} from 'react-aria-components/TextField'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export interface TextFieldProps extends Omit<ReactAriaTextFieldProps, 'children'> {
  // The visible label. Without one, give the TextField an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // The message shown when the field is invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // Placeholder text in the input. It doesn't replace a label.
  placeholder?: string
}

// A field for one line of text, following React Aria's starter TextField. Mezzanine draws the label,
// help text, error and input, in that order, so people read the help and any error before they type.
export function TextField({ label, description, errorMessage, placeholder, ...props }: TextFieldProps & RefAttributes<HTMLDivElement>) {
  return (
    <ReactAriaTextField {...props} className={composeClassName('mz-text-field', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Input placeholder={placeholder} />
    </ReactAriaTextField>
  )
}

// The bare input, for fields that build their own layout, such as SearchField and ComboBox.
export function Input(props: InputProps & RefAttributes<HTMLInputElement>) {
  return <ReactAriaInput {...props} className={composeClassName('mz-input', props.className)} />
}

export type { TextFieldRenderProps, InputProps } from 'react-aria-components/TextField'
