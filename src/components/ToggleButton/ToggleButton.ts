import { createContext, createElement, useContext, type ReactNode, type Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import type { ButtonLabelProps, ButtonSize } from '../Button/Button'
import { composeClassName } from '../composeClassName'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'
import {
  ToggleButton as ReactAriaToggleButton,
  ToggleButtonGroup as ReactAriaToggleButtonGroup,
  type ToggleButtonProps as ReactAriaToggleButtonProps,
  type ToggleButtonGroupProps as ReactAriaToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup'

interface ToggleButtonAppearanceProps extends ReactAriaToggleButtonProps {
  // Primary, the default, fills a selected toggle; secondary has an outline; tertiary has none until
  // it's hovered or selected, as on Button.
  hierarchy?: 'primary' | 'secondary' | 'tertiary'
  size?: ButtonSize
  icon?: ReactNode
  tooltipPosition?: TooltipProps['placement']
  ref?: Ref<HTMLButtonElement>
}

// As on Button: where the icon sits, and where an icon toggle shows its label (its children), which
// must be plain text in a tooltip.
export type ToggleButtonProps = ToggleButtonAppearanceProps & ButtonLabelProps

export interface ToggleButtonGroupProps extends ReactAriaToggleButtonGroupProps {
  // Sets every toggle in the group: primary fills the selected one, secondary outlines them all, and
  // tertiary has no outline until a toggle is hovered or selected.
  hierarchy?: 'primary' | 'secondary' | 'tertiary'
  size?: ButtonSize
  ref?: Ref<HTMLDivElement>
}

const ToggleButtonSizeContext = createContext<ButtonSize>('md')

// Appearance only: React Aria retains selection, render props, focus and keyboard behaviour.
export function ToggleButton({ hierarchy, size, icon, iconPosition = 'leading', labelPosition, tooltipPosition, children, ...props }: ToggleButtonProps) {
  const groupSize = useContext(ToggleButtonSizeContext)
  // A tooltip label is the accessible name; the button itself shows only its icon.
  const isIconButton = icon != null && iconPosition === 'iconOnly'
  const outsideLabel = isIconButton && labelPosition !== undefined && labelPosition !== 'tooltip' ? labelPosition : undefined
  const tooltipLabel = isIconButton && outsideLabel === undefined && typeof children === 'string' ? children : undefined
  const isLabelOutside = outsideLabel !== undefined
  const iconPart = icon != null && createElement('span', { className: 'mz-button-icon', 'aria-hidden': true }, icon)
  const leading = iconPosition !== 'trailing' && iconPart
  const trailing = iconPosition === 'trailing' && iconPart
  const appearanceProps = {
    ...props,
    className: composeClassName('mz-toggle-button', props.className),
    ...(tooltipLabel !== undefined && { 'aria-label': props['aria-label'] ?? tooltipLabel }),
    'data-variant': hierarchy,
    'data-size': size ?? groupSize,
    'data-icon-only': (tooltipLabel !== undefined || (children == null && icon != null)) || undefined,
    'data-label-position': outsideLabel,
    // As on Button: with the label at the top or bottom, the icon sits in the box and the label outside it.
    children: composeRenderProps(children, content => isLabelOutside
      ? createElement('span', { className: 'mz-button-content' }, createElement('span', { className: 'mz-button-icon-box' }, leading, trailing), content)
      : createElement('span', { className: 'mz-button-content' }, leading, tooltipLabel === undefined && content, trailing)),
  }
  const toggle = createElement(ReactAriaToggleButton, appearanceProps)
  return tooltipLabel === undefined ? toggle : createElement(TooltipTrigger, null, toggle, createElement(Tooltip, { placement: tooltipPosition }, tooltipLabel))
}

export function ToggleButtonGroup({ hierarchy = 'primary', size = 'md', ...props }: ToggleButtonGroupProps) {
  const appearanceProps = { ...props, className: composeClassName('mz-toggle-button-group', props.className), 'data-variant': hierarchy }
  return createElement(ToggleButtonSizeContext.Provider, { value: size },
    createElement(ReactAriaToggleButtonGroup, appearanceProps),
  )
}

export type {
  ToggleButtonGroupRenderProps,
  ToggleButtonRenderProps,
} from 'react-aria-components/ToggleButtonGroup'
