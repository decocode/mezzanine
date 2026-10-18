import type { Copy, DocsPageContent } from '../templates/docsPageContent'

export type TextRole = 'display' | 'heading' | 'title' | 'body' | 'label'

interface TextRoleDefinition {
  id: TextRole
  label: string
  purpose: string
}

interface TypographyStyleDefinition {
  className: string
  role: TextRole
  label: string
  purpose: string
}

export const textStylesContent: DocsPageContent = {
  id: 'text-styles',
  kind: 'foundation',
  title: 'Text styles',
  description: 'A text style is a ready-made set of font settings that you apply with one CSS class. Mezzanine has fifteen, grouped into five roles.',
  sections: [
    {
      key: 'quickStart',
      title: 'Quick start',
      intro: ["Add a style's class to any element. The class sets the font, size, weight, line height, letter spacing and capitalisation together, so you do not set any of them yourself."],
    },
    {
      key: 'theFiveRoles',
      title: 'The five roles',
      intro: ['Each role does one job and comes in three sizes: large (`lg`), medium (`md`) and small (`sm`).'],
    },
    {
      key: 'allStyles',
      title: 'All styles',
      intro: ["Each example below is written in its own style. Sizes are shown at the browser's default text size."],
    },
    {
      key: 'choosingAStyle',
      title: 'Choosing a style',
      intro: ['Start with these common choices. Use Body medium for anything people need to read properly, and keep Label small for brief extra text in tight spaces. Instructions, errors and anything needed to finish a task need a larger style.'],
    },
    {
      key: 'lighterAndBolderText',
      title: 'Lighter and bolder text',
      intro: [
        'On their own, Title and Label styles are semibold, and Display, Heading and Body styles are regular. To change the weight, add one more class:',
        { list: [
          '`mz-text-default` uses the normal weight, currently regular.',
          '`mz-text-emphasis` uses the strong weight, currently semibold.',
        ] },
        "“Default” here means the theme's normal weight, not the style's own weight. Adding `mz-text-default` to a Label style makes it lighter. A brand theme can change both weights, for example to light and extra bold.",
      ],
    },
    {
      key: 'plainHtmlElements',
      title: 'Plain HTML elements',
      intro: ["Text without a style class still gets a style, so it never falls back to the browser's defaults. Any class you add replaces it."],
    },
    { key: 'sizesOnSmallScreens', title: 'Sizes on small screens' },
    { key: 'lineHeight', title: 'Line height' },
    {
      key: 'tokenReference',
      title: 'Token reference',
      intro: ["Tokens are named CSS values, written as custom properties such as `--font-size-body-md`. Each style reads its size and line height from tokens, and shares its role's font, weight, letter spacing and capitalisation tokens, so a product theme can change the values without changing the class names."],
    },
  ],
}

// Copy the page places around its live parts: after a code sample or table, or in the
// guidance boxes that have no introduction. {bodyLineHeight} is replaced with the live value.
export const textStylesPartCopy = {
  afterQuickStartCode: [
    'A text style only changes how text looks. Choose the HTML element for its meaning: a section heading is still an `h2`, even if you want it to look small.',
    "Every class starts with `mz-`, short for Mezzanine, so it cannot clash with your product's own class names.",
  ],
  afterRolesTable: ['Heading and Title both label content, but in different places. Use Heading for the outline of a page and Title inside a component. A Title can be smaller than the smallest Heading.'],
  afterWeightTable: ['These classes only change appearance. When words are genuinely important, use the `strong` or `em` element so assistive technology knows too.'],
  sizesOnSmallScreens: [
    'Display and Heading styles grow with the width of the screen. They use the smaller size in the All styles tables on a phone and the larger size on a wide screen. Title, Body and Label styles stay the same size at every width.',
    "Every size also follows the reader's browser text setting, so text gets bigger for people who enlarge it.",
  ],
  lineHeight: [
    'Line height is the height of each line of text. Every text style includes its own, so you never need to set it.',
    'The values are plain numbers that multiply the font size. Body medium uses `{bodyLineHeight}`, so 16px text gets 24px lines. Because the value has no unit, lines stay in proportion when text is enlarged.',
    'Line height is not the space between paragraphs or list items. That space comes from margins.',
  ],
  tokenDisclosureLabel: 'Show all text style tokens',
  choiceSeparator: ' or ',
} satisfies Record<string, Copy | readonly Copy[]>

