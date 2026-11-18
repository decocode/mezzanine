import type { ReactNode, RefAttributes } from 'react'
import {
  RadioButton as ReactAriaRadioButton,
  RadioField as ReactAriaRadioField,
  RadioGroup as ReactAriaRadioGroup,
  type RadioButtonProps,
  type RadioFieldProps,
  type RadioGroupProps as ReactAriaRadioGroupProps,
} from 'react-aria-components/RadioGroup'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export interface RadioGroupProps extends Omit<ReactAriaRadioGroupProps, 'children'> {
  // The visible label. Without one, give the RadioGroup an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // The message shown when the group is invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // The RadioFields.
  children?: ReactNode
}

// A group of radio options, following React Aria's starter RadioGroup. Mezzanine draws the label, help
// text, error, then the options.
export function RadioGroup({ label, description, errorMessage, children, ...props }: RadioGroupProps & RefAttributes<HTMLDivElement>) {
  return (
    <ReactAriaRadioGroup {...props} className={composeClassName('mz-radio-group', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <div className="mz-radio-group-options">{children}</div>
    </ReactAriaRadioGroup>
  )
}

export function RadioField(props: RadioFieldProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaRadioField {...props} className={composeClassName('mz-radio-field', props.className)} />
}

export function RadioButton(props: RadioButtonProps & RefAttributes<HTMLLabelElement>) {
  return <ReactAriaRadioButton {...props} className={composeClassName('mz-radio-button', props.className)} />
}

export type {
  RadioButtonProps,
  RadioButtonRenderProps,
  RadioFieldProps,
  RadioFieldRenderProps,
  RadioGroupRenderProps,
} from 'react-aria-components/RadioGroup'
