import type { ReactNode, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components/Link'
import { ProgressBar } from 'react-aria-components/ProgressBar'
import { composeClassName } from '../composeClassName'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'

// How much attention a button draws, from the one main action down to quiet ones; destructive marks
// an action that deletes or can't be undone.
export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Where the icon sits: before the label, after it, or on its own, as an icon-only button.
export type ButtonIconPosition = 'leading' | 'trailing' | 'iconOnly'

// Where an icon button shows its label: in a tooltip, or visibly at the top or bottom, over or under
// the icon. The label is always the button's children, so the accessible name and the visible words
// always match.
export type ButtonLabelPosition = 'tooltip' | 'top' | 'bottom'

interface ButtonAppearanceProps {
  icon?: ReactNode
  // Where a tooltip label appears; React Aria's Tooltip placement. Only used with a tooltip label.
  tooltipPosition?: TooltipProps['placement']
  size?: ButtonSize
  hierarchy?: ButtonHierarchy
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

// An icon button's label goes in a tooltip by default. That label must be plain text, because it is
// also the button's accessible name and the tooltip's words. A label at the top or bottom of the
// icon, or a text button's label, can be any content.
export type ButtonLabelProps =
  | { iconPosition: 'iconOnly'; labelPosition?: 'tooltip'; children: string }
  | { iconPosition: 'iconOnly'; labelPosition: Exclude<ButtonLabelPosition, 'tooltip'> }
  | { iconPosition?: Exclude<ButtonIconPosition, 'iconOnly'>; labelPosition?: never }

export type ButtonProps = (ActionButtonProps | NavigationButtonProps) & ButtonLabelProps

export function Button({
  icon,
  iconPosition = 'leading',
  labelPosition,
  tooltipPosition,
  size = 'md',
  hierarchy = 'primary',
  ...props
}: ButtonProps) {
  // A tooltip label is the accessible name; the button itself shows only its icon.
  const isIconButton = icon != null && iconPosition === 'iconOnly'
  const outsideLabel = isIconButton && labelPosition !== undefined && labelPosition !== 'tooltip' ? labelPosition : undefined
  const tooltipLabel = isIconButton && outsideLabel === undefined && typeof props.children === 'string' ? props.children : undefined
  const appearance = {
    'data-icon-only': (tooltipLabel !== undefined || (props.children == null && icon != null)) || undefined,
    'data-label-position': outsideLabel,
    'data-size': size,
    'data-variant': hierarchy,
    ...(tooltipLabel !== undefined && { 'aria-label': props['aria-label'] ?? tooltipLabel }),
  }

  function renderContent(children: ReactNode, isPending = false) {
    const iconPart = icon != null && <span aria-hidden="true" className="mz-button-icon">{icon}</span>
    const leading = iconPosition !== 'trailing' && iconPart
    const trailing = iconPosition === 'trailing' && iconPart
    return (
      <>
        <span className="mz-button-content">
          {appearance['data-label-position'] !== undefined
            // The icon sits in the button's box and the label sits outside it, below or above.
            ? <><span className="mz-button-icon-box">{leading}{trailing}</span>{children}</>
            : <>{leading}{tooltipLabel === undefined && children}{trailing}</>}
        </span>
        {isPending && (
          <ProgressBar aria-label="Loading" className="mz-button-progress" isIndeterminate>
            <span aria-hidden="true" className="mz-button-progress-indicator" />
          </ProgressBar>
        )}
      </>
    )
  }

  const withTooltip = (button: ReactNode) => tooltipLabel === undefined ? button : (
    <TooltipTrigger>
      {button}
      <Tooltip placement={tooltipPosition}>{tooltipLabel}</Tooltip>
    </TooltipTrigger>
  )

  // Preserve native navigation and React Aria's link interactions when href is supplied.
  if (props.href !== undefined) {
    const { children, className, ...linkProps } = props
    return withTooltip(
      <ReactAriaLink
        {...linkProps}
        {...appearance}
        className={composeClassName('mz-button', className)}
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
      className={composeClassName('mz-button', className)}
    >
      {composeRenderProps(children, (resolvedChildren, { isPending }) => renderContent(resolvedChildren, isPending))}
    </ReactAriaButton>,
  )
}
