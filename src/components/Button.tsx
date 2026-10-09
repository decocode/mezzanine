import type { ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { ProgressBar } from 'react-aria-components/ProgressBar'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends ReactAriaButtonProps {
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  iconLeading,
  iconTrailing,
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  const isIconOnly = children == null && (iconLeading != null || iconTrailing != null)

  return (
    <ReactAriaButton
      {...buttonProps}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
      ))}
      data-icon-only={isIconOnly || undefined}
      data-size={size}
      data-variant={variant}
    >
      {composeRenderProps(children, (resolvedChildren, { isPending }) => (
        <>
          <span className="mezzanine-button-content">
            {iconLeading != null && (
              <span aria-hidden="true" className="mezzanine-button-icon">{iconLeading}</span>
            )}
            {resolvedChildren}
            {iconTrailing != null && (
              <span aria-hidden="true" className="mezzanine-button-icon">{iconTrailing}</span>
            )}
          </span>
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
