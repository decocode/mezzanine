// LabPanelToggle's icons for each placement. Side Panels use the library's Panel icons; the library has
// none for the bottom, so this candidate follows the same drawing, turned on its side. Illustrative and
// unapproved.
import type { ReactNode } from 'react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon, PanelRightCloseIcon, PanelRightOpenIcon } from '@decocode/mezzanine'
import type { LabPanelPlacement } from './labPanelSize'

function LabStrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="miter" strokeWidth={1.25} viewBox="0 0 24 24">
      <path d="M3.75 4.75h16.5v14.5H3.75z" />
      {children}
    </svg>
  )
}

const PanelBottomOpenIcon = () => <LabStrokeIcon><path d="M3.75 14h16.5" /><path d="M9 11.5l3-3 3 3" /></LabStrokeIcon>
const PanelBottomCloseIcon = () => <LabStrokeIcon><path d="M3.75 14h16.5" /><path d="M9 8.5l3 3 3-3" /></LabStrokeIcon>

// The icon shows what pressing does: collapsing while the Panel is expanded, expanding while it's collapsed.
export function labPanelIcon(placement: LabPanelPlacement, isExpanded: boolean): ReactNode {
  switch (placement) {
    case 'start': return isExpanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />
    case 'end': return isExpanded ? <PanelRightCloseIcon /> : <PanelRightOpenIcon />
    case 'bottom': return isExpanded ? <PanelBottomCloseIcon /> : <PanelBottomOpenIcon />
  }
}
