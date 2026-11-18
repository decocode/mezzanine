import type { ReactNode } from 'react'
import { composeRenderProps, type ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  CheckboxButton as ReactAriaCheckboxButton,
  CheckboxField as ReactAriaCheckboxField,
  type CheckboxButtonProps,
  type CheckboxFieldProps,
} from 'react-aria-components/Checkbox'
import { FieldError } from '../FieldError/FieldError'
import { Text } from '../Text/Text'
import { CheckIcon, MinusIcon } from '../../icons/Icons'

export interface CheckboxProps extends Omit<CheckboxFieldProps, 'children'> {
  // The label beside the box.
  children?: CheckboxButtonProps['children']
  // Help text, under the label and lined up with it.
  description?: ReactNode
  // The message shown above the box when it's invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
}

// A checkbox, following React Aria's starter Checkbox. Mezzanine draws any error above the box, so it's
// read before the choice, then the box with its label, then any help text under the label.
export function Checkbox({ children, description, errorMessage, ...props }: CheckboxProps) {
  return (
    <ReactAriaCheckboxField {...props} className={composeClassName('mz-checkbox-field', props.className)}>
      <FieldError>{errorMessage}</FieldError>
      <ReactAriaCheckboxButton className="mz-checkbox">
        {composeRenderProps(children, (resolvedChildren, { isIndeterminate, isSelected }) => (
          <>
            <span aria-hidden="true" className="mz-checkbox-indicator">
              {isIndeterminate && <MinusIcon />}
              {!isIndeterminate && isSelected && <CheckIcon />}
            </span>
            {resolvedChildren}
          </>
        ))}
      </ReactAriaCheckboxButton>
      {description != null && <Text slot="description">{description}</Text>}
    </ReactAriaCheckboxField>
  )
}