export const quickStartCode = `<h1 className="mz-text-heading-lg">Page title</h1>
<p className="mz-text-body-md">A paragraph of reading text.</p>`

export const textRoles: TextRoleDefinition[] = [
  { id: 'display', label: 'Display', purpose: 'Short, eye-catching text, such as a hero headline.' },
  { id: 'heading', label: 'Heading', purpose: 'Page titles and section headings.' },
  { id: 'title', label: 'Title', purpose: 'Headings inside components, such as cards, panels and dialogs.' },
  { id: 'body', label: 'Body', purpose: 'Paragraphs, lists, descriptions and most reading text.' },
  { id: 'label', label: 'Label', purpose: 'Short text on controls: buttons, tabs, navigation, form labels and badges.' },
]

export const typographyStyles: TypographyStyleDefinition[] = [
  { className: 'mz-text-display-lg', role: 'display', label: 'Display large', purpose: 'Very prominent, short text in a spacious hero.' },
  { className: 'mz-text-display-md', role: 'display', label: 'Display medium', purpose: 'Prominent, short text in a hero or marketing section.' },
  { className: 'mz-text-display-sm', role: 'display', label: 'Display small', purpose: 'Short display text where less space is available.' },
  { className: 'mz-text-heading-lg', role: 'heading', label: 'Heading large', purpose: 'A page title or top-level content heading.' },
  { className: 'mz-text-heading-md', role: 'heading', label: 'Heading medium', purpose: 'A major section heading.' },
  { className: 'mz-text-heading-sm', role: 'heading', label: 'Heading small', purpose: 'A subsection heading.' },
  { className: 'mz-text-title-lg', role: 'title', label: 'Title large', purpose: 'A prominent component or panel title.' },
  { className: 'mz-text-title-md', role: 'title', label: 'Title medium', purpose: 'A standard component or panel title.' },
  { className: 'mz-text-title-sm', role: 'title', label: 'Title small', purpose: 'A compact component or grouped-content title.' },
  { className: 'mz-text-body-lg', role: 'body', label: 'Body large', purpose: 'Introductory copy that needs additional prominence.' },
  { className: 'mz-text-body-md', role: 'body', label: 'Body medium', purpose: 'Paragraphs and ordinary interface content.' },
  { className: 'mz-text-body-sm', role: 'body', label: 'Body small', purpose: 'Supporting information, descriptions, and captions.' },
  { className: 'mz-text-label-lg', role: 'label', label: 'Label large', purpose: 'Standard controls and navigation labels.' },
  { className: 'mz-text-label-md', role: 'label', label: 'Label medium', purpose: 'Compact controls, badges, and metadata.' },
  { className: 'mz-text-label-sm', role: 'label', label: 'Label small', purpose: 'Supplementary labels where space is constrained.' },
]

// Each role's family and weight, as set in src/typography.css.
const textRoleFonts: { id: TextRole; fontFamilyToken: string; fontWeightToken: string }[] = [
  { id: 'display', fontFamilyToken: '--font-family-heading', fontWeightToken: '--font-weight-regular' },
  { id: 'heading', fontFamilyToken: '--font-family-heading', fontWeightToken: '--font-weight-regular' },
  { id: 'title', fontFamilyToken: '--font-family-body', fontWeightToken: '--font-weight-semibold' },
  { id: 'body', fontFamilyToken: '--font-family-body', fontWeightToken: '--font-weight-regular' },
  { id: 'label', fontFamilyToken: '--font-family-body', fontWeightToken: '--font-weight-semibold' },
]

