import type { ReactNode } from 'react'
import { SwitchButton, SwitchField, Text, type SwitchFieldProps } from '@decocode/mezzanine'

// A true/false control in a DemoBlock's Properties panel. Each one changes the demo straight away, so
// it's a switch rather than a checkbox. An optional description under it explains, for example, why it's
// disabled.
export function PanelSwitch({ children, description, ...props }: Omit<SwitchFieldProps, 'children'> & { children: ReactNode; description?: string }) {
  return <SwitchField {...props}><SwitchButton>{children}</SwitchButton>{description !== undefined && <Text slot="description">{description}</Text>}</SwitchField>
}
