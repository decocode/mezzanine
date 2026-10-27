import type { ReactNode } from 'react'
import { SwitchButton, SwitchField, type SwitchFieldProps } from '@decocode/mezzanine'

// A true/false control in a DemoBlock's Properties panel. Each one changes the demo straight away, so
// it's a switch rather than a checkbox.
export function PanelSwitch({ children, ...props }: Omit<SwitchFieldProps, 'children'> & { children: ReactNode }) {
  return <SwitchField {...props}><SwitchButton>{children}</SwitchButton></SwitchField>
}
