import type { ReactNode } from 'react'

export interface ColorTokenDefinition {
  description: ReactNode
  label: string
  token: string
}

export interface ColorTokenGroup {
  id: string
  label: string
  tokens: ColorTokenDefinition[]
}

interface TypographyStyleDefinition {
  className: string
  label: string
  purpose: string
}

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

export interface ElevationDefinition {
  description: string
  label: string
  token: string
}

export interface ColorPaletteDefinition {
  description?: string
  details?: {
    content: string[]
    label: string
  }
  id: 'neutral' | 'violet' | 'info' | 'success' | 'warning' | 'danger'
  label: string
}

export const colorShadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const spacingScaleSteps = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const

export const radiusLevels = [
  { label: 'None', token: '--radius-none' },
  { label: 'Small', token: '--radius-sm' },
  { label: 'Medium', token: '--radius-md' },
  { label: 'Large', token: '--radius-lg' },
  { label: 'Extra large', token: '--radius-xl' },
  { label: 'Full', token: '--radius-full' },
] as const

export const foundationColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'violet',
    label: 'Violet',
  },
]

export const semanticColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    description: 'Used to indicate statuses without a positive or negative inference. Very light and dark Neutral tones can be used when high contrast is required. Gray tones are often used to indicate that something is disabled or archived.',
    details: {
      label: 'Customising Neutral',
      content: [
        'Mezzanine Neutral tones sit between pure white (#FFFFFF) and pure black (#000000). It is used in the Wireframe theme to help product teams focus on the functionality of their designs.',
        'For custom themes, the Neutral palette can be easily adjusted to suit different brands - be that cool slates, warm taupes or icy silver tones.',
      ],
    },
  },
  { id: 'info', label: 'Info', description: 'Information and keyboard focus' },
  { id: 'success', label: 'Success', description: 'Successful outcomes' },
  { id: 'warning', label: 'Warning', description: 'Cautions and warnings' },
  { id: 'danger', label: 'Danger', description: 'Errors and destructive actions' },
]

export const elevationDefinitions: ElevationDefinition[] = [
  {
    token: '--elevation-inset',
    label: 'Inset',
    description: 'Content that appears pressed into or recessed within a surface.',
  },
  {
    token: '--elevation-flat',
    label: 'Flat',
    description: 'Content that sits directly on its surrounding surface without a shadow.',
  },
  {
    token: '--elevation-raised',
    label: 'Raised',
    description: 'A surface that needs subtle separation from the content beneath it.',
  },
  {
    token: '--elevation-floating',
    label: 'Floating',
    description: 'Temporary content positioned above nearby interface content.',
  },
  {
    token: '--elevation-overlay',
    label: 'Overlay',
    description: 'Content that sits above the main interface and needs the strongest separation.',
  },
]

