import type { ReactNode, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components/Link'
import { ProgressBar } from 'react-aria-components/ProgressBar'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonAppearanceProps {
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

interface ActionButtonProps extends ReactAriaButtonProps, ButtonAppearanceProps {
  href?: never
  ref?: Ref<HTMLButtonElement>
}

interface NavigationButtonProps extends ReactAriaLinkProps, ButtonAppearanceProps {
  href: string
  ref?: Ref<HTMLAnchorElement>
  isPending?: never
}

export type ButtonProps = ActionButtonProps | NavigationButtonProps

export function Button({
  iconLeading,
  iconTrailing,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const appearance = {
    'data-icon-only': (props.children == null && (iconLeading != null || iconTrailing != null)) || undefined,
    'data-size': size,
    'data-variant': variant,
  }

  function renderContent(children: ReactNode, isPending = false) {
    return (
      <>
        <span className="mezzanine-button-content">
          {iconLeading != null && <span aria-hidden="true" className="mezzanine-button-icon">{iconLeading}</span>}
          {children}
          {iconTrailing != null && <span aria-hidden="true" className="mezzanine-button-icon">{iconTrailing}</span>}
        </span>
        {isPending && (
          <ProgressBar aria-label="Loading" className="mezzanine-button-progress" isIndeterminate>
            <span aria-hidden="true" className="mezzanine-button-progress-indicator" />
          </ProgressBar>
        )}
      </>
    )
  }

  // Preserve native navigation and React Aria's link interactions when href is supplied.
  if (props.href !== undefined) {
    const { children, className, ...linkProps } = props
    return (
      <ReactAriaLink
        {...linkProps}
        {...appearance}
        className={composeRenderProps(className, resolvedClassName => (
          ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
        ))}
      >
        {composeRenderProps(children, resolvedChildren => renderContent(resolvedChildren))}
      </ReactAriaLink>
    )
  }

  const { children, className, ...buttonProps } = props
  return (
    <ReactAriaButton
      {...buttonProps}
      {...appearance}
      className={composeRenderProps(className, resolvedClassName => (
        ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
      ))}
    >
      {composeRenderProps(children, (resolvedChildren, { isPending }) => renderContent(resolvedChildren, isPending))}
    </ReactAriaButton>
  )
}
