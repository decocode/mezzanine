import type { ReactNode, RefAttributes } from 'react'
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  type CheckboxGroupProps as ReactAriaCheckboxGroupProps,
} from 'react-aria-components/CheckboxGroup'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'

export interface CheckboxGroupProps extends Omit<ReactAriaCheckboxGroupProps, 'children'> {
  // The visible label. Without one, give the CheckboxGroup an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // The message shown when the group is invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // The Checkboxes.
  children?: ReactNode
}

// A group of checkboxes, following React Aria's starter CheckboxGroup. Mezzanine draws the label, help
// text, error, then the checkboxes.
export function CheckboxGroup({ label, description, errorMessage, children, ...props }: CheckboxGroupProps & RefAttributes<HTMLDivElement>) {
  return (
    <ReactAriaCheckboxGroup {...props} className={composeClassName('mz-checkbox-group', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <div className="mz-checkbox-group-options">{children}</div>
    </ReactAriaCheckboxGroup>
  )
}

export type { CheckboxGroupRenderProps } from 'react-aria-components/CheckboxGroup'
