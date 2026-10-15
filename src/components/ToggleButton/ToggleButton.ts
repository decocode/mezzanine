import { createContext, createElement, useContext, type ReactNode, type Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import type { ButtonSize } from '../Button/Button'
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
  ref?: Ref<HTMLButtonElement>
}

export interface ToggleButtonGroupProps extends ReactAriaToggleButtonGroupProps {
  variant?: 'secondary'
  size?: ButtonSize
  ref?: Ref<HTMLDivElement>
}

const ToggleButtonSizeContext = createContext<ButtonSize>('md')

// Appearance only: React Aria retains selection, render props, focus and keyboard behaviour.
export function ToggleButton({ variant, size, iconLeading, iconTrailing, children, ...props }: ToggleButtonProps) {
  const groupSize = useContext(ToggleButtonSizeContext)
  const appearanceProps = {
    ...props,
    'data-variant': variant,
    'data-size': size ?? groupSize,
    'data-icon-only': (children == null && (iconLeading != null || iconTrailing != null)) || undefined,
    children: composeRenderProps(children, content => createElement('span', { className: 'mezzanine-button-content' },
      iconLeading != null && createElement('span', { className: 'mezzanine-button-icon', 'aria-hidden': true }, iconLeading),
      content,
      iconTrailing != null && createElement('span', { className: 'mezzanine-button-icon', 'aria-hidden': true }, iconTrailing),
    )),
  }
  return createElement(ReactAriaToggleButton, appearanceProps)
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
