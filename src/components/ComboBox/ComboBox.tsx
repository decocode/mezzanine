import type { ReactNode, RefAttributes } from 'react'
import {
  ComboBox as ReactAriaComboBox,
  ComboBoxValue as ReactAriaComboBoxValue,
  type ComboBoxProps as ReactAriaComboBoxProps,
  type ComboBoxValueProps,
} from 'react-aria-components/ComboBox'
import { Button } from 'react-aria-components/Button'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { ListBox } from '../ListBox/ListBox'
import { Popover } from '../Popover/Popover'
import { Text } from '../Text/Text'
import { Input } from '../TextField/TextField'
import { ChevronDownIcon } from '../../icons/Icons'

export interface ComboBoxProps<T extends object, M extends 'single' | 'multiple' = 'single'> extends Omit<ReactAriaComboBoxProps<T, M>, 'children'> {
  // The visible label. Without one, give the ComboBox an aria-label.
  label?: ReactNode
  // Help text under the field.
  description?: ReactNode
  // The message shown when the field is invalid.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // Placeholder text in the input.
  placeholder?: string
  // ListBoxItems, or a function that renders one for each item.
  children: ReactNode | ((item: T) => ReactNode)
}

// A text field with a list of suggestions. Mezzanine draws the label, the input with its chevron
// button, the help and error text, and the list in a Popover, following React Aria's vanilla starter.
export function ComboBox<T extends object, M extends 'single' | 'multiple' = 'single'>({ label, description, errorMessage, placeholder, children, ...props }: ComboBoxProps<T, M>) {
  return (
    <ReactAriaComboBox<T, M> {...props} className={composeClassName('mz-combo-box', props.className)}>
      {label != null && <Label>{label}</Label>}
      <div className="mz-combo-box-field">
        <Input placeholder={placeholder} />
        <Button className="mz-combo-box-trigger"><ChevronDownIcon className="mz-combo-box-chevron" /></Button>
      </div>
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox>{children}</ListBox>
      </Popover>
    </ReactAriaComboBox>
  )
}

export function ComboBoxValue<T>(props: ComboBoxValueProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaComboBoxValue<T> {...props} className={composeClassName('mz-combo-box-value', props.className)} />
}

export type {
  ComboBoxRenderProps,
  ComboBoxValueProps,
  ComboBoxValueRenderProps,
} from 'react-aria-components/ComboBox'
