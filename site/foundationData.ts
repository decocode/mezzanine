export interface ColorTokenDefinition {
  description: string
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
  sample: string
}

export interface MotionTimingDefinition {
  description: string
  duration: string
  easing: string
  id: string
  label: string
}

export interface MotionTokenDefinition {
  description: string
  token: string
  value: string
}

export interface MotionPatternDefinition {
  id: string
  movement: string
  name: string
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
  id: 'gray' | 'violet' | 'info' | 'success' | 'warning' | 'danger'
  label: string
}

export const colorShadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const foundationColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'gray',
    label: 'Gray',
  },
  {
    id: 'violet',
    label: 'Violet',
  },
]

export const semanticColorPalettes: ColorPaletteDefinition[] = [
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
      { token: '--color-surface-inverse', label: 'Inverse surface', description: 'A deliberately contrasting surface.' },
    ],
  },
  {
    id: 'text-and-lines',
    label: 'Text and lines',
    tokens: [
      { token: '--color-text', label: 'Text', description: 'Normal reading and interface text.' },
      { token: '--color-text-muted', label: 'Muted text', description: 'Supporting and secondary text.' },
      { token: '--color-text-inverse', label: 'Inverse text', description: 'Text on an inverse surface.' },
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
  { token: '--button-primary-background', label: 'Button primary background', description: 'Primary Button background.' },
  { token: '--button-primary-background-hovered', label: 'Button primary background hovered', description: 'Primary Button background when hovered.' },
  { token: '--button-primary-background-pressed', label: 'Button primary background pressed', description: 'Primary Button background when pressed.' },
  { token: '--button-primary-content', label: 'Button primary content', description: 'Primary Button label and icon.' },
  { token: '--button-primary-border', label: 'Button primary border', description: 'Primary Button border.' },
  { token: '--button-secondary-background', label: 'Button secondary background', description: 'Secondary Button background.' },
  { token: '--button-secondary-background-hovered', label: 'Button secondary background hovered', description: 'Secondary Button background when hovered.' },
  { token: '--button-secondary-background-pressed', label: 'Button secondary background pressed', description: 'Secondary Button background when pressed.' },
  { token: '--button-secondary-content', label: 'Button secondary content', description: 'Secondary Button label and icon.' },
  { token: '--button-secondary-border', label: 'Button secondary border', description: 'Secondary Button border.' },
  { token: '--button-tertiary-background', label: 'Button tertiary background', description: 'Tertiary Button background.' },
  { token: '--button-tertiary-background-hovered', label: 'Button tertiary background hovered', description: 'Tertiary Button background when hovered.' },
  { token: '--button-tertiary-background-pressed', label: 'Button tertiary background pressed', description: 'Tertiary Button background when pressed.' },
  { token: '--button-tertiary-content', label: 'Button tertiary content', description: 'Tertiary Button label and icon.' },
  { token: '--button-tertiary-border', label: 'Button tertiary border', description: 'Tertiary Button border.' },
  { token: '--button-destructive-background', label: 'Button destructive background', description: 'Destructive Button background.' },
  { token: '--button-destructive-background-hovered', label: 'Button destructive background hovered', description: 'Destructive Button background when hovered.' },
  { token: '--button-destructive-background-pressed', label: 'Button destructive background pressed', description: 'Destructive Button background when pressed.' },
  { token: '--button-destructive-content', label: 'Button destructive content', description: 'Destructive Button label and icon.' },
  { token: '--button-destructive-border', label: 'Button destructive border', description: 'Destructive Button border.' },
  { token: '--button-small-min-height', label: 'Button small minimum height', description: 'Small Button minimum height.' },
  { token: '--button-small-padding-block', label: 'Button small vertical padding', description: 'Small Button vertical padding.' },
  { token: '--button-small-padding-inline', label: 'Button small horizontal padding', description: 'Small Button horizontal padding.' },
  { token: '--button-small-font-size', label: 'Button small font size', description: 'Small Button label size.' },
  { token: '--button-small-line-height', label: 'Button small line height', description: 'Small Button label line height.' },
  { token: '--button-small-icon-size', label: 'Button small icon size', description: 'Small Button icon size.' },
  { token: '--button-medium-min-height', label: 'Button medium minimum height', description: 'Medium Button minimum height.' },
  { token: '--button-medium-padding-block', label: 'Button medium vertical padding', description: 'Medium Button vertical padding.' },
  { token: '--button-medium-padding-inline', label: 'Button medium horizontal padding', description: 'Medium Button horizontal padding.' },
  { token: '--button-medium-font-size', label: 'Button medium font size', description: 'Medium Button label size.' },
  { token: '--button-medium-line-height', label: 'Button medium line height', description: 'Medium Button label line height.' },
  { token: '--button-medium-icon-size', label: 'Button medium icon size', description: 'Medium Button icon size.' },
  { token: '--button-large-min-height', label: 'Button large minimum height', description: 'Large Button minimum height.' },
  { token: '--button-large-padding-block', label: 'Button large vertical padding', description: 'Large Button vertical padding.' },
  { token: '--button-large-padding-inline', label: 'Button large horizontal padding', description: 'Large Button horizontal padding.' },
  { token: '--button-large-font-size', label: 'Button large font size', description: 'Large Button label size.' },
  { token: '--button-large-line-height', label: 'Button large line height', description: 'Large Button label line height.' },
  { token: '--button-large-icon-size', label: 'Button large icon size', description: 'Large Button icon size.' },
  { token: '--button-extra-large-min-height', label: 'Button extra large minimum height', description: 'Extra-large Button minimum height.' },
  { token: '--button-extra-large-padding-block', label: 'Button extra large vertical padding', description: 'Extra-large Button vertical padding.' },
  { token: '--button-extra-large-padding-inline', label: 'Button extra large horizontal padding', description: 'Extra-large Button horizontal padding.' },
  { token: '--button-extra-large-font-size', label: 'Button extra large font size', description: 'Extra-large Button label size.' },
  { token: '--button-extra-large-line-height', label: 'Button extra large line height', description: 'Extra-large Button label line height.' },
  { token: '--button-extra-large-icon-size', label: 'Button extra large icon size', description: 'Extra-large Button icon size.' },
  { token: '--button-content-gap', label: 'Button content gap', description: 'Space between a Button icon and label.' },
]

export const typographyStyles: TypographyStyleDefinition[] = [
  { className: 'mezzanine-text-display-large', label: 'Display large', sample: 'Build with clarity' },
  { className: 'mezzanine-text-display-medium', label: 'Display medium', sample: 'Build with clarity' },
  { className: 'mezzanine-text-display-small', label: 'Display small', sample: 'Build with clarity' },
  { className: 'mezzanine-text-heading-large', label: 'Heading large', sample: 'A clear page heading' },
  { className: 'mezzanine-text-heading-medium', label: 'Heading medium', sample: 'A clear section heading' },
  { className: 'mezzanine-text-heading-small', label: 'Heading small', sample: 'A clear subsection heading' },
  { className: 'mezzanine-text-title-large', label: 'Title large', sample: 'A prominent component title' },
  { className: 'mezzanine-text-title-medium', label: 'Title medium', sample: 'A standard component title' },
  { className: 'mezzanine-text-title-small', label: 'Title small', sample: 'A compact component title' },
  { className: 'mezzanine-text-body-large', label: 'Body large', sample: 'Introductory text that benefits from a little more prominence.' },
  { className: 'mezzanine-text-body-medium', label: 'Body medium', sample: 'The default style for paragraphs and interface content.' },
  { className: 'mezzanine-text-body-small', label: 'Body small', sample: 'Supporting information, descriptions, and captions.' },
  { className: 'mezzanine-text-label-large', label: 'Label large', sample: 'Control label' },
  { className: 'mezzanine-text-label-medium', label: 'Label medium', sample: 'Compact label' },
  { className: 'mezzanine-text-label-small', label: 'Label small', sample: 'Supplementary label' },
]

export const motionTimingDefinitions: MotionTimingDefinition[] = [
  {
    id: 'interface-transition',
    label: 'Interface transition',
    description: 'Short changes that help people follow an interface opening, closing, or changing state.',
    duration: '180ms',
    easing: 'ease-out',
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
    token: '--disclosure-motion-duration',
    value: '180ms',
    description: 'Controls Disclosure chevron rotation.',
  },
  {
    token: '--navigation-tree-motion-duration',
    value: '180ms',
    description: 'Controls NavigationTree chevron rotation and child-row motion.',
  },
]

export const motionPatternDefinitions: MotionPatternDefinition[] = [
  {
    id: 'disclosure-chevron',
    name: 'Disclosure chevron',
    scope: 'Library component',
    movement: 'Rotates 180 degrees when its Disclosure opens.',
    reducedMotion: 'Rotation happens immediately.',
  },
  {
    id: 'navigation-tree',
    name: 'NavigationTree',
    scope: 'Library chevron; Sidebar and documentation example rows',
    movement: 'Rotates its chevron and reveals or collapses child rows by changing height, spacing, opacity, and position.',
    reducedMotion: 'The hierarchy changes immediately.',
  },
  {
    id: 'button-progress',
    name: 'Pending Button indicator',
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
    movement: 'Rotates the LoadingIcon one complete turn every second.',
    reducedMotion: 'The icon remains visible without rotating.',
  },
]
