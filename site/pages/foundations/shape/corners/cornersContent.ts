import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const cornersContent: DocsPageContent = {
  id: 'corners',
  kind: 'foundation',
  title: 'Corners',
  description: 'Corner radius controls how square or rounded a surface appears. A shared scale gives every component the same steps to choose from.',
  sections: [
    {
      key: 'cornerRadius',
      title: 'Corner radius',
      intro: ['Extra small through Extra large use `rem`, so they respond to the root font size. None keeps square corners. Full uses a deliberately large radius to produce pill ends. Values come from the active CSS tokens.'],
    },
    {
      key: 'individualCorners',
      title: 'Individual corners',
      intro: ['Use `border-radius` to make all four corners match, or target a specific corner with a property such as `border-start-start-radius`, the corner where a line of text starts. Both can use the same radius tokens, for example `var(--radius-sm)`.'],
    },
    {
      key: 'usingTheScale',
      title: 'Using the scale',
      intro: [
        'Components read a level directly, for example `border-radius: var(--radius-sm)`.',
        'Full is a pill treatment, not another incremental step. For a circle, use `50%` on a square element; on a rectangle, that percentage produces an ellipse.',
      ],
    },
  ],
}
