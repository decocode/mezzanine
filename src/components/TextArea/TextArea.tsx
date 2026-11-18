import type { ReactNode, RefAttributes } from 'react'
import {
  TextArea as ReactAriaTextArea,
  TextField as ReactAriaTextField,
  type TextFieldProps as ReactAriaTextFieldProps,
} from 'react-aria-components/TextField'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export interface TextAreaProps extends Omit<ReactAriaTextFieldProps, 'children'> {
  // The visible label. Without one, give the TextArea an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // The message shown when the field is invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // Placeholder text in the text area. It doesn't replace a label.
  placeholder?: string
  // How many lines show before the text area scrolls or is resized.
  rows?: number
}

// A field for several lines of text, following React Aria's starter TextArea. It is a TextField with a
// multiline box in place of the input, laid out the same way: label, help text, error, then the box.
export function TextArea({ label, description, errorMessage, placeholder, rows, ...props }: TextAreaProps & RefAttributes<HTMLDivElement>) {
  return (
    <ReactAriaTextField {...props} className={composeClassName('mz-text-field', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <ReactAriaTextArea className="mz-text-area" placeholder={placeholder} rows={rows} />
    </ReactAriaTextField>
  )
}
