import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

export const sliderContent: DocsPageContent = {
  id: 'slider',
  kind: 'component',
  title: 'Slider',
  description: 'A slider picks a number, or a range, from a track by dragging a thumb or using the arrow keys.',
  sections: [
    { key: 'example', intro: ['`Slider` shows a `label`, the current value and a thumb on a filled track. An array `defaultValue` gives one thumb for each value, for a range, and `thumbLabels` names each thumb.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Slider anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Slider', description: 'Holds the value. Mezzanine draws the label, output, rail, fill and thumbs inside it.' },
          { name: 'Label', description: 'The visible label, from the `label` prop.' },
          { name: 'SliderOutput', description: 'Shows the current value.' },
          { name: 'SliderTrack', description: 'The area the thumbs move along. It is as tall as a small target.' },
          { name: 'SliderFill', description: 'The filled part of the rail, from `fillOffset` to the value.' },
          { name: 'SliderThumb', description: 'One draggable handle for each value.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Set `defaultValue`, or `value` with `onChange`. `minValue`, `maxValue` and `step` set the range. An array value makes a range with one thumb for each value; name each with `thumbLabels`. `formatOptions` sets a number format; when none fits, `formatValue` words each value instead, for the output and for screen readers.',
        '`orientation="vertical"` stands the slider upright and hides its label and output, so give it an `aria-label`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab focuses each thumb; the arrow keys change its value by one step, Page Up and Page Down by larger steps, and Home and End jump to the ends. Screen readers announce each thumb as a slider with its label and value.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Slider pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Slider'),
      },
    },
  ],
  relatedPages: [
    { label: 'Switch', href: '/switch' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Slider', href: 'https://react-aria.adobe.com/Slider' },
  ],
}

// The Example's label, and the Properties panel's choices, in panel order. A range value names its
// two thumbs, and the fill offset and value format are on or off.
export const sliderExample = {
  label: 'Slider A',
  rangeThumbLabels: ['Minimum', 'Maximum'],
  defaultValueLabel: 'defaultValue',
  orientationLabel: 'orientation',
  fillOffset: 50,
} as const
export const sliderDefaultValues = { '40': 40, '[20, 70]': [20, 70] } as const
export const sliderOrientations = ['horizontal', 'vertical'] as const
export const sliderFlags = ['fillOffset', 'formatValue', 'isDisabled'] as const

// A vertical slider hides its label, so the code names it with aria-label instead.
export function sliderExampleCode({ defaultValue, orientation, fillOffset, formatValue, isDisabled }: {
  defaultValue: number | readonly number[]
  orientation: (typeof sliderOrientations)[number]
  fillOffset: boolean
  formatValue: boolean
  isDisabled: boolean
}) {
  const isVertical = orientation === 'vertical'
  return `<Slider${formatJsxProps({
    label: isVertical ? undefined : sliderExample.label,
    'aria-label': isVertical ? sliderExample.label : undefined,
    defaultValue,
    thumbLabels: Array.isArray(defaultValue) ? sliderExample.rangeThumbLabels : undefined,
    orientation: isVertical ? orientation : undefined,
    fillOffset: fillOffset ? sliderExample.fillOffset : undefined,
  })}${formatValue ? ' formatValue={(value) => `${value}%`}' : ''}${isDisabled ? ' isDisabled' : ''} />`
}
