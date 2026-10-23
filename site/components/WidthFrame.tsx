import { useState, type CSSProperties, type ReactNode } from 'react'
import { DemoArea } from '@decocode/mezzanine'
import { ValuePicker } from './ExampleParts'

// The widths an example's frame can be set to, so a layout can be seen at each.
const frameWidths = [
  { label: '320px', value: '20rem' },
  { label: '480px', value: '30rem' },
  { label: '720px', value: '45rem' },
  { label: 'Full', value: '100%' },
] as const

export type FrameWidth = (typeof frameWidths)[number]['value']

// An example inside a dashed frame whose width can be chosen. When its content may stick out, the
// frame scrolls, and it is a named region that takes focus so keyboard users can scroll it too.
export function WidthFrame({ label, initialWidth = '45rem', canOverflow = false, children }: { label: string; initialWidth?: FrameWidth; canOverflow?: boolean; children: ReactNode }) {
  const [width, setWidth] = useState<FrameWidth>(initialWidth)
  return <>
    <ValuePicker label="Width" options={frameWidths} value={width} onChange={setWidth} />
    <div
      className="width-frame"
      style={{ '--_frame-width': width } as CSSProperties}
      {...(canOverflow ? { role: 'region', 'aria-label': `${label} frame`, tabIndex: 0 } : {})}
    >
      {children}
    </div>
  </>
}

// The frame inside a DemoArea, as the Layout pages use it: the theme bar, the CSS in a Code tab, and any
// controls in the end panel. The frame fills the demo, so readers resize the window to see the layout
// respond (owner's decision); width fixes a narrower frame when the example depends on one.
export function WidthDemo({ label, code, controls, width = '100%', canOverflow = false, children }: {
  label: string
  code: string
  controls?: ReactNode
  width?: FrameWidth
  canOverflow?: boolean
  children: ReactNode
}) {
  return (
    <DemoArea codeView={code} endPanel={controls}>
      <div
        className="width-frame"
        style={{ '--_frame-width': width } as CSSProperties}
        {...(canOverflow ? { role: 'region', 'aria-label': `${label} frame`, tabIndex: 0 } : {})}
      >
        {children}
      </div>
    </DemoArea>
  )
}
