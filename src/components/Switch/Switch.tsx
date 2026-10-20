import { composeRenderProps } from 'react-aria-components'
import {
  SwitchButton as ReactAriaSwitchButton,
  type SwitchButtonProps as ReactAriaSwitchButtonProps,
} from 'react-aria-components/Switch'

export interface SwitchButtonProps extends ReactAriaSwitchButtonProps {}

// The clickable part of a SwitchField: Mezzanine draws the track and handle before the label.
export function SwitchButton({ children, className, ...switchButtonProps }: SwitchButtonProps) {
  return (
    <ReactAriaSwitchButton
      {...switchButtonProps}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['react-aria-SwitchButton', resolvedClassName].filter(Boolean).join(' ')
      ))}
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

// SwitchField needs no wrapper: its default react-aria-SwitchField class carries the styles.
export { SwitchField } from 'react-aria-components/Switch'

export type {
  SwitchButtonRenderProps,
  SwitchFieldProps,
  SwitchFieldRenderProps,
} from 'react-aria-components/Switch'
