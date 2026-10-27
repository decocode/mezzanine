import type { CSSProperties, ReactNode } from 'react'
import { DemoBlock } from '@decocode/mezzanine'

// The widths an example's frame can be fixed at, when the example depends on a narrower frame.
export type FrameWidth = '20rem' | '30rem' | '45rem' | '100%'

// The frame inside a DemoBlock, as the Layout pages use it: the theme bar, the CSS in a Code tab, and any
// controls in the end panel. The frame fills the demo, so readers resize the window to see the layout
// respond (owner's decision); width fixes a narrower frame when the example depends on one.
export function WidthDemo({ label, code, controls, width = '100%', canOverflow = false, className, children }: {
  label: string
  code: string
  controls?: ReactNode
  width?: FrameWidth
  canOverflow?: boolean
  // For the demo, such as one that sets --demo-block-area-min-width to keep its preview wide enough.
  className?: string
  children: ReactNode
}) {
  return (
    <DemoBlock align="stretch" className={className} codeLanguage="css" codeView={code} endPanel={controls}>
      <div
        className="width-frame"
        style={{ '--_frame-width': width } as CSSProperties}
        {...(canOverflow ? { role: 'region', 'aria-label': `${label} frame`, tabIndex: 0 } : {})}
      >
        {children}
      </div>
    </DemoBlock>
  )
}
