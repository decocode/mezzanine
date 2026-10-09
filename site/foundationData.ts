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
      { token: '--color-primary', label: 'Primary', description: 'The normal primary-action color.' },
      { token: '--color-primary-hover', label: 'Primary hover', description: 'A hovered primary action.' },
      { token: '--color-primary-pressed', label: 'Primary pressed', description: 'A pressed primary action.' },
      { token: '--color-on-primary', label: 'On primary', description: 'Content placed on a primary color.' },
      { token: '--color-link', label: 'Link', description: 'The normal link color.' },
      { token: '--color-link-hover', label: 'Link hover', description: 'A hovered link.' },
      { token: '--color-link-pressed', label: 'Link pressed', description: 'A pressed link.' },
      { token: '--color-focus', label: 'Focus', description: 'The keyboard-focus indicator color.' },
    ],
  },
  {
    id: 'button',
    label: 'Button',
    tokens: [
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
    ],
  },
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
