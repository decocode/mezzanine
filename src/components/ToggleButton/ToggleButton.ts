import { createContext, createElement, useContext, type ReactNode, type Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import type { ButtonLabelPlacement, ButtonSize } from '../Button/Button'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'
import {
  ToggleButton as ReactAriaToggleButton,
  ToggleButtonGroup as ReactAriaToggleButtonGroup,
  type ToggleButtonProps as ReactAriaToggleButtonProps,
  type ToggleButtonGroupProps as ReactAriaToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup'

export interface ToggleButtonProps extends ReactAriaToggleButtonProps {
  variant?: 'secondary'
  size?: ButtonSize
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  // As on Button: where an icon toggle shows its label (its children).
  labelPlacement?: ButtonLabelPlacement
  tooltipPlacement?: TooltipProps['placement']
  ref?: Ref<HTMLButtonElement>
}

export interface ToggleButtonGroupProps extends ReactAriaToggleButtonGroupProps {
  variant?: 'secondary'
  size?: ButtonSize
  ref?: Ref<HTMLDivElement>
}

const ToggleButtonSizeContext = createContext<ButtonSize>('md')

// Appearance only: React Aria retains selection, render props, focus and keyboard behaviour.
export function ToggleButton({ variant, size, iconLeading, iconTrailing, labelPlacement, tooltipPlacement, children, ...props }: ToggleButtonProps) {
  const groupSize = useContext(ToggleButtonSizeContext)
  // A tooltip label is the accessible name; the button itself shows only its icon.
  const tooltipLabel = labelPlacement === 'tooltip' && typeof children === 'string' ? children : undefined
  const appearanceProps = {
    ...props,
    ...(tooltipLabel !== undefined && { 'aria-label': props['aria-label'] ?? tooltipLabel }),
    'data-variant': variant,
    'data-size': size ?? groupSize,
    'data-icon-only': (labelPlacement === 'tooltip' || (children == null && (iconLeading != null || iconTrailing != null))) || undefined,
    'data-label-placement': labelPlacement === 'below' || labelPlacement === 'above' ? labelPlacement : undefined,
    children: composeRenderProps(children, content => createElement('span', { className: 'mezzanine-button-content' },
      iconLeading != null && createElement('span', { className: 'mezzanine-button-icon', 'aria-hidden': true }, iconLeading),
      tooltipLabel === undefined && content,
      iconTrailing != null && createElement('span', { className: 'mezzanine-button-icon', 'aria-hidden': true }, iconTrailing),
    )),
  }
  const toggle = createElement(ReactAriaToggleButton, appearanceProps)
  return tooltipLabel === undefined ? toggle : createElement(TooltipTrigger, null, toggle, createElement(Tooltip, { placement: tooltipPlacement }, tooltipLabel))
}

export function ToggleButtonGroup({ variant, size = 'md', ...props }: ToggleButtonGroupProps) {
  const appearanceProps = { ...props, 'data-variant': variant }
  return createElement(ToggleButtonSizeContext.Provider, { value: size },
    createElement(ReactAriaToggleButtonGroup, appearanceProps),
  )
}

export type {
  ToggleButtonGroupRenderProps,
  ToggleButtonRenderProps,
} from 'react-aria-components/ToggleButtonGroup'
