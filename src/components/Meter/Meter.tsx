import type { ReactNode } from 'react'
import {
  Meter as ReactAriaMeter,
  type MeterProps as ReactAriaMeterProps,
} from 'react-aria-components/Meter'
import { composeClassName } from '../composeClassName'
import { Label } from '../Label/Label'

export interface MeterProps extends Omit<ReactAriaMeterProps, 'children'> {
  // The visible label above the meter. Without one, give the meter an aria-label.
  label?: ReactNode
}

// React Aria owns the value and its announcement; Mezzanine draws the label, value text, track and fill,
// following React Aria's vanilla starter.
export function Meter({ label, ...props }: MeterProps) {
  return (
    <ReactAriaMeter {...props} className={composeClassName('mz-meter', props.className)}>
      {({ percentage, valueText }) => <>
        {label != null && <Label>{label}</Label>}
        <span className="mz-meter-value">{valueText}</span>
        <div className="mz-meter-track">
          <div className="mz-meter-fill" style={{ inlineSize: `${percentage}%` }} />
        </div>
      </>}
    </ReactAriaMeter>
  )
}

export type { MeterRenderProps } from 'react-aria-components/Meter'
