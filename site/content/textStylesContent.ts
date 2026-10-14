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

export const textStylesIntro = 'A text style is a ready-made set of font settings that you apply with one CSS class. Mezzanine has fifteen, grouped into five roles.'

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
  { use: 'Button, tab, form label or navigation item', classNames: ['mz-text-label-lg'] },
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
