import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export const colorRolesContent: DocsPageContent = {
  id: 'color-roles',
  kind: 'foundation',
  title: 'Color roles',
  description: 'Roles name the purpose of a color. Components use these tokens so a theme can change the palette without changing the meaning of each role.',
  sections: [{ key: 'colorRoles', title: 'Roles' }],
}

export interface ColorTokenDefinition {
  description: Copy
  label: string
  token: string
}

export interface ColorTokenGroup {
  id: string
  label: string
  tokens: ColorTokenDefinition[]
}

const colorFamilies = [
  { id: 'accent', label: 'Accent' },
  { id: 'info', label: 'Info' },
  { id: 'success', label: 'Success' },
  { id: 'warning', label: 'Warning' },
  { id: 'danger', label: 'Danger' },
] as const

// Every family has the same roles, so its rows are built from one list.
const familyRoles = [
  { suffix: '-emphasis', label: 'emphasis', description: 'A strong fill, such as a primary button or a selected item.' },
  { suffix: '-emphasis-hovered', label: 'emphasis hovered', description: 'A hovered emphasis fill.' },
  { suffix: '-emphasis-pressed', label: 'emphasis pressed', description: 'A pressed emphasis fill.' },
  { suffix: '-inverse', label: 'inverse', description: 'Text and icons on an emphasis fill.' },
  { suffix: '-muted', label: 'muted', description: 'A resting light fill, such as a badge.' },
  { suffix: '-muted-hovered', label: 'muted hovered', description: 'A light fill while hovered.' },
  { suffix: '-muted-pressed', label: 'muted pressed', description: 'A light fill while pressed.' },
  { suffix: '', label: '', description: 'Text, icons and borders on a muted fill or the page.' },
]

export const colorTokenGroups: ColorTokenGroup[] = [
  {
    id: 'surfaces',
    label: 'Surfaces',
    tokens: [
      { token: '--color-page', label: 'Page', description: 'The background behind the page.' },
      { token: '--color-surface', label: 'Surface', description: 'Content placed on the page.' },
      { token: '--color-neutral-muted', label: 'Neutral muted', description: 'A faint wash of the text color, such as a neutral badge.' },
      { token: '--color-backdrop', label: 'Backdrop', description: 'The dimmed layer behind modals and drawers.' },
    ],
  },
  {
    id: 'text-and-lines',
    label: 'Text and lines',
    tokens: [
      { token: '--color-text', label: 'Text', description: 'Normal reading and interface text.' },
      { token: '--color-text-muted', label: 'Muted text', description: 'Supporting and secondary text.' },
      { token: '--color-border', label: 'Border', description: 'Outlines and dividing lines.' },
      { token: '--color-border-control', label: 'Control border', description: 'Borders of controls, such as checkboxes and inputs.' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions and focus',
    tokens: [
      { token: '--color-link', label: 'Link', description: 'The normal link color.' },
      { token: '--color-link-hovered', label: 'Link hovered', description: 'A hovered link.' },
      { token: '--color-link-pressed', label: 'Link pressed', description: 'A pressed link.' },
      { token: '--color-focus', label: 'Focus', description: 'The keyboard-focus indicator color.' },
      { token: '--color-chevron', label: 'Chevron', description: 'Expand and collapse chevrons in Disclosure and Nav Tree.' },
      { token: '--color-indicator', label: 'Indicator', description: 'The bar that marks the current page, section or tab, and a selected row.' },
    ],
  },
  ...colorFamilies.map((family) => ({
    id: family.id,
    label: family.label,
    tokens: familyRoles.map((role) => ({
      token: `--color-${family.id}${role.suffix}`,
      label: `${family.label} ${role.label}`.trim(),
      description: role.description,
    })),
  })),
]
