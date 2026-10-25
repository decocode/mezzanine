import { composeRenderProps } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import type { RefAttributes } from 'react'
import {
  SwitchButton as ReactAriaSwitchButton,
  SwitchField as ReactAriaSwitchField,
  type SwitchButtonProps as ReactAriaSwitchButtonProps,
  type SwitchFieldProps,
} from 'react-aria-components/Switch'

export interface SwitchButtonProps extends ReactAriaSwitchButtonProps {}

// The clickable part of a SwitchField: Mezzanine draws the track and handle before the label.
export function SwitchButton({ children, className, ...switchButtonProps }: SwitchButtonProps) {
  return (
    <ReactAriaSwitchButton
      {...switchButtonProps}
      className={composeClassName('mz-switch-button', className)}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          <span aria-hidden="true" className="mz-switch-track">
            <span className="mz-switch-handle" />
          </span>
          {resolvedChildren}
        </>
      ))}
    </ReactAriaSwitchButton>
  )
}

export function SwitchField(props: SwitchFieldProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaSwitchField {...props} className={composeClassName('mz-switch-field', props.className)} />
}

export type {
  SwitchButtonRenderProps,
  SwitchFieldProps,
  SwitchFieldRenderProps,
} from 'react-aria-components/Switch'
