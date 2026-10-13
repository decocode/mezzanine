interface TypographyStyleDefinition {
  className: string
  label: string
  purpose: string
}

export const typographyStyles: TypographyStyleDefinition[] = [
  { className: 'mz-text-display-lg', label: 'Display large', purpose: 'Very prominent, short text in a spacious hero.' },
  { className: 'mz-text-display-md', label: 'Display medium', purpose: 'Prominent, short text in a hero or marketing section.' },
  { className: 'mz-text-display-sm', label: 'Display small', purpose: 'Short display text where less space is available.' },
  { className: 'mz-text-heading-lg', label: 'Heading large', purpose: 'A page title or top-level content heading.' },
  { className: 'mz-text-heading-md', label: 'Heading medium', purpose: 'A major section heading.' },
  { className: 'mz-text-heading-sm', label: 'Heading small', purpose: 'A subsection heading.' },
  { className: 'mz-text-title-lg', label: 'Title large', purpose: 'A prominent component or panel title.' },
  { className: 'mz-text-title-md', label: 'Title medium', purpose: 'A standard component or panel title.' },
  { className: 'mz-text-title-sm', label: 'Title small', purpose: 'A compact component or grouped-content title.' },
  { className: 'mz-text-body-lg', label: 'Body large', purpose: 'Introductory copy that needs additional prominence.' },
  { className: 'mz-text-body-md', label: 'Body medium', purpose: 'Paragraphs and ordinary interface content.' },
  { className: 'mz-text-body-sm', label: 'Body small', purpose: 'Supporting information, descriptions, and captions.' },
  { className: 'mz-text-label-lg', label: 'Label large', purpose: 'Standard controls and navigation labels.' },
  { className: 'mz-text-label-md', label: 'Label medium', purpose: 'Compact controls, badges, and metadata.' },
  { className: 'mz-text-label-sm', label: 'Label small', purpose: 'Supplementary labels where space is constrained.' },
]

export const typographyStyleTokens = typographyStyles.map((style) => {
  const roleAndSize = style.className.replace('mz-text-', '')
  return {
    ...style,
    fontSizeToken: `--font-size-${roleAndSize}`,
    lineHeightToken: `--line-height-${roleAndSize}`,
  }
})