export const textRoleTokens = textRoleFonts.map((role) => ({
  ...role,
  label: textRoles.find((textRole) => textRole.id === role.id)?.label ?? role.id,
  letterSpacingToken: `--letter-spacing-${role.id}`,
  textTransformToken: `--text-transform-${role.id}`,
}))

export const fontTokens: { token: string; purpose: string }[] = [
  { token: '--font-family-body', purpose: 'Font for Title, Body and Label styles and for plain body text.' },
  { token: '--font-family-heading', purpose: 'Font for Display and Heading styles. It uses the body font unless a theme changes it.' },
  { token: '--font-family-monospace', purpose: 'Font for code.' },
  { token: '--font-weight-regular', purpose: 'Regular weight, used by Display, Heading and Body styles.' },
  { token: '--font-weight-medium', purpose: 'Medium weight. No text style uses it.' },
  { token: '--font-weight-semibold', purpose: 'Semibold weight, used by Title and Label styles.' },
  { token: '--font-weight-bold', purpose: 'Bold weight. No text style uses it.' },
]

export const typographyStyleTokens = typographyStyles.map((style) => {
  const roleAndSize = style.className.replace('mz-text-', '')
  return {
    ...style,
    fontSizeToken: `--font-size-${roleAndSize}`,
    lineHeightToken: `--line-height-${roleAndSize}`,
  }
})

// Shown as the Pattern mappings table in src/docs/TYPOGRAPHY.md; check:rules keeps the two identical.
export const textStyleChoices: { use: string; classNames: string[] }[] = [
  { use: 'Hero headline', classNames: ['mz-text-display-lg', 'mz-text-display-md'] },
  { use: 'Large number or metric', classNames: ['mz-text-display-sm'] },
  { use: 'Page title', classNames: ['mz-text-heading-lg'] },
  { use: 'Section heading', classNames: ['mz-text-heading-md'] },
  { use: 'Subsection heading', classNames: ['mz-text-heading-sm'] },
  { use: 'Dialog title', classNames: ['mz-text-title-lg'] },
  { use: 'Heading inside a card or panel', classNames: ['mz-text-title-md'] },
  { use: 'Introductory paragraph', classNames: ['mz-text-body-lg'] },
  { use: 'Paragraphs and normal reading', classNames: ['mz-text-body-md'] },
  { use: 'Supporting text, captions and validation messages', classNames: ['mz-text-body-sm'] },
  { use: 'Button, tab or form label', classNames: ['mz-text-label-lg'] },
  { use: 'Navigation item or disclosure header', classNames: ['mz-text-title-sm'] },
  { use: 'Badge, section label or compact metadata', classNames: ['mz-text-label-md'] },
]

export const textWeightExamples: { classNames: string; result: string }[] = [
  { classNames: 'mz-text-label-lg', result: 'Label large on its own' },
  { classNames: 'mz-text-label-lg mz-text-default', result: 'Label large with Default' },
  { classNames: 'mz-text-body-md', result: 'Body medium on its own' },
  { classNames: 'mz-text-body-md mz-text-emphasis', result: 'Body medium with Emphasis' },
]

export const baseTextElements: { element: string; className: string; label: string }[] = [
  { element: 'body', className: 'mz-text-body-md', label: 'Body medium' },
  { element: 'h1', className: 'mz-text-heading-lg', label: 'Heading large' },
  { element: 'h2', className: 'mz-text-heading-md', label: 'Heading medium' },
  { element: 'h3', className: 'mz-text-heading-sm', label: 'Heading small' },
  { element: 'h4', className: 'mz-text-title-lg', label: 'Title large' },
  { element: 'h5', className: 'mz-text-title-md', label: 'Title medium' },
  { element: 'h6', className: 'mz-text-title-sm', label: 'Title small' },
]
