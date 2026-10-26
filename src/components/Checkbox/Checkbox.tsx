import { useId, type ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  Checkbox as ReactAriaCheckbox,
  type CheckboxProps as ReactAriaCheckboxProps,
} from 'react-aria-components/Checkbox'
import { CheckIcon, MinusIcon } from '../../icons/Icons'

export interface CheckboxProps extends ReactAriaCheckboxProps {
  // Help text shown under the checkbox, as a Switch's description is. Screen readers read it with the
  // checkbox.
  description?: ReactNode
  // The message shown under the checkbox when it's invalid, after any help text. Screen readers read it
  // with the checkbox.
  errorMessage?: ReactNode
}

export function Checkbox({ children, className, description, errorMessage, ...checkboxProps }: CheckboxProps) {
  const descriptionId = useId()
  const errorId = useId()
  const showsDescription = description != null
  const showsError = checkboxProps.isInvalid === true && errorMessage != null
  const describedBy = [checkboxProps['aria-describedby'], showsDescription ? descriptionId : undefined, showsError ? errorId : undefined].filter(Boolean).join(' ') || undefined
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
  if (!showsDescription && !showsError) return checkbox
  // The help text and message sit outside the checkbox's label, so they aren't part of its name.
  return (
    <div className="mz-checkbox-field">
      {checkbox}
      {showsDescription && <span className="mz-checkbox-description" id={descriptionId}>{description}</span>}
      {showsError && <span className="mz-checkbox-error" id={errorId}>{errorMessage}</span>}
    </div>
  )
}
