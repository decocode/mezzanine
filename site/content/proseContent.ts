import type { Copy, DocsPageContent } from '../templates/docsPageContent'

// {listItemSpacing}, {inlineCodePaddingBlock}, {inlineCodePaddingInline} and {inlineCodeBorderRadius}
// are replaced with the live values of the tokens they follow.
export const proseContent: DocsPageContent = {
  id: 'prose',
  kind: 'foundation',
  title: 'Prose',
  description: [
    'Mezzanine’s styling for longer-form content. Lists share the body text styles and spacing tokens; inline code has a distinct treatment within the surrounding text.',
    'The library includes body-styled lists and inline code, but does not yet provide a complete prose container. The section spacing and reading widths on this documentation site are site layout styles, not part of the library.',
  ],
  sections: [
    {
      key: 'lists',
      subsections: [{ id: 'prose-unordered-lists', label: 'Unordered lists' }, { id: 'prose-ordered-lists', label: 'Ordered lists' }],
      title: 'Lists',
      intro: [
        'Unordered lists use bullet points; ordered lists use numbers. Both share the chosen body style’s line height, with `--space-2` between items (currently `{listItemSpacing}`) and `--space-6` indentation at each level. Wrapped lines align with the item text.',
        'Apply a body text class, such as `mz-text-body-md`, to the list to use these styles. Nested lists inherit the same styling.',
      ],
    },
    {
      key: 'inlineCode',
      title: 'Inline code',
      intro: [
        'Inline code uses `<code>` to identify tokens, property names, values and other technical text within a sentence. A monospace font and contrasting background distinguish it from the surrounding text.',
        'The padding comes from `--inline-code-padding-block` (currently `{inlineCodePaddingBlock}`) and `--inline-code-padding-inline` (currently `{inlineCodePaddingInline}`), and the corner rounding from `--inline-code-border-radius` (currently `{inlineCodeBorderRadius}`). Inline code uses `--font-family-monospace` at the Body small size.',
        'Code inside `<pre>` retains the monospace font without the inline background or padding. Code-block layout is supplied by the consuming app.',
      ],
    },
  ],
}

// The two subsections of Lists, each followed by a live example.
export const proseListKinds: readonly { key: 'unordered' | 'ordered'; title: string; intro: Copy }[] = [
  { key: 'unordered', title: 'Unordered lists', intro: 'An unordered list uses `<ul>` to group related items whose order is not significant. Filled bullet points mark the first level; nested items use hollow bullet points and an additional indent.' },
  { key: 'ordered', title: 'Ordered lists', intro: 'An ordered list uses `<ol>` to group items in a meaningful sequence, such as steps or rankings. Numbered markers use the same body style as the list text. Nested lists are indented and restart numbering at 1.' },
]

export const proseExampleTitle = 'Example'
