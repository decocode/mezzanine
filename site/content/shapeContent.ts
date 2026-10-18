import type { DocsPageContent } from '../templates/docsPageContent'

export const shapeContent: DocsPageContent = {
  id: 'shape',
  kind: 'foundation',
  title: 'Shape',
  description: "Shape is how a surface's outline looks: how rounded its corners are, and how heavy its border is. Each has a shared scale that products can reference from their component tokens.",
  sections: [
    {
      key: 'corners',
      title: 'Corners',
      intro: ['The corner-radius scale, from square to pill ends, and how to round all corners or just one.'],
      body: ['[Explore corners](/shape/corners)'],
    },
    {
      key: 'borders',
      title: 'Borders',
      intro: ['The border-width scale, from a hairline to a heavy outline, and when a hairline is suitable.'],
      body: ['[Explore borders](/shape/borders)'],
    },
  ],
}

// The Corners and Borders pages each show one of these scales.
export const radiusLevels = [
  { label: 'None', token: '--radius-none' },
  { label: 'Extra small', token: '--radius-xs' },
  { label: 'Small', token: '--radius-sm' },
  { label: 'Medium', token: '--radius-md' },
  { label: 'Large', token: '--radius-lg' },
  { label: 'Extra large', token: '--radius-xl' },
  { label: 'Full', token: '--radius-full' },
] as const

export const borderWidthLevels = [
  { label: 'None', token: '--border-width-none' },
  { label: 'Extra small (hairline)', token: '--border-width-xs' },
  { label: 'Small', token: '--border-width-sm' },
  { label: 'Medium', token: '--border-width-md' },
  { label: 'Large', token: '--border-width-lg' },
  { label: 'Extra large', token: '--border-width-xl' },
] as const
