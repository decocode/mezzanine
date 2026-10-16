import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { Badge, CodeBlock, Heading, Label, Text, ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components/Slider'
import { framePresets, labBadgeLabel, type CssNote } from './layoutLabContent'
import { splitInlineCode } from './layoutLabLogic'

// A frame whose width you set with a slider or presets. Its contents are a size container. When the demo
// is meant to stick out of the frame, the frame is a named region that takes focus, so keyboard users can scroll it.
export function DemoFrame({ label, initialWidth = 720, canOverflow = false, children }: { label: string; initialWidth?: number; canOverflow?: boolean; children: ReactNode }) {
  const [width, setWidth] = useState(initialWidth)
  return <div className="lab-frame">
    {/* The group's name tells screen reader users which example this "Width" slider belongs to. */}
    <div className="lab-frame-controls" role="group" aria-label={`Size of “${label}”`}>
      {/* React Aria's Slider, used directly because Mezzanine has no Slider yet, and styled after React Aria's own example rather than as a Mezzanine component. */}
      <Slider className="lab-slider" minValue={320} maxValue={1200} step={10} value={width} onChange={setWidth}>
        <Label className="mz-text-label-md">Width</Label>
        <SliderOutput className="mz-text-label-md">{({ state }) => `${state.getThumbValue(0)}px`}</SliderOutput>
        <SliderTrack className="lab-slider-track">
          <SliderFill className="lab-slider-fill" />
          <SliderThumb className="lab-slider-thumb" />
        </SliderTrack>
      </Slider>
      {/* The preset matching the current width shows as selected; none does after a slider drag between presets. */}
      <ToggleButtonGroup
        size="sm"
        variant="secondary"
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

// A heading for one demo inside a section's "Examples" part.
export function DemoHeading({ children }: { children: ReactNode }) {
  return <Heading level={3} className="lab-demo-heading mz-text-heading-sm">{children}</Heading>
}

// The explanation that goes with a demo.
export function DemoText({ children }: { children: ReactNode }) {
  return <Text elementType="p" className="lab-demo-text mz-text-body-md">{children}</Text>
}

// The explanation of the CSS behind one example, with the rules themselves
// (or, when marked, example rules for an app).
export function CssNotesBody({ note }: { note: CssNote }) {
  return <div className="lab-css-notes-body">
    {note.isExample && <Text elementType="p" className="mz-text-body-md">This is example CSS for an app. The demo above doesn’t use it.</Text>}
    {note.paragraphs.map((paragraph) => <Text key={paragraph} elementType="p" className="mz-text-body-md">
      {splitInlineCode(paragraph).map(({ part, isCode }, index) => isCode ? <code key={index}>{part}</code> : part)}
    </Text>)}
    <CodeBlock>{note.code}</CodeBlock>
  </div>
}

// The same explanation under its own heading: level 4 under an example's heading, level 3 on a
// stage page with a single example, or level 2 on a page with a single example and no halves.
export function CssNotes({ name, note, level = 4 }: { name: string; note: CssNote; level?: 2 | 3 | 4 }) {
  const className = level === 2 ? 'lab-section-heading mz-text-heading-md' : level === 3 ? 'lab-section-heading mz-text-heading-sm' : 'mz-text-title-md'
  return <div className="lab-css-notes">
    <Heading level={level} className={className}>The CSS behind {name}</Heading>
    <CssNotesBody note={note} />
  </div>
}

// An emerging feature's status: Lab, then whether this browser supports it.
export function FeatureStatus({ supported }: { supported: boolean }) {
  return <p className="lab-feature-status">
    <Badge variant="warning">{labBadgeLabel}</Badge>
    {supported
      ? <Badge variant="success">Active in this browser</Badge>
      : <Badge variant="neutral">Not in this browser</Badge>}
  </p>
}

// Buttons that choose one CSS value for a demo, such as overflow: hidden, with a visible label.
export function ValuePicker<Value extends string>({ label, options, value, onChange }: { label: string; options: readonly { label: string; value: Value }[]; value: Value; onChange: (value: Value) => void }) {
  const labelId = useId()
  return <div className="lab-picker">
    <span id={labelId} className="mz-text-label-md">{label}</span>
    <ToggleButtonGroup
      size="sm"
      variant="secondary"
      aria-labelledby={labelId}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={(keys) => { const option = options.find((item) => keys.has(item.value)); if (option) onChange(option.value) }}
    >
      {options.map((option) => <ToggleButton key={option.value} id={option.value}>{option.label}</ToggleButton>)}
    </ToggleButtonGroup>
  </div>
}
