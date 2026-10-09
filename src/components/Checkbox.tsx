import { composeRenderProps } from 'react-aria-components'
import {
  Checkbox as ReactAriaCheckbox,
  type CheckboxProps as ReactAriaCheckboxProps,
} from 'react-aria-components/Checkbox'
import { CheckIcon } from '../icons/Icons'
import { MinusIcon } from '../icons/StudioIcons'

export interface CheckboxProps extends ReactAriaCheckboxProps {}

export function Checkbox({ children, className, ...checkboxProps }: CheckboxProps) {
  return (
    <ReactAriaCheckbox
      {...checkboxProps}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['react-aria-Checkbox', resolvedClassName].filter(Boolean).join(' ')
      ))}
    >
      {composeRenderProps(children, (resolvedChildren, { isIndeterminate, isSelected }) => (
        <>
          <span aria-hidden="true" className="mezzanine-checkbox-indicator">
            {isIndeterminate && <MinusIcon />}
            {!isIndeterminate && isSelected && <CheckIcon />}
          </span>
          {resolvedChildren}
        </>
      ))}
    </ReactAriaCheckbox>
  )
}
