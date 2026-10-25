import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const spacingRoleLevels = [
  { token: '--space-gap-control', label: 'Gap: control', description: 'An icon or indicator and its label, inside one control' },
  { token: '--space-gap-field', label: 'Gap: field', description: 'A label, its input and its help text' },
  { token: '--space-gap-cluster', label: 'Gap: cluster', description: 'Components in a group, such as the blocks in a card' },
  { token: '--space-gap-text', label: 'Gap: text', description: 'Text that belongs together, such as a heading and the text it introduces' },
  { token: '--space-gap-paragraph', label: 'Gap: paragraph', description: 'Between paragraphs and lists in running text' },
  { token: '--space-before-heading-sm', label: 'Before heading: small', description: 'Above a small heading in running text' },
  { token: '--space-before-heading-md', label: 'Before heading: medium', description: 'Above a medium heading in running text' },
  { token: '--space-before-heading-lg', label: 'Before heading: large', description: 'Above a large heading in running text' },
  { token: '--space-padding-control-block', label: 'Padding: control, block', description: 'Above and below the content of a control or row' },
  { token: '--space-padding-control-inline', label: 'Padding: control, inline', description: 'Before and after the content of a control or row' },
  { token: '--space-padding-surface', label: 'Padding: surface', description: 'Inside a surface, such as a card or dialog' },
  { token: '--space-padding-area', label: 'Padding: area', description: 'Between the edge of an app area, such as a Panel or the top bar, and its content' },
  { token: '--space-overlay-inset', label: 'Overlay inset', description: 'Between a pop-up, such as a Modal or Tooltip, and the edges of the screen' },
]

export const spacingRolesContent: DocsPageContent = {
  id: 'spacing-roles',
  kind: 'foundation',
  title: 'Spacing roles',
  description: 'Components take their spacing from shared roles, which point at the [spacing scale](/dimension/spacing-scale). Roles are named by how closely things belong together: inside a control is closest, then a field, then a cluster of components.',
  sections: [{ key: 'spacingRoles', title: 'Roles' }],
}
