import type { ReactNode, RefAttributes } from 'react'
import {
  Slider as ReactAriaSlider,
  SliderFill as ReactAriaSliderFill,
  SliderOutput as ReactAriaSliderOutput,
  SliderThumb as ReactAriaSliderThumb,
  SliderTrack as ReactAriaSliderTrack,
  type SliderFillProps,
  type SliderOutputProps,
  type SliderProps as ReactAriaSliderProps,
  type SliderThumbProps,
  type SliderTrackProps,
} from 'react-aria-components/Slider'
import { composeClassName } from '../composeClassName'
import { Label } from '../Label/Label'

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
    <ReactAriaSlider {...props} className={composeClassName('mz-slider', props.className)}>
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

export function SliderOutput(props: SliderOutputProps & RefAttributes<HTMLOutputElement>) {
  return <ReactAriaSliderOutput {...props} className={composeClassName('mz-slider-output', props.className)} />
}

export function SliderTrack(props: SliderTrackProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaSliderTrack {...props} className={composeClassName('mz-slider-track', props.className)} />
}

export function SliderFill(props: SliderFillProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaSliderFill {...props} className={composeClassName('mz-slider-fill', props.className)} />
}

export function SliderThumb(props: SliderThumbProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaSliderThumb {...props} className={composeClassName('mz-slider-thumb', props.className)} />
}

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
