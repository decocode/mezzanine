import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  Badge, Heading, Slider,
  ToggleButton, ToggleButtonGroup,
} from '@decocode/mezzanine'
import { framePresets, labBadgeLabel } from './labValues'

// A frame whose width you set with a slider or presets. Its contents are a size container. When the example
// is meant to stick out of the frame, the frame is a named region that takes focus, so keyboard users can scroll it.
export function ExampleFrame({ label, initialWidth = 720, canOverflow = false, children }: { label: string; initialWidth?: number; canOverflow?: boolean; children: ReactNode }) {
  const [width, setWidth] = useState(initialWidth)
  return <div className="lab-frame">
    {/* The group's name tells screen reader users which example this "Width" slider belongs to. */}
    <div className="lab-frame-controls" role="group" aria-label={`Size of “${label}”`}>
      <Slider className="lab-slider" label="Width" minValue={320} maxValue={1200} step={10} value={width} onChange={setWidth} />
      {/* The preset matching the current width shows as selected; none does after a slider drag between presets. */}
      <ToggleButtonGroup
        size="sm"
        hierarchy="secondary"
        aria-label="Preset widths"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={framePresets.filter((preset) => preset.width === width).map((preset) => preset.label)}
        onSelectionChange={(keys) => { const preset = framePresets.find((item) => keys.has(item.label)); if (preset) setWidth(preset.width) }}
      >
        {framePresets.map((preset) => <ToggleButton key={preset.label} id={preset.label}>{preset.label}</ToggleButton>)}
      </ToggleButtonGroup>
    </div>
    <div className="lab-frame-stage" style={{ '--lab-frame-width': `${width}px` } as CSSProperties} {...(canOverflow ? { role: 'region', 'aria-label': `“${label}” frame`, tabIndex: 0 } : {})}>
      {children}
    </div>
  </div>
}

// A heading for one example inside a section's "Examples" part.
export function ExampleHeading({ children }: { children: ReactNode }) {
  return <Heading level={3} className="lab-example-heading mz-text-heading-sm">{children}</Heading>
}

// The explanation, CSS notes and value picker are shared with the docs, which use them on promoted pages.
export { CssNotes, CssNotesBody, ExampleText, ValuePicker } from '../../components/ExampleParts'

// An emerging feature's status: Lab, then whether this browser supports it.
export function FeatureStatus({ supported }: { supported: boolean }) {
  return <p className="lab-feature-status">
    <Badge variant="warning">{labBadgeLabel}</Badge>
    {supported
      ? <Badge variant="success">Active in this browser</Badge>
      : <Badge variant="neutral">Not in this browser</Badge>}
  </p>
}
