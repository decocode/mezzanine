export interface ElevationDefinition {
  label: string
  level: string
  token: string
  useFor: string
}

// Level −1 uses the minus sign (U+2212), not a hyphen.
export const elevationDefinitions: ElevationDefinition[] = [
  {
    token: '--elevation-sunken-1',
    label: 'Sunken 1',
    level: '−1',
    useFor: 'Content that appears pressed into or recessed within a surface.',
  },
  {
    token: '--elevation-flat',
    label: 'Flat',
    level: '0',
    useFor: 'Content that sits directly on its surrounding surface without a shadow.',
  },
  {
    token: '--elevation-raised-1',
    label: 'Raised 1',
    level: '1',
    useFor: 'A surface that needs subtle separation from the content beneath it.',
  },
  {
    token: '--elevation-raised-2',
    label: 'Raised 2',
    level: '2',
    useFor: 'Temporary content positioned above nearby interface content.',
  },
  {
    token: '--elevation-raised-3',
    label: 'Raised 3',
    level: '3',
    useFor: 'Content that sits above the main interface and needs the strongest separation.',
  },
]

// Theme colours that every sunken and raised level is built from.
export const elevationHelperTokens: { token: string; purpose: string }[] = [
  { token: '--elevation-shadow-color', purpose: 'Shadow colour for every sunken and raised level.' },
  { token: '--elevation-highlight-color', purpose: 'Colour of the thin edge line drawn around every sunken and raised level. A transparent value hides it.' },
]
