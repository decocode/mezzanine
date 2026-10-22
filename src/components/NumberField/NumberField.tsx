import type { ReactNode } from 'react'
import {
  NumberField as ReactAriaNumberField,
  type NumberFieldProps as ReactAriaNumberFieldProps,
} from 'react-aria-components/NumberField'
import { Button } from 'react-aria-components/Button'
import { FieldError } from 'react-aria-components/FieldError'
import { Group } from 'react-aria-components/Group'
import { Input } from 'react-aria-components/Input'
import { Label } from 'react-aria-components/Label'
import { Text } from 'react-aria-components/Text'
import type { ValidationResult } from 'react-aria-components'
import { MinusIcon, PlusIcon } from '../../icons/Icons'

export interface NumberFieldProps extends Omit<ReactAriaNumberFieldProps, 'children'> {
  // The visible label. Without one, give the NumberField an aria-label.
  label?: ReactNode
  // Help text under the field.
  description?: ReactNode
  // The message shown when the field is invalid.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // Placeholder text in the input.
  placeholder?: string
}

// A field for a number. Mezzanine draws the label, the input joined to its minus and plus buttons, and
// the help and error text, following React Aria's vanilla starter.
export function NumberField({ label, description, errorMessage, placeholder, ...props }: NumberFieldProps) {
  return (
    <ReactAriaNumberField {...props}>
      {label != null && <Label>{label}</Label>}
      <Group className="mz-number-field-group">
        <Input placeholder={placeholder} />
        <Button slot="decrement" className="mz-number-field-step"><MinusIcon className="mz-number-field-step-icon" /></Button>
        <Button slot="increment" className="mz-number-field-step"><PlusIcon className="mz-number-field-step-icon" /></Button>
      </Group>
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </ReactAriaNumberField>
  )
}

export type { NumberFieldRenderProps } from 'react-aria-components/NumberField'
