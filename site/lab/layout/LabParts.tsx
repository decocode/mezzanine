import { useState, type CSSProperties, type ReactNode } from 'react'
import { Badge, Button, CodeBlock, Disclosure, DisclosureHeader, DisclosurePanel, Heading, Text } from '@decocode/mezzanine'
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
  const sliderId = `${label.replace(/\W+/g, '-').toLowerCase()}-width`
  return <div className="lab-frame">
    {/* The group's name tells screen reader users which example this "Width" slider belongs to. */}
    <div className="lab-frame-controls" role="group" aria-label={`Size of “${label}”`}>
      <label className="mz-text-label-md" htmlFor={sliderId}>Width: <output htmlFor={sliderId}>{width}px</output></label>
      <input id={sliderId} type="range" min={320} max={1200} step={10} value={width} onChange={(event) => setWidth(Number(event.target.value))} />
      <div className="lab-frame-presets">
        {framePresets.map((preset) => <Button key={preset.label} size="sm" variant="tertiary" onPress={() => setWidth(preset.width)}>{preset.label}</Button>)}
      </div>
    </div>
    <div className="lab-frame-stage" style={{ '--lab-frame-width': `${width}px` } as CSSProperties}>
      {children}
    </div>
  </div>
}

// The section heading, then the three plain-English parts every section opens with, each
// under its own heading, then the "Try it" heading that the demos sit under.
export function LabSectionIntro({ section }: { section: LabSection }) {
  return <>
    <Heading id={section.id} level={2} className="mz-text-heading-md">{section.title}</Heading>
    <div className="lab-explainer">
      <Heading level={3} className="mz-text-heading-sm">What it is</Heading>
      <Text elementType="p" className="mz-text-body-md">{section.what}</Text>
      <Heading level={3} className="mz-text-heading-sm">Why it matters</Heading>
      <Text elementType="p" className="mz-text-body-md">{section.why}</Text>
      <Heading level={3} className="mz-text-heading-sm">Browser support</Heading>
      <Text elementType="p" className="mz-text-body-md">{section.support}</Text>
    </div>
    <Heading level={3} className="mz-text-heading-sm">Try it</Heading>
  </>
}

// A heading for one demo inside a section's "Try it" part.
export function DemoHeading({ children }: { children: ReactNode }) {
  return <Heading level={4} className="lab-demo-heading mz-text-title-md">{children}</Heading>
}

// The explanation that goes with a demo.
export function DemoText({ children }: { children: ReactNode }) {
  return <Text elementType="p" className="lab-demo-text mz-text-body-md">{children}</Text>
}

// A closed-by-default explanation of the CSS behind one example, with the rules themselves.
export function CssNotes({ name, note }: { name: string; note: CssNote }) {
  return <Disclosure className="lab-css-notes">
    <DisclosureHeader level={5}>The CSS behind {name}</DisclosureHeader>
    <DisclosurePanel>
      <div className="lab-css-notes-body">
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
