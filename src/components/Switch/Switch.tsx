import type { ReactNode } from 'react'
import { composeRenderProps, type ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  SwitchButton as ReactAriaSwitchButton,
  SwitchField as ReactAriaSwitchField,
  type SwitchButtonProps,
  type SwitchFieldProps,
} from 'react-aria-components/Switch'
import { FieldError } from '../FieldError/FieldError'
import { Text } from '../Text/Text'

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  // The label beside the switch.
  children?: SwitchButtonProps['children']
  // Help text, under the label and lined up with it.
  description?: ReactNode
  // The message shown above the switch when it's invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
}

// A switch, following React Aria's starter Switch. Mezzanine draws any error above the switch, so it's
// read before the choice, then the track and handle with the label, then any help text under the label.
export function Switch({ children, description, errorMessage, ...props }: SwitchProps) {
  return (
    <ReactAriaSwitchField {...props} className={composeClassName('mz-switch-field', props.className)}>
      <FieldError>{errorMessage}</FieldError>
      <ReactAriaSwitchButton className="mz-switch-button">
        {composeRenderProps(children, (resolvedChildren) => (
          <>
            <span aria-hidden="true" className="mz-switch-track">
              <span className="mz-switch-handle" />
            </span>
            {resolvedChildren}
          </>
        ))}
      </ReactAriaSwitchButton>
      {description != null && <Text slot="description">{description}</Text>}
    </ReactAriaSwitchField>
  )
}

export type { SwitchFieldRenderProps } from 'react-aria-components/Switch'
