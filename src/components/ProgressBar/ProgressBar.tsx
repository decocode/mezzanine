import type { ReactNode } from 'react'
import {
  ProgressBar as ReactAriaProgressBar,
  type ProgressBarProps as ReactAriaProgressBarProps,
} from 'react-aria-components/ProgressBar'
import { Label } from 'react-aria-components/Label'

export interface ProgressBarProps extends Omit<ReactAriaProgressBarProps, 'children'> {
  // The visible label above the bar. Without one, give the bar an aria-label.
  label?: ReactNode
}

// React Aria owns the value and its announcement; Mezzanine draws the label, value text, track and fill,
// following React Aria's vanilla starter.
export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <ReactAriaProgressBar {...props}>
      {({ percentage, valueText, isIndeterminate }) => <>
        {label != null && <Label>{label}</Label>}
        {!isIndeterminate && <span className="mz-progress-bar-value">{valueText}</span>}
        <div className="mz-progress-bar-track">
          <div className="mz-progress-bar-fill" style={isIndeterminate ? undefined : { inlineSize: `${percentage}%` }} />
        </div>
      </>}
    </ReactAriaProgressBar>
  )
}

export type { ProgressBarRenderProps } from 'react-aria-components/ProgressBar'
