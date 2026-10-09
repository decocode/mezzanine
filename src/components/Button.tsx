import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { ProgressBar } from 'react-aria-components/ProgressBar'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'

export interface ButtonProps extends ReactAriaButtonProps {
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <ReactAriaButton
      {...buttonProps}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
      ))}
      data-variant={variant}
    >
      {composeRenderProps(children, (resolvedChildren, { isPending }) => (
        <>
          <span className="mezzanine-button-content">{resolvedChildren}</span>
          {isPending && (
            <ProgressBar
              aria-label="Loading"
              className="mezzanine-button-progress"
              isIndeterminate
            >
              <span aria-hidden="true" className="mezzanine-button-progress-indicator" />
            </ProgressBar>
          )}
        </>
      ))}
    </ReactAriaButton>
  )
}
