import type { Copy, DocsPageContent } from '../../../templates/docsPageContent'

// {motionState} is replaced with "suppressed" or "enabled" for the area showing the page.
export const motionContent: DocsPageContent = {
  id: 'motion',
  kind: 'foundation',
  title: 'Motion',
  description: 'Motion shows people what is changing on screen: content opening or closing, moving into place, or still loading. It can also draw attention to something important or add creative expression, but it should never distract from what people are doing.',
  sections: [
    {
      key: 'timingAndEasing',
      title: 'Timing and easing',
      intro: ['Short transitions communicate changes of state. Continuous loading cycles indicate that an action remains in progress.'],
    },
    {
      key: 'tokens',
      title: 'CSS tokens',
      intro: ['These are the configured shared values. Reduction suppresses playback without changing a product’s configured speed.'],
    },
    {
      key: 'currentMotionPatterns',
      title: 'Current motion patterns',
      intro: ['The scope identifies whether each pattern belongs to the library or the showcase. Reduced-motion behaviour preserves the state change without the animation.'],
    },
    {
      key: 'reducedMotion',
      title: 'Reduced motion',
      intro: ["Finite motion on this page is currently {motionState}. Wireframe suppresses finite motion in its own area; a nested Light or Dark area restores it. Loading indicators keep their existing behaviour in Wireframe. Mezzanine follows the device's `prefers-reduced-motion` setting. When a person asks for less motion, animations and smooth scrolling are removed while the interface continues to change state and communicate progress."],
    },
  ],
}

export const motionStates = { suppressed: 'suppressed', enabled: 'enabled' } as const

interface MotionTimingDefinition {
  description: string
  duration: string
  easing: string
  id: string
  label: string
}

interface MotionTokenDefinition {
  description: Copy
  token: string
}

interface MotionPatternDefinition {
  id: string
  movement: Copy
  name: string
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
  { id: 'button-progress', name: 'Pending Button indicator', scope: 'Library', movement: 'Rotates continuously while pending.', reducedMotion: 'System reduction stops rotation and keeps the ring visible. Wireframe alone leaves loading unchanged.' },
  { id: 'page-scrolling', name: 'Page scrolling', scope: 'Documentation layout', movement: 'Same-page links scroll smoothly; direct-load anchors scroll immediately.', reducedMotion: 'Scrolling is immediate.' },
  { id: 'loading-icon-preview', name: 'Loading icon preview', scope: 'Documentation only', movement: 'Rotates continuously.', reducedMotion: 'System reduction stops rotation and keeps the icon visible. Wireframe alone leaves it unchanged.' },
]
