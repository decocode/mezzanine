import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export interface ElevationDefinition {
  label: string
  level: string
  token: string
  useFor: string
}

// Level −1 uses the minus sign (U+2212), not a hyphen.
export const elevationDefinitions: ElevationDefinition[] = [
  { token: '--elevation-sunken-1', label: 'Sunken 1', level: '−1', useFor: 'Content pressed into or recessed within a surface.' },
  { token: '--elevation-flat', label: 'Flat', level: '0', useFor: 'Content that sits directly on its surface, with no shadow.' },
  { token: '--elevation-raised-1', label: 'Raised 1', level: '1', useFor: 'A surface that needs subtle separation from what is beneath it.' },
  { token: '--elevation-raised-2', label: 'Raised 2', level: '2', useFor: 'Temporary content above nearby content.' },
  { token: '--elevation-raised-3', label: 'Raised 3', level: '3', useFor: 'Content above the main interface that needs the strongest separation.' },
]

// The two colors every sunken and raised level is built from.
export const elevationColourTokens: { token: string; purpose: string }[] = [
  { token: '--elevation-shadow-color', purpose: 'Shadow color for every sunken and raised level.' },
  { token: '--elevation-highlight-color', purpose: 'Thin edge line around every sunken and raised level. Transparent hides it.' },
  { token: '--elevation-sunken-1-surface', purpose: 'Surface color for Sunken 1.' }, // gitleaks:allow (a CSS token name, not a secret)
  { token: '--elevation-flat-surface', purpose: 'Surface color for Flat.' },
  { token: '--elevation-raised-1-surface', purpose: 'Surface color for Raised 1. In Dark, each raised level is lighter than the one below, because a shadow barely shows on a dark page.' }, // gitleaks:allow (a CSS token name, not a secret)
  { token: '--elevation-raised-2-surface', purpose: 'Surface color for Raised 2.' }, // gitleaks:allow (a CSS token name, not a secret)
  { token: '--elevation-raised-3-surface', purpose: 'Surface color for Raised 3.' }, // gitleaks:allow (a CSS token name, not a secret)
]

// Shown between the two token tables, so it is part of the page's Tokens part rather than the section intro.
export const elevationColourTokensIntro: Copy = 'Every sunken and raised level is built from two colors, plus a surface color for each level, all set in each theme file in `src/themes/`.'

export const elevationContent: DocsPageContent = {
  id: 'elevation',
  kind: 'foundation',
  title: 'Elevation',
  description: 'Elevation uses shadow effects to help emphasise how surfaces are layered, or if something is indented.',
  sections: [
    {
      key: 'howItWorks',
      title: 'Using elevation effects',
      body: [
        'In the real world, a shadow shows that one thing sits above another. Screens borrow the idea: the deeper the shadow beneath a surface, the higher it seems to float.',
        'That only works where there’s room for darkness. On a dark page a shadow has almost nothing darker to show against, so Dark works differently: a raised surface is lighter than the one beneath it, and a faint light edge outlines it.',
        'Wireframe uses no shadows at all. Its surfaces are told apart by their borders, so every level looks the same there.',
      ],
    },
    {
      key: 'levels',
      title: 'Example',
      intro: ['There are five levels. Flat is level 0; sunken goes into the surface, and raised levels sit above it. A higher number means more separation from flat.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Elevation CSS properties',
        nameColumn: 'Property',
        rows: [{ name: 'box-shadow', description: 'Draws each level’s shadow and edge line.' }],
      },
    },
    {
      key: 'tokens',
      intro: ['The levels are defined in `src/tokens/elevation.tokens.css`. Values shown are for the theme you are viewing.'],
    },
    {
      key: 'theming',
      intro: ['The level shapes are shared. Each theme then sets what makes it different:'],
      // What each official theme sets itself, as defined in src/themes/.
      table: {
        label: 'What each theme sets',
        nameColumn: 'Theme',
        descriptionColumn: 'Sets',
        namesAreCode: false,
        rows: [
          { name: 'Wireframe', description: 'A transparent shadow color, so it shows no shadows.' },
          { name: 'Light', description: 'Its shadow color. The levels use the shared shapes.' },
          { name: 'Dark', description: 'Its shadow color, an edge highlight, and larger shapes for Raised 1 to Raised 3, so surfaces stay distinct on a dark page.' },
        ],
      },
    },
    {
      key: 'accessibility',
      intro: ['Keyboard focus is shown with `--color-focus`, not with elevation. Never use a shadow as the only sign of which control has focus.'],
    },
  ],
  relatedPages: [
    { label: 'Color', href: '/color' },
    { label: 'Interaction', href: '/interaction' },
  ],
  references: [
    { label: 'MDN: box-shadow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow' },
  ],
}
