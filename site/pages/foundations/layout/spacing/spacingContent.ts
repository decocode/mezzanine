import type { DocsPageContent } from '../../../../templates/docsPageContent'

// The scale's steps; each token's number × 4 gives its usual pixel size.
export const spacingScaleLevels = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((step) => ({
  token: `--space-${step}`,
  label: `Space ${step}`,
}))

export const spacingRoleLevels = [
  { token: '--space-gap-control', label: 'Gap: control', description: 'An icon or box and its label, inside one control' },
  { token: '--space-gap-field', label: 'Gap: field', description: 'A label, its input and its help text' },
  { token: '--space-gap-cluster', label: 'Gap: cluster', description: 'Components in a group, such as the blocks in a card' },
  { token: '--space-padding-control-block', label: 'Padding: control, block', description: 'Above and below the content of a control or row' },
  { token: '--space-padding-control-inline', label: 'Padding: control, inline', description: 'Before and after the content of a control or row' },
  { token: '--space-padding-surface', label: 'Padding: surface', description: 'Inside a surface, such as a card or dialog' },
]

export const spacingContent: DocsPageContent = {
  id: 'spacing',
  kind: 'foundation',
  title: 'Spacing',
  description: 'Spacing is the room between and inside boxes. Components take it from shared roles, which point at one scale.',
  sections: [
    {
      key: 'spacingRoles',
      title: 'Roles',
      intro: ['Roles are named by how closely things belong together: inside a control is closest, then a field, then a cluster of components.'],
    },
    {
      key: 'spacingScale',
      title: 'Scale',
      intro: ['Each step’s number × 4 gives its usual pixel size. Values are in `rem`, so they follow the root font size.'],
    },
  ],
}
