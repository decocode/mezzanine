import type { RefAttributes } from 'react'
import {
  RadioButton as ReactAriaRadioButton,
  RadioField as ReactAriaRadioField,
  RadioGroup as ReactAriaRadioGroup,
  type RadioButtonProps,
  type RadioFieldProps,
  type RadioGroupProps,
} from 'react-aria-components/RadioGroup'
import { composeClassName } from '../composeClassName'

export function RadioGroup(props: RadioGroupProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaRadioGroup {...props} className={composeClassName('mz-radio-group', props.className)} />
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
  RadioGroupProps,
  RadioGroupRenderProps,
} from 'react-aria-components/RadioGroup'
