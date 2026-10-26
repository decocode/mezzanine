import { useId, type ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  Checkbox as ReactAriaCheckbox,
  type CheckboxProps as ReactAriaCheckboxProps,
} from 'react-aria-components/Checkbox'
import { CheckIcon, MinusIcon } from '../../icons/Icons'

export interface CheckboxProps extends ReactAriaCheckboxProps {
  // The message shown under the checkbox when it's invalid. Screen readers read it with the checkbox.
  errorMessage?: ReactNode
}

export function Checkbox({ children, className, errorMessage, ...checkboxProps }: CheckboxProps) {
  const errorId = useId()
  const showsError = checkboxProps.isInvalid === true && errorMessage != null
  const describedBy = [checkboxProps['aria-describedby'], showsError ? errorId : undefined].filter(Boolean).join(' ') || undefined
  const checkbox = (
    <ReactAriaCheckbox
      {...checkboxProps}
      aria-describedby={describedBy}
      className={composeClassName('mz-checkbox', className)}
    >
      {composeRenderProps(children, (resolvedChildren, { isIndeterminate, isSelected }) => (
        <>
          <span aria-hidden="true" className="mz-checkbox-indicator">
            {isIndeterminate && <MinusIcon />}
            {!isIndeterminate && isSelected && <CheckIcon />}
          </span>
          {resolvedChildren}
        </>
      ))}
    </ReactAriaCheckbox>
  )
  if (!showsError) return checkbox
  // The message sits outside the checkbox's label, so it isn't part of its name.
  return (
    <div className="mz-checkbox-field">
      {checkbox}
      <span className="mz-checkbox-error" id={errorId}>{errorMessage}</span>
    </div>
  )
}
