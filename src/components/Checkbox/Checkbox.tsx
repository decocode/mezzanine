import { composeRenderProps } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  Checkbox as ReactAriaCheckbox,
  type CheckboxProps as ReactAriaCheckboxProps,
} from 'react-aria-components/Checkbox'
import { CheckIcon, MinusIcon } from '../../icons/Icons'

export interface CheckboxProps extends ReactAriaCheckboxProps {}

export function Checkbox({ children, className, ...checkboxProps }: CheckboxProps) {
  return (
    <ReactAriaCheckbox
      {...checkboxProps}
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
}
