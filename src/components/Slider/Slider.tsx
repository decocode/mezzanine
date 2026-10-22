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
}

// React Aria owns dragging, keyboard and announcements; Mezzanine draws the label, output, rail, fill
// and one thumb per value, following React Aria's vanilla starter.
export function Slider<T extends number | number[]>({ label, thumbLabels, fillOffset, ...props }: SliderProps<T>) {
  return (
    <ReactAriaSlider {...props}>
      {label != null && <Label>{label}</Label>}
      <SliderOutput />
      <SliderTrack>
        {({ state }) => <>
          <div className="mz-slider-rail">
            <SliderFill offset={fillOffset} />
          </div>
          {state.values.map((_, index) => <SliderThumb key={index} index={index} aria-label={thumbLabels?.[index]} />)}
        </>}
      </SliderTrack>
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
