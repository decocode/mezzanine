import { createContext, createElement, useContext, type ReactNode, type Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import type { ButtonLabelProps, ButtonSize } from '../Button/Button'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'
import {
  ToggleButton as ReactAriaToggleButton,
  ToggleButtonGroup as ReactAriaToggleButtonGroup,
  type ToggleButtonProps as ReactAriaToggleButtonProps,
  type ToggleButtonGroupProps as ReactAriaToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup'

interface ToggleButtonAppearanceProps extends ReactAriaToggleButtonProps {
  // Secondary has an outline; tertiary has none until it's hovered or selected, as on Button.
  hierarchy?: 'secondary' | 'tertiary'
  size?: ButtonSize
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  tooltipPlacement?: TooltipProps['placement']
  ref?: Ref<HTMLButtonElement>
}

// As on Button: where an icon toggle shows its label (its children), which must be plain text in a tooltip.
export type ToggleButtonProps = ToggleButtonAppearanceProps & ButtonLabelProps

export interface ToggleButtonGroupProps extends ReactAriaToggleButtonGroupProps {
  hierarchy?: 'secondary'
  size?: ButtonSize
  ref?: Ref<HTMLDivElement>
}

const ToggleButtonSizeContext = createContext<ButtonSize>('md')

// Appearance only: React Aria retains selection, render props, focus and keyboard behaviour.
export function ToggleButton({ hierarchy, size, iconLeading, iconTrailing, labelPlacement, tooltipPlacement, children, ...props }: ToggleButtonProps) {
  const groupSize = useContext(ToggleButtonSizeContext)
  // A tooltip label is the accessible name; the button itself shows only its icon.
  const tooltipLabel = labelPlacement === 'tooltip' && typeof children === 'string' ? children : undefined
  const isLabelOutside = labelPlacement === 'below' || labelPlacement === 'above'
  const leading = iconLeading != null && createElement('span', { className: 'mz-button-icon', 'aria-hidden': true }, iconLeading)
  const trailing = iconTrailing != null && createElement('span', { className: 'mz-button-icon', 'aria-hidden': true }, iconTrailing)
  const appearanceProps = {
    ...props,
    ...(tooltipLabel !== undefined && { 'aria-label': props['aria-label'] ?? tooltipLabel }),
    'data-variant': hierarchy,
    'data-size': size ?? groupSize,
    'data-icon-only': (labelPlacement === 'tooltip' || (children == null && (iconLeading != null || iconTrailing != null))) || undefined,
    'data-label-placement': isLabelOutside ? labelPlacement : undefined,
    // As on Button: with the label below or above, the icon sits in the box and the label outside it.
    children: composeRenderProps(children, content => isLabelOutside
      ? createElement('span', { className: 'mz-button-content' }, createElement('span', { className: 'mz-button-icon-box' }, leading, trailing), content)
      : createElement('span', { className: 'mz-button-content' }, leading, tooltipLabel === undefined && content, trailing)),
  }
  const toggle = createElement(ReactAriaToggleButton, appearanceProps)
  return tooltipLabel === undefined ? toggle : createElement(TooltipTrigger, null, toggle, createElement(Tooltip, { placement: tooltipPlacement }, tooltipLabel))
}

export function ToggleButtonGroup({ hierarchy, size = 'md', ...props }: ToggleButtonGroupProps) {
  const appearanceProps = { ...props, 'data-variant': hierarchy }
  return createElement(ToggleButtonSizeContext.Provider, { value: size },
    createElement(ReactAriaToggleButtonGroup, appearanceProps),
  )
}

export type {
  ToggleButtonGroupRenderProps,
  ToggleButtonRenderProps,
} from 'react-aria-components/ToggleButtonGroup'
