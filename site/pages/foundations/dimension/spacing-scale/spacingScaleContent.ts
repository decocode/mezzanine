import type { DocsPageContent } from '../../../../templates/docsPageContent'

// The scale's steps; each token's number × 4 gives its usual pixel size.
export const spacingScaleLevels = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((step) => ({
  token: `--space-${step}`,
  label: `Space ${step}`,
}))

export const spacingScaleContent: DocsPageContent = {
  id: 'spacing-scale',
  kind: 'foundation',
  title: 'Spacing scale',
  description: 'Every space in Mezzanine comes from one scale. Each step’s number × 4 gives its usual pixel size. Values are in `rem`, so they follow the root font size.',
  sections: [{ key: 'spacingScale', title: 'Scale' }],
}
