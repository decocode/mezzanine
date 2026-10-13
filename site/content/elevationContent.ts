export interface ElevationDefinition {
  description: string
  label: string
  token: string
}

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
