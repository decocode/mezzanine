import type { Copy, DocsPageContent } from '../../../templates/docsPageContent'

export const colorContent: DocsPageContent = {
  id: 'color',
  kind: 'foundation',
  title: 'Color',
  description: [
    "In user interfaces, colors are not merely decorative. They help to establish visual hierarchy, convey meaning, and distinguish states. Mezzanine keeps colors that express a brand's unique visual identity separate from semantic colors that communicate specific meaning—that way, different brands can be expressive without impacting usability.",
    "Mezzanine's default color combinations (for both light and dark mode) aim to meet [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/#conformance-reqs) contrast requirements.",
  ],
  sections: [
    {
      key: 'colorPalettes',
      title: 'Color palettes',
      subsections: [{ id: 'color-core-colors', label: 'Core colors' }, { id: 'color-semantic-colors', label: 'Semantic colors' }],
      intro: ['Each palette brings together eleven shades of a color, ranging from light to dark. Lower numbers indicate lighter shades; higher numbers indicate darker shades. Each swatch shows its shade number and color value. Expand Color tokens beneath a palette to see its token names and values.'],
    },
    {
      key: 'colorRoles',
      title: 'Color roles',
      intro: ['Roles name the purpose of a color. Components use these tokens so a theme can change the palette without changing the meaning of each role.'],
    },
  ],
}

// The two groups inside Color palettes, and the disclosure label beneath every palette.
export const colorPaletteGroups = {
  core: {
    title: 'Core colors',
    intro: 'Core colors are the palettes your brand can use to communicate its distinct visual identity. Mezzanine uses the Signature palette for its default brand color.',
  },
  semantic: {
    title: 'Semantic colors',
    intro: 'Semantic colors are used to communicate meaning. Traffic lights are a familiar real-world example: green means go, amber warns you to take care, and red means stop. In user interface design, the same principles help people to quickly recognise helpful info, successful outcomes, warnings, and errors.',
  },
} satisfies Record<string, { title: string; intro: Copy }>

export const colorTokensLabel = 'Color tokens'

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

export interface ColorPaletteDefinition {
  description?: string
  details?: {
    content: string[]
    label: string
  }
  id: 'neutral' | 'signature' | 'info' | 'success' | 'warning' | 'danger'
  label: string
}

export const colorShadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export const foundationColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'signature',
    label: 'Signature',
    details: {
      label: 'When to use Signature colors',
      content: [
        'The Signature palette is usually based around the main color associated with a brand. In Mezzanine, signature colors are used for primary buttons, links, and selected controls.',
        'If your main brand color is similar to those used for warnings or errors, consider how people will tell those meanings apart. Some brands use high-contrast neutral colors for buttons and links, reserving their brand color for images and other visual content.',
      ],
    },
  },
]

export const semanticColorPalettes: ColorPaletteDefinition[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    details: {
      label: 'When to use Neutral colors',
      content: [
        'Used to indicate statuses without a positive or negative inference. Very light and dark Neutral tones can be used when high contrast is required. Gray tones are often used to indicate that something is disabled or archived.',
        'Pair the color with a clear label, such as “Draft” or “Archived”, so people can understand the status without relying on color alone.',
        'Mezzanine Neutral tones sit between pure white (#FFFFFF) and pure black (#000000). It is used in the Wireframe theme to help product teams focus on the functionality of their designs.',
        'For custom themes, the Neutral palette can be easily adjusted to suit different brands - be that cool slates, warm taupes or icy silver tones.',
      ],
    },
  },
  {
    id: 'info',
    label: 'Info',
    details: {
      label: 'When to use Info colors',
      content: [
        'Use Info colors to draw attention to helpful information without suggesting that something has gone right or wrong. They suit informational statuses and supporting guidance, such as a note explaining what happens after a form is submitted.',
        'Pair the color with a clear label or message, such as “In progress” or “Your request is being reviewed”, so people can understand the information without relying on color alone.',
        'Mezzanine also uses the Info palette for keyboard-focus indicators. These identify the control a person is currently interacting with, rather than communicating a status.',
      ],
    },
  },
  {
    id: 'success',
    label: 'Success',
    details: {
      label: 'When to use Success colors',
      content: [
        'Use Success colors to confirm that an action has completed or a positive outcome has been reached. Examples include changes being saved, an upload completing, or a request being approved.',
        'Reserve Success for a confirmed outcome, rather than an action that is still in progress. Pair the color with a clear label, such as “Saved” or “Complete”, so people can understand the result without relying on color alone.',
      ],
    },
  },
  {
    id: 'warning',
    label: 'Warning',
    details: {
      label: 'When to use Warning colors',
      content: [
        'Use Warning colors for situations that need attention but are not yet errors. Examples include an approaching expiry date, unsaved changes, or nearing a usage limit.',
        'A warning should help people understand a risk before it becomes a problem. Explain what needs their attention and what they can do next. If an action has already failed, use Danger instead.',
        'Pair the color with a clear label, such as “Expires soon” or “Unsaved changes”, so people can understand the warning without relying on color alone.',
      ],
    },
  },
  {
    id: 'danger',
    label: 'Danger',
    details: {
      label: 'When to use Danger colors',
      content: [
        'Use Danger colors to highlight errors, failed actions, and actions that remove or destroy something important. For example, Mezzanine uses the Danger palette for invalid form-control borders and destructive buttons.',
        'Always pair Danger colors with a clear label or message, such as “Save failed”, “Enter a valid email address” or “Delete” so people can avoid potential issues without relying on color alone.',
      ],
    },
  },
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
    ],
  },
  {
    id: 'text-and-lines',
    label: 'Text and lines',
    tokens: [
      { token: '--color-text', label: 'Text', description: 'Normal reading and interface text.' },
      { token: '--color-text-muted', label: 'Muted text', description: 'Supporting and secondary text.' },
      { token: '--color-border', label: 'Border', description: 'Outlines and dividing lines.' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions and focus',
    tokens: [
      { token: '--color-link', label: 'Link', description: 'The normal link color.' },
      { token: '--color-link-hover', label: 'Link hover', description: 'A hovered link.' },
      { token: '--color-link-pressed', label: 'Link pressed', description: 'A pressed link.' },
      { token: '--color-focus', label: 'Focus', description: 'The keyboard-focus indicator color.' },
      { token: '--color-chevron', label: 'Chevron', description: 'Expand and collapse chevrons in Disclosure and Nav Tree.' },
    ],
  },
]
