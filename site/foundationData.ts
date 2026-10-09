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
  description: string
  id: 'neutral' | 'violet' | 'info' | 'success' | 'warning' | 'danger'
  label: string
}

export const colorShadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const foundationColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    description: "These values can be replaced with your brand's neutral palette.",
  },
  {
    id: 'violet',
    label: 'Violet',
    description: "These values can be replaced with one of your brand's color palettes.",
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
    id: 'status',
    label: 'Status',
    tokens: [
      { token: '--color-info', label: 'Information', description: 'Helpful neutral information.' },
      { token: '--color-success', label: 'Success', description: 'A successful result.' },
      { token: '--color-warning', label: 'Warning', description: 'A situation requiring caution.' },
      { token: '--color-danger', label: 'Danger', description: 'An error or destructive consequence.' },
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
