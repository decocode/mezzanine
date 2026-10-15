import { useState, type CSSProperties, type ReactNode } from 'react'
import { Badge, CodeBlock, Disclosure, DisclosureHeader, DisclosurePanel, Heading, Label, Text, ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components/Slider'
import { framePresets, type CssNote, type LabSection } from './layoutLabContent'
import { splitInlineCode } from './layoutLabLogic'

// Marks a Lab-only component: a Warning-coloured dashed outline with a Lab badge and its name.
export function LabOnly({ name, children }: { name: string; children: ReactNode }) {
  return <div className="lab-only">
    <p className="lab-only-label mz-text-label-sm"><Badge variant="warning">Lab</Badge> <code>{name}</code></p>
    <div className="lab-only-body">{children}</div>
  </div>
}

// A frame whose width you set with a slider or presets. Its contents are a size container.
export function DemoFrame({ label, initialWidth = 720, children }: { label: string; initialWidth?: number; children: ReactNode }) {
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
    <div className="lab-frame-stage" style={{ '--lab-frame-width': `${width}px` } as CSSProperties}>
      {children}
    </div>
  </div>
}

// The page heading and an introduction (what it is, then why it matters), then browser
// support under its own heading, then the "Examples" heading that the demos sit under.
export function LabSectionIntro({ section }: { section: LabSection }) {
  return <>
    <Heading id={section.id} level={1} className="mz-text-heading-lg">{section.title}</Heading>
    <div className="lab-explainer">
      <Text elementType="p" className="mz-text-body-md">{section.what}</Text>
      <Text elementType="p" className="mz-text-body-md">{section.why}</Text>
      <Heading level={2} className="mz-text-heading-md">Browser support</Heading>
      <Text elementType="p" className="mz-text-body-md">{section.support}</Text>
    </div>
    <Heading level={2} className="mz-text-heading-md">Examples</Heading>
  </>
}

// A heading for one demo inside a section's "Examples" part.
export function DemoHeading({ children }: { children: ReactNode }) {
  return <Heading level={3} className="lab-demo-heading mz-text-heading-sm">{children}</Heading>
}

// The explanation that goes with a demo.
export function DemoText({ children }: { children: ReactNode }) {
  return <Text elementType="p" className="lab-demo-text mz-text-body-md">{children}</Text>
}

// A closed-by-default explanation of the CSS behind one example, with the rules themselves
// (or, when marked, example rules for an app).
// level is 4 under an example heading, or 3 on a page whose demo has no heading of its own.
export function CssNotes({ name, note, level = 4 }: { name: string; note: CssNote; level?: 3 | 4 }) {
  return <Disclosure className="lab-css-notes">
    <DisclosureHeader level={level}>The CSS behind {name}</DisclosureHeader>
    <DisclosurePanel>
      <div className="lab-css-notes-body">
        {note.isExample && <Text elementType="p" className="mz-text-body-md">This is example CSS for an app. The demo above doesn’t use it.</Text>}
        {note.paragraphs.map((paragraph) => <Text key={paragraph} elementType="p" className="mz-text-body-md">
          {splitInlineCode(paragraph).map(({ part, isCode }, index) => isCode ? <code key={index}>{part}</code> : part)}
        </Text>)}
        <CodeBlock>{note.code}</CodeBlock>
      </div>
    </DisclosurePanel>
  </Disclosure>
}

// Says whether this browser supports a wild-card feature.
export function SupportBadge({ supported }: { supported: boolean }) {
  return supported
    ? <Badge variant="success">Active in this browser</Badge>
    : <Badge variant="neutral">Not in this browser</Badge>
}