export const colorTokenGroups: ColorTokenGroup[] = [
  {
    id: 'surfaces',
    label: 'Surfaces',
    tokens: [
      { token: '--color-page', label: 'Page', description: 'The background behind the page.' },
      { token: '--color-surface', label: 'Surface', description: 'Content placed on the page.' },
      { token: '--color-surface-hover', label: 'Surface hover', description: 'A hovered interactive surface.' },
      { token: '--color-surface-pressed', label: 'Surface pressed', description: 'A pressed interactive surface.' },
    ],
  },
  {
    id: 'text-and-lines',
    label: 'Text and lines',
    tokens: [
      { token: '--color-text', label: 'Text', description: 'Normal reading and interface text.' },
      { token: '--color-text-muted', label: 'Muted text', description: 'Supporting and secondary text.' },
      { token: '--color-border', label: 'Border', description: 'Outlines and dividing lines.' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions and focus',
    tokens: [
      { token: '--color-link', label: 'Link', description: 'The normal link color.' },
      { token: '--color-link-hover', label: 'Link hover', description: 'A hovered link.' },
      { token: '--color-link-pressed', label: 'Link pressed', description: 'A pressed link.' },
      { token: '--color-focus', label: 'Focus', description: 'The keyboard-focus indicator color.' },
    ],
  },
]

export const buttonTokens: ColorTokenDefinition[] = [
  { token: '--button-primary-background', label: 'Button primary background', description: <>Primary <code>Button</code> background.</> },
  { token: '--button-primary-background-hovered', label: 'Button primary background hovered', description: <>Primary <code>Button</code> background when hovered.</> },
  { token: '--button-primary-background-pressed', label: 'Button primary background pressed', description: <>Primary <code>Button</code> background when pressed.</> },
  { token: '--button-primary-content', label: 'Button primary content', description: <>Primary <code>Button</code> label and icon.</> },
  { token: '--button-primary-border', label: 'Button primary border', description: <>Primary <code>Button</code> border.</> },
  { token: '--button-secondary-background', label: 'Button secondary background', description: <>Secondary <code>Button</code> background.</> },
  { token: '--button-secondary-background-hovered', label: 'Button secondary background hovered', description: <>Secondary <code>Button</code> background when hovered.</> },
  { token: '--button-secondary-background-pressed', label: 'Button secondary background pressed', description: <>Secondary <code>Button</code> background when pressed.</> },
  { token: '--button-secondary-content', label: 'Button secondary content', description: <>Secondary <code>Button</code> label and icon.</> },
  { token: '--button-secondary-border', label: 'Button secondary border', description: <>Secondary <code>Button</code> border.</> },
  { token: '--button-tertiary-background', label: 'Button tertiary background', description: <>Tertiary <code>Button</code> background.</> },
  { token: '--button-tertiary-background-hovered', label: 'Button tertiary background hovered', description: <>Tertiary <code>Button</code> background when hovered.</> },
  { token: '--button-tertiary-background-pressed', label: 'Button tertiary background pressed', description: <>Tertiary <code>Button</code> background when pressed.</> },
  { token: '--button-tertiary-content', label: 'Button tertiary content', description: <>Tertiary <code>Button</code> label and icon.</> },
  { token: '--button-tertiary-border', label: 'Button tertiary border', description: <>Tertiary <code>Button</code> border.</> },
  { token: '--button-destructive-background', label: 'Button destructive background', description: <>Destructive <code>Button</code> background.</> },
  { token: '--button-destructive-background-hovered', label: 'Button destructive background hovered', description: <>Destructive <code>Button</code> background when hovered.</> },
  { token: '--button-destructive-background-pressed', label: 'Button destructive background pressed', description: <>Destructive <code>Button</code> background when pressed.</> },
  { token: '--button-destructive-content', label: 'Button destructive content', description: <>Destructive <code>Button</code> label and icon.</> },
  { token: '--button-destructive-border', label: 'Button destructive border', description: <>Destructive <code>Button</code> border.</> },
  { token: '--button-sm-min-height', label: 'Button small minimum height', description: <>Small <code>Button</code> minimum height.</> },
  { token: '--button-sm-padding-block', label: 'Button small vertical padding', description: <>Small <code>Button</code> vertical padding.</> },
  { token: '--button-sm-padding-inline', label: 'Button small horizontal padding', description: <>Small <code>Button</code> horizontal padding.</> },
  { token: '--button-sm-font-size', label: 'Button small font size', description: <>Small <code>Button</code> label size.</> },
  { token: '--button-sm-line-height', label: 'Button small line height', description: <>Small <code>Button</code> label line height.</> },
  { token: '--button-sm-icon-size', label: 'Button small icon size', description: <>Small <code>Button</code> icon size.</> },
  { token: '--button-md-min-height', label: 'Button medium minimum height', description: <>Medium <code>Button</code> minimum height.</> },
  { token: '--button-md-padding-block', label: 'Button medium vertical padding', description: <>Medium <code>Button</code> vertical padding.</> },
  { token: '--button-md-padding-inline', label: 'Button medium horizontal padding', description: <>Medium <code>Button</code> horizontal padding.</> },
  { token: '--button-md-font-size', label: 'Button medium font size', description: <>Medium <code>Button</code> label size.</> },
  { token: '--button-md-line-height', label: 'Button medium line height', description: <>Medium <code>Button</code> label line height.</> },
  { token: '--button-md-icon-size', label: 'Button medium icon size', description: <>Medium <code>Button</code> icon size.</> },
  { token: '--button-lg-min-height', label: 'Button large minimum height', description: <>Large <code>Button</code> minimum height.</> },
  { token: '--button-lg-padding-block', label: 'Button large vertical padding', description: <>Large <code>Button</code> vertical padding.</> },
  { token: '--button-lg-padding-inline', label: 'Button large horizontal padding', description: <>Large <code>Button</code> horizontal padding.</> },
  { token: '--button-lg-font-size', label: 'Button large font size', description: <>Large <code>Button</code> label size.</> },
  { token: '--button-lg-line-height', label: 'Button large line height', description: <>Large <code>Button</code> label line height.</> },
  { token: '--button-lg-icon-size', label: 'Button large icon size', description: <>Large <code>Button</code> icon size.</> },
  { token: '--button-xl-min-height', label: 'Button extra large minimum height', description: <>Extra-large <code>Button</code> minimum height.</> },
  { token: '--button-xl-padding-block', label: 'Button extra large vertical padding', description: <>Extra-large <code>Button</code> vertical padding.</> },
  { token: '--button-xl-padding-inline', label: 'Button extra large horizontal padding', description: <>Extra-large <code>Button</code> horizontal padding.</> },
  { token: '--button-xl-font-size', label: 'Button extra large font size', description: <>Extra-large <code>Button</code> label size.</> },
  { token: '--button-xl-line-height', label: 'Button extra large line height', description: <>Extra-large <code>Button</code> label line height.</> },
  { token: '--button-xl-icon-size', label: 'Button extra large icon size', description: <>Extra-large <code>Button</code> icon size.</> },
  { token: '--button-content-gap', label: 'Button content gap', description: <>Space between a <code>Button</code> icon and label.</> },
  { token: '--button-border-width', label: 'Button border width', description: 'Thickness of the button border.' },
  { token: '--button-border-radius', label: 'Button corner radius', description: 'Rounding of the button corners.' },
  { token: '--button-focus-ring-width', label: 'Button focus ring width', description: 'Thickness of the keyboard-focus outline.' },
  { token: '--button-focus-ring-offset', label: 'Button focus ring offset', description: 'Distance between the button and its keyboard-focus outline.' },
  { token: '--button-progress-size', label: 'Button progress size', description: 'Width and height of the pending-state progress indicator.' },
  { token: '--button-progress-stroke-width', label: 'Button progress stroke width', description: 'Thickness of the pending-state progress indicator.' },
  { token: '--button-progress-border-radius', label: 'Button progress corner radius', description: 'Rounding of the pending-state progress indicator.' },
  { token: '--button-progress-motion-duration', label: 'Button progress duration', description: 'Duration of one loading-indicator rotation; animation stops with reduced motion.' },
]

export const typographyStyles: TypographyStyleDefinition[] = [
  { className: 'mz-text-display-lg', label: 'Display large', purpose: 'Very prominent, short text in a spacious hero.' },
  { className: 'mz-text-display-md', label: 'Display medium', purpose: 'Prominent, short text in a hero or marketing section.' },
  { className: 'mz-text-display-sm', label: 'Display small', purpose: 'Short display text where less space is available.' },
  { className: 'mz-text-heading-lg', label: 'Heading large', purpose: 'A page title or top-level content heading.' },
  { className: 'mz-text-heading-md', label: 'Heading medium', purpose: 'A major section heading.' },
  { className: 'mz-text-heading-sm', label: 'Heading small', purpose: 'A subsection heading.' },
  { className: 'mz-text-title-lg', label: 'Title large', purpose: 'A prominent component or panel title.' },
  { className: 'mz-text-title-md', label: 'Title medium', purpose: 'A standard component or panel title.' },
  { className: 'mz-text-title-sm', label: 'Title small', purpose: 'A compact component or grouped-content title.' },
  { className: 'mz-text-body-lg', label: 'Body large', purpose: 'Introductory copy that needs additional prominence.' },
  { className: 'mz-text-body-md', label: 'Body medium', purpose: 'Paragraphs and ordinary interface content.' },
  { className: 'mz-text-body-sm', label: 'Body small', purpose: 'Supporting information, descriptions, and captions.' },
  { className: 'mz-text-label-lg', label: 'Label large', purpose: 'Standard controls and navigation labels.' },
  { className: 'mz-text-label-md', label: 'Label medium', purpose: 'Compact controls, badges, and metadata.' },
  { className: 'mz-text-label-sm', label: 'Label small', purpose: 'Supplementary labels where space is constrained.' },
]

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
    scope: 'Library chevron; Sidebar and documentation example rows',
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
    id: 'header-navigation',
    name: 'Mobile Header navigation',
    scope: 'Showcase layout',
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
