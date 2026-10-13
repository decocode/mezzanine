import type { ReactNode } from 'react'

export interface MotionTimingDefinition {
  description: string
  duration: string
  easing: string
  id: string
  label: string
}

export interface MotionTokenDefinition {
  description: ReactNode
  token: string
}

export interface MotionPatternDefinition {
  id: string
  movement: ReactNode
  name: ReactNode
  reducedMotion: string
  scope: string
}

export const motionTimingDefinitions: MotionTimingDefinition[] = [
  {
    id: 'interface-transition',
    label: 'Interface transition',
    description: 'Short changes that help people follow an interface opening, closing, or changing state.',
    duration: '180ms',
    easing: 'ease-out; ease-in for modal exit',
  },
  {
    id: 'continuous-loading',
    label: 'Continuous loading',
    description: 'Repeated rotation that communicates an action is still in progress.',
    duration: '1s',
    easing: 'linear',
  },
]

export const motionTokenDefinitions: MotionTokenDefinition[] = [
  {
    token: '--button-progress-motion-duration',
    description: <>Controls one rotation of the <code>Button</code> loading indicator.</>,
  },
  {
    token: '--tab-motion-duration',
    description: <>Controls movement of the <code>Tab</code> selection indicator.</>,
  },
  {
    token: '--modal-motion-duration',
    description: <>Controls <code>Modal</code> and <code>ModalOverlay</code> entry and exit.</>,
  },
  {
    token: '--modal-enter-scale',
    description: <><code>Modal</code> scale at the start of entry and end of exit.</>,
  },
  {
    token: '--disclosure-motion-duration',
    description: <>Controls <code>Disclosure</code> chevron rotation.</>,
  },
  {
    token: '--navigation-tree-motion-duration',
    description: <>Controls <code>NavigationTree</code> chevron rotation and child-row motion.</>,
  },
]

export const motionPatternDefinitions: MotionPatternDefinition[] = [
  {
    id: 'modal',
    name: <><code>Modal</code> and <code>ModalOverlay</code></>,
    scope: 'Library components',
    movement: 'Fades the backdrop and scales the modal on entry and exit.',
    reducedMotion: 'The modal opens and closes without animation.',
  },
  {
    id: 'disclosure-chevron',
    name: <><code>Disclosure</code> chevron</>,
    scope: 'Library component',
    movement: <>Rotates 180 degrees when its <code>Disclosure</code> opens.</>,
    reducedMotion: 'Rotation happens immediately.',
  },
  {
    id: 'navigation-tree',
    name: <><code>NavigationTree</code></>,
    scope: 'Library chevron and optional animated NavigationTree rows',
    movement: 'Rotates its chevron and reveals or collapses child rows by changing height, spacing, opacity, and position.',
    reducedMotion: 'The hierarchy changes immediately.',
  },
  {
    id: 'button-progress',
    name: <>Pending <code>Button</code> indicator</>,
    scope: 'Library component',
    movement: 'Rotates one complete turn every second while an action is pending.',
    reducedMotion: 'The indicator remains visible without rotating.',
  },
  {
    id: 'navbar-navigation',
    name: 'Mobile Navbar navigation',
    scope: 'Library component',
    movement: 'Fades in while moving down by 0.375rem when opened.',
    reducedMotion: 'The navigation appears immediately.',
  },
  {
    id: 'page-scrolling',
    name: 'Page scrolling',
    scope: 'Showcase layout',
    movement: 'Scrolls smoothly when following a link to a place on the same page.',
    reducedMotion: 'The page moves immediately.',
  },
  {
    id: 'loading-icon-preview',
    name: 'Loading icon preview',
    scope: 'Showcase documentation only',
    movement: <>Rotates the <code>LoadingIcon</code> one complete turn every second.</>,
    reducedMotion: 'The icon remains visible without rotating.',
  },
]
