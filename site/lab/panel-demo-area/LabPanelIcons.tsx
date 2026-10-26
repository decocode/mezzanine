// The minimize button's icons for each placement. Side Panels use the library's Panel icons; the
// library has none for top and bottom, so these candidates follow the same drawing, turned on its side.
// Illustrative and unapproved.
import type { ReactNode } from 'react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon, PanelRightCloseIcon, PanelRightOpenIcon } from '@decocode/mezzanine'
import type { LabPanelPlacement } from './labPanelSize'

const frame = 'M3.75 4.75h16.5v14.5H3.75z'

function LabStrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="miter" strokeWidth={1.25} viewBox="0 0 24 24">
      <path d={frame} />
      {children}
    </svg>
  )
}

const PanelTopOpenIcon = () => <LabStrokeIcon><path d="M3.75 10h16.5" /><path d="M9 12.5l3 3 3-3" /></LabStrokeIcon>
const PanelTopCloseIcon = () => <LabStrokeIcon><path d="M3.75 10h16.5" /><path d="M9 15.5l3-3 3 3" /></LabStrokeIcon>
const PanelBottomOpenIcon = () => <LabStrokeIcon><path d="M3.75 14h16.5" /><path d="M9 11.5l3-3 3 3" /></LabStrokeIcon>
const PanelBottomCloseIcon = () => <LabStrokeIcon><path d="M3.75 14h16.5" /><path d="M9 8.5l3 3 3-3" /></LabStrokeIcon>

// The icon shows what pressing does: minimizing while the Panel is maximized, maximizing while it's minimized.
export function labPanelIcon(placement: LabPanelPlacement, isMaximized: boolean): ReactNode {
  switch (placement) {
    case 'start': return isMaximized ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />
    case 'end': return isMaximized ? <PanelRightCloseIcon /> : <PanelRightOpenIcon />
    case 'top': return isMaximized ? <PanelTopCloseIcon /> : <PanelTopOpenIcon />
    case 'bottom': return isMaximized ? <PanelBottomCloseIcon /> : <PanelBottomOpenIcon />
  }
}
