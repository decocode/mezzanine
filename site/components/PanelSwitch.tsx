import { Switch, type SwitchProps } from '@decocode/mezzanine'

// A true/false control in a DemoBlock's Properties panel. Each one changes the demo straight away, so
// it's a switch rather than a checkbox. An optional description under it explains, for example, why it's
// disabled.
export function PanelSwitch(props: Omit<SwitchProps, 'errorMessage'> & { description?: string }) {
  return <Switch {...props} />
}
