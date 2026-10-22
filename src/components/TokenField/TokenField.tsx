import type { ReactNode, Ref } from 'react'
import {
  TokenField as ReactAriaTokenField,
  TokenInput,
  type TokenFieldProps as ReactAriaTokenFieldProps,
  type TokenFieldValue,
  type TokenInputProps,
} from 'react-aria-components/TokenField'
import { Label } from 'react-aria-components/Label'
import { Text } from 'react-aria-components/Text'

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue> extends Omit<ReactAriaTokenFieldProps<T>, 'children'> {
  // The visible label. Without one, give the TokenField an aria-label.
  label?: ReactNode
  // Help text under the field.
  description?: ReactNode
  // Text shown while the field is empty.
  placeholder?: string
  // A ref to the editable area, for positioning a Popover beside the text.
  inputRef?: Ref<HTMLDivElement>
  // Renders a Token for each token in the value.
  children: TokenInputProps<T>['children']
}

// A text field that holds tokens among its text. Mezzanine draws the label, the editable area with the
// text field's look, and the help text, following React Aria's vanilla starter.
export function TokenField<T extends TokenFieldValue = TokenFieldValue>({ label, description, placeholder, inputRef, children, ...props }: TokenFieldProps<T>) {
  return (
    <ReactAriaTokenField {...props}>
      {label != null && <Label>{label}</Label>}
      <TokenInput<T> ref={inputRef} data-placeholder={placeholder}>{children}</TokenInput>
      {description != null && <Text slot="description">{description}</Text>}
    </ReactAriaTokenField>
  )
}

export { Token, TokenFieldValue, TokenInput } from 'react-aria-components/TokenField'

export type {
  TokenFieldRenderProps,
  TokenInputProps,
  TokenInputRenderProps,
  TokenProps,
  TokenRenderProps,
} from 'react-aria-components/TokenField'
