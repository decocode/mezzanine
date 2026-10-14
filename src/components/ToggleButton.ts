import { createElement, type Ref } from 'react'
import {
  ToggleButton as ReactAriaToggleButton,
  ToggleButtonGroup as ReactAriaToggleButtonGroup,
  type ToggleButtonProps as ReactAriaToggleButtonProps,
  type ToggleButtonGroupProps as ReactAriaToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup'

export interface ToggleButtonProps extends ReactAriaToggleButtonProps {
  variant?: 'secondary'
  ref?: Ref<HTMLButtonElement>
}

export interface ToggleButtonGroupProps extends ReactAriaToggleButtonGroupProps {
  variant?: 'secondary'
  ref?: Ref<HTMLDivElement>
}

// Appearance only: React Aria retains selection, render props, focus and keyboard behaviour.
export function ToggleButton({ variant, ...props }: ToggleButtonProps) {
  const appearanceProps = { ...props, 'data-variant': variant }
  return createElement(ReactAriaToggleButton, appearanceProps)
}

export function ToggleButtonGroup({ variant, ...props }: ToggleButtonGroupProps) {
  const appearanceProps = { ...props, 'data-variant': variant }
  return createElement(ReactAriaToggleButtonGroup, appearanceProps)
}

export type {
  ToggleButtonGroupRenderProps,
  ToggleButtonRenderProps,
} from 'react-aria-components/ToggleButtonGroup'
