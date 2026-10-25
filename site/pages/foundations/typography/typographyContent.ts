import type { Copy, DocsPageContent } from '../../../templates/docsPageContent'

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
}

// The Typography page: why shared text styles matter, with a card for each child page. The data
// below is shared by the child pages.
export const typographyContent: DocsPageContent = {
  id: 'typography',
  kind: 'foundation',
  title: 'Typography',
  description: 'Text in lots of slightly different sizes and weights is hard to scan. A small set of shared text styles keeps every page clear and consistent.',
  sections: [{ key: 'pages', title: 'Using typography' }],
}

// Each card's description is its page's subtitle, except Global and languages, which has none.
export const typographyPages = [
  { label: 'Typeface and fonts', href: '/typography/typeface-and-fonts', description: 'When text uses each device’s own interface font.' },
  { label: 'Size and scaling', href: '/typography/size-and-scaling', description: 'When text comes in a few set sizes, and headings grow and shrink with the screen.' },
  { label: 'Font weight', href: '/typography/font-weight', description: 'Styling text so that it’s lighter, or bold.' },
  { label: 'Spacing and rhythm', href: '/typography/spacing-and-rhythm', description: 'Text that belongs together sits together.' },
  { label: 'Lines and words', href: '/typography/lines-and-words', description: 'Lines of text stay comfortable to read, however wide the space.' },
  { label: 'Text styles', href: '/typography/text-styles', description: 'When every heading, paragraph and label looks consistent, wherever it appears.' },
  { label: 'Semantic HTML', href: '/typography/semantic-html', description: 'When plain HTML elements get a style without a class.' },
  { label: 'Global and languages', href: '/typography/global-and-languages', description: 'Text and layouts that work in every language, whichever direction it’s written in.' },
  { label: 'Text rendering', href: '/typography/text-rendering', description: 'When text keeps its intended weight on screen.' },
]

// Copy the pages place around their live parts: after a table, or between a style's class names.
export const textStylesPartCopy = {
  choiceSeparator: ' or ',
} satisfies Record<string, Copy | readonly Copy[]>

export const textRoles: TextRoleDefinition[] = [
  { id: 'display', label: 'Display', purpose: 'Short, eye-catching text, such as a hero headline.' },
  { id: 'heading', label: 'Heading', purpose: 'Page titles and section headings.' },
  { id: 'title', label: 'Title', purpose: 'Headings inside components, such as cards, panels and dialogs.' },
  { id: 'body', label: 'Body', purpose: 'Paragraphs, lists, descriptions and most reading text.' },
  { id: 'label', label: 'Label', purpose: 'Short text on controls: buttons, tabs, navigation, form labels and badges.' },
]

export const typographyStyles: TypographyStyleDefinition[] = [
  { className: 'mz-text-display-lg', role: 'display', label: 'Display large' },
  { className: 'mz-text-display-md', role: 'display', label: 'Display medium' },
  { className: 'mz-text-display-sm', role: 'display', label: 'Display small' },
  { className: 'mz-text-heading-lg', role: 'heading', label: 'Heading large' },
  { className: 'mz-text-heading-md', role: 'heading', label: 'Heading medium' },
  { className: 'mz-text-heading-sm', role: 'heading', label: 'Heading small' },
  { className: 'mz-text-title-lg', role: 'title', label: 'Title large' },
  { className: 'mz-text-title-md', role: 'title', label: 'Title medium' },
  { className: 'mz-text-title-sm', role: 'title', label: 'Title small' },
  { className: 'mz-text-body-lg', role: 'body', label: 'Body large' },
  { className: 'mz-text-body-md', role: 'body', label: 'Body medium' },
  { className: 'mz-text-body-sm', role: 'body', label: 'Body small' },
  { className: 'mz-text-label-lg', role: 'label', label: 'Label large' },
  { className: 'mz-text-label-md', role: 'label', label: 'Label medium' },
  { className: 'mz-text-label-sm', role: 'label', label: 'Label small' },
]

// Each role's family and weight, as set in src/styles/typography.css.
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
  { token: '--font-weight-light', purpose: 'Light weight. No text style uses it.' },
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
  { use: 'Navigation item', classNames: ['mz-text-body-sm'] },
  { use: 'Disclosure header', classNames: ['mz-text-title-sm'] },
  { use: 'Badge, section label or compact metadata', classNames: ['mz-text-label-md'] },
]

export const textWeightExamples: { classNames: string; result: string }[] = [
  { classNames: 'mz-text-body-md mz-text-light', result: 'Body medium, light' },
  { classNames: 'mz-text-body-md', result: 'Body medium on its own, regular' },
  { classNames: 'mz-text-body-md mz-text-semibold', result: 'Body medium, semibold' },
  { classNames: 'mz-text-body-md mz-text-bold', result: 'Body medium, bold' },
  { classNames: 'mz-text-label-lg', result: 'Label large on its own, semibold' },
  { classNames: 'mz-text-label-lg mz-text-regular', result: 'Label large, regular' },
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
