import type { ReactNode, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components/Link'
import { ProgressBar } from 'react-aria-components/ProgressBar'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

// Where an icon button shows its label: in a tooltip, or visibly below or above the icon. The label
// is always the button's children, so the accessible name and the visible words always match.
export type ButtonLabelPlacement = 'tooltip' | 'below' | 'above'

interface ButtonAppearanceProps {
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  labelPlacement?: ButtonLabelPlacement
  // Where a tooltip label appears; React Aria's Tooltip placement. Only used with labelPlacement="tooltip".
  tooltipPlacement?: TooltipProps['placement']
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
  labelPlacement,
  tooltipPlacement,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  // A tooltip label is the accessible name; the button itself shows only its icon.
  const tooltipLabel = labelPlacement === 'tooltip' && typeof props.children === 'string' ? props.children : undefined
  const appearance = {
    'data-icon-only': (labelPlacement === 'tooltip' || (props.children == null && (iconLeading != null || iconTrailing != null))) || undefined,
    'data-label-placement': labelPlacement === 'below' || labelPlacement === 'above' ? labelPlacement : undefined,
    'data-size': size,
    'data-variant': variant,
    ...(tooltipLabel !== undefined && { 'aria-label': props['aria-label'] ?? tooltipLabel }),
  }

  function renderContent(children: ReactNode, isPending = false) {
    return (
      <>
        <span className="mezzanine-button-content">
          {iconLeading != null && <span aria-hidden="true" className="mezzanine-button-icon">{iconLeading}</span>}
          {tooltipLabel === undefined && children}
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

  const withTooltip = (button: ReactNode) => tooltipLabel === undefined ? button : (
    <TooltipTrigger>
      {button}
      <Tooltip placement={tooltipPlacement}>{tooltipLabel}</Tooltip>
    </TooltipTrigger>
  )

  // Preserve native navigation and React Aria's link interactions when href is supplied.
  if (props.href !== undefined) {
    const { children, className, ...linkProps } = props
    return withTooltip(
      <ReactAriaLink
        {...linkProps}
        {...appearance}
        className={composeRenderProps(className, resolvedClassName => (
          ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
        ))}
      >
        {composeRenderProps(children, resolvedChildren => renderContent(resolvedChildren))}
      </ReactAriaLink>,
    )
  }

  const { children, className, ...buttonProps } = props
  return withTooltip(
    <ReactAriaButton
      {...buttonProps}
      {...appearance}
      className={composeRenderProps(className, resolvedClassName => (
        ['react-aria-Button', resolvedClassName].filter(Boolean).join(' ')
      ))}
    >
      {composeRenderProps(children, (resolvedChildren, { isPending }) => renderContent(resolvedChildren, isPending))}
    </ReactAriaButton>,
  )
}
