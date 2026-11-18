import type { ReactNode, Ref, RefAttributes } from 'react'
import {
  Token as ReactAriaToken,
  TokenField as ReactAriaTokenField,
  TokenInput as ReactAriaTokenInput,
  type TokenFieldProps as ReactAriaTokenFieldProps,
  type TokenFieldValue,
  type TokenInputProps,
  type TokenProps,
} from 'react-aria-components/TokenField'
import { composeClassName } from '../composeClassName'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue> extends Omit<ReactAriaTokenFieldProps<T>, 'children'> {
  // The visible label. Without one, give the TokenField an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // Text shown while the field is empty.
  placeholder?: string
  // A ref to the editable area, for positioning a Popover beside the text.
  inputRef?: Ref<HTMLDivElement>
  // Renders a Token for each token in the value.
  children: TokenInputProps<T>['children']
}

// A text field that holds tokens among its text, following React Aria's starter TokenField. Mezzanine
// draws the label, help text, then the editable area with the text field's look. It has no error
// message yet, because React Aria's TokenField has no validation.
export function TokenField<T extends TokenFieldValue = TokenFieldValue>({ label, description, placeholder, inputRef, children, ...props }: TokenFieldProps<T>) {
  return (
    <ReactAriaTokenField {...props} className={composeClassName('mz-token-field', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <TokenInput<T> ref={inputRef} data-placeholder={placeholder}>{children}</TokenInput>
    </ReactAriaTokenField>
  )
}

export function TokenInput<T extends TokenFieldValue = TokenFieldValue>(props: TokenInputProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTokenInput<T> {...props} className={composeClassName('mz-token-input', props.className)} />
}

export function Token(props: TokenProps & RefAttributes<HTMLSpanElement>) {
  return <ReactAriaToken {...props} className={composeClassName('mz-token', props.className)} />
}

export { TokenFieldValue } from 'react-aria-components/TokenField'

export type {
  TokenFieldRenderProps,
  TokenInputProps,
  TokenInputRenderProps,
  TokenProps,
  TokenRenderProps,
} from 'react-aria-components/TokenField'
