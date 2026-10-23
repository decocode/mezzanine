import type { ReactNode } from 'react'
import {
  Slider as ReactAriaSlider,
  SliderFill,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  type SliderProps as ReactAriaSliderProps,
} from 'react-aria-components/Slider'
import { Label } from 'react-aria-components/Label'

export interface SliderProps<T extends number | number[]> extends Omit<ReactAriaSliderProps<T>, 'children'> {
  // The visible label. Without one, give the slider an aria-label.
  label?: ReactNode
  // Accessible names for each thumb, such as "Minimum" and "Maximum" in a range.
  thumbLabels?: string[]
  // Where the fill starts, as a value. Defaults to the minimum.
  fillOffset?: number
  // Words each value, for the output and for screen readers, when a number format can't, such as
  // "100%" for a zoom stored on a logarithmic scale. A range joins its two values with a dash.
  formatValue?: (value: number) => string
}

// React Aria owns dragging, keyboard and announcements; Mezzanine draws the label, output, rail, fill
// and one thumb per value, following React Aria's vanilla starter.
export function Slider<T extends number | number[]>({ label, thumbLabels, fillOffset, formatValue, ...props }: SliderProps<T>) {
  return (
    <ReactAriaSlider {...props}>
      {({ state }) => {
        const parts = <>
          {label != null && <Label>{label}</Label>}
          <SliderOutput />
          <SliderTrack>
            {({ state: trackState }) => <>
              <div className="mz-slider-rail">
                <SliderFill offset={fillOffset} />
              </div>
              {trackState.values.map((_, index) => <SliderThumb key={index} index={index} aria-label={thumbLabels?.[index]} />)}
            </>}
          </SliderTrack>
        </>
        // The output and each thumb read their wording from the slider's state. React Aria finds its
        // slider by that exact object, so formatValue is set on it rather than on a copy; React Aria
        // makes a fresh state on every render, so nothing carries over.
        if (formatValue) {
          state.getFormattedValue = (value = state.values) => (Array.isArray(value) ? value : [value]).map(formatValue).join(' – ')
          state.getThumbValueLabel = (index) => formatValue(state.getThumbValue(index))
        }
        return parts
      }}
    </ReactAriaSlider>
  )
}

export { SliderFill, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components/Slider'

export type {
  SliderFillProps,
  SliderFillRenderProps,
  SliderOutputProps,
  SliderRenderProps,
  SliderThumbProps,
  SliderThumbRenderProps,
  SliderTrackProps,
  SliderTrackRenderProps,
} from 'react-aria-components/Slider'
