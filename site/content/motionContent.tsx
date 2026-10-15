import type { ReactNode } from 'react'

interface MotionTimingDefinition {
  description: string
  duration: string
  easing: string
  id: string
  label: string
}

interface MotionTokenDefinition {
  description: ReactNode
  token: string
}

interface MotionPatternDefinition {
  id: string
  movement: ReactNode
  name: ReactNode
  reducedMotion: string
  scope: string
}

export const motionTimingDefinitions: MotionTimingDefinition[] = [
  { id: 'interface-transition', label: 'Interface entry and state change', description: 'Shared timing for finite interface changes.', duration: '--motion-duration-interface', easing: '--motion-easing-enter' },
  { id: 'interface-exit', label: 'Interface exit', description: 'Exits accelerate as they leave.', duration: '--motion-duration-interface', easing: '--motion-easing-exit' },
  { id: 'continuous-loading', label: 'Continuous loading', description: 'Repeated rotation while work remains in progress.', duration: '--motion-duration-loading', easing: '--motion-easing-loading' },
]

export const motionTokenDefinitions: MotionTokenDefinition[] = [
  { token: '--motion-duration-interface', description: 'Configured duration for finite interface changes.' },
  { token: '--motion-duration-loading', description: 'Duration of one loading rotation; never zeroed by the motion policy.' },
  { token: '--motion-easing-enter', description: 'Easing (how speed changes): entry and state changes slow towards their endpoint.' },
  { token: '--motion-easing-exit', description: 'Exits accelerate towards their endpoint.' },
  { token: '--motion-easing-loading', description: 'Loading rotates at constant speed.' },
  { token: '--motion-scale-enter', description: 'Modal size at the start of entry and end of exit.' },
  { token: '--motion-rotation-expanded', description: 'Quarter-turn for the Disclosure and Nav Tree expanded indicators.' },
  { token: '--motion-rotation-cycle', description: 'One complete loading rotation.' },
  { token: '--motion-distance-reveal', description: 'Shared short reveal distance; each recipe supplies direction.' },
  { token: '--motion-distance-offscreen', description: 'Full proportional travel of a drawer or sheet.' },
]

export const motionPatternDefinitions: MotionPatternDefinition[] = [
  { id: 'modal', name: 'Modal and ModalOverlay', scope: 'Library', movement: 'Backdrop fades; modal scales on entry and exit.', reducedMotion: 'Opens and closes immediately.' },
  { id: 'disclosure-panel', name: 'Disclosure panel', scope: 'Library', movement: 'Opens and closes immediately, like Nav Tree rows. Only the chevron turns.', reducedMotion: 'Opens and closes immediately.' },
  { id: 'disclosure-chevron', name: 'Disclosure chevron', scope: 'Library', movement: 'Points right when closed and turns down when expanded.', reducedMotion: 'Orientation changes immediately; expanded state remains visible.' },
  { id: 'tabs', name: 'Tabs selection indicator', scope: 'Library', movement: 'Moves and resizes with shared entry easing.', reducedMotion: 'Changes immediately.' },
  { id: 'tooltip', name: 'Tooltip', scope: 'Library', movement: 'Fades using interface timing; the hover delay remains separate.', reducedMotion: 'Appears and disappears without a fade.' },
  { id: 'navigation-tree', name: 'Nav Tree', scope: 'Library', movement: 'Chevron turns from right to down; rows appear and disappear immediately.', reducedMotion: 'Hierarchy and chevron orientation change immediately.' },
  { id: 'navbar-navigation', name: 'Mobile Navbar navigation', scope: 'Library', movement: 'Fades in and moves by the shared reveal distance.', reducedMotion: 'Appears immediately.' },
  { id: 'sidebar', name: 'Sidebar drawer', scope: 'Library', movement: 'Slides from its side while the backdrop fades.', reducedMotion: 'Opens and closes immediately.' },
  { id: 'tab-bar', name: 'TabBar More sheet', scope: 'Library', movement: 'Slides from below while the backdrop fades.', reducedMotion: 'Opens and closes immediately.' },
  { id: 'button-progress', name: 'Pending Button indicator', scope: 'Library', movement: 'Rotates continuously while pending.', reducedMotion: 'System reduction stops rotation and keeps the ring visible. Wireframe alone leaves loading unchanged.' },
  { id: 'page-scrolling', name: 'Page scrolling', scope: 'Documentation layout', movement: 'Same-page links scroll smoothly; direct-load anchors scroll immediately.', reducedMotion: 'Scrolling is immediate.' },
  { id: 'loading-icon-preview', name: 'Loading icon preview', scope: 'Documentation only', movement: 'Rotates continuously.', reducedMotion: 'System reduction stops rotation and keeps the icon visible. Wireframe alone leaves it unchanged.' },
]
