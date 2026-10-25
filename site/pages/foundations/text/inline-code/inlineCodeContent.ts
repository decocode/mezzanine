import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Text › Inline code page. {inlineCodePaddingBlock},
// {inlineCodePaddingInline} and {inlineCodeBorderRadius} are replaced with the live values of the tokens
// they follow.
export const inlineCodeContent: DocsPageContent = {
  id: 'inline-code',
  kind: 'foundation',
  title: 'Inline code',
  description: 'When technical text sits inside a sentence.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Inline code uses `<code>` to identify tokens, property names, values and other technical text within a sentence. A monospace font and contrasting background distinguish it from the surrounding text.',
        'The padding comes from `--inline-code-padding-block` (currently `{inlineCodePaddingBlock}`) and `--inline-code-padding-inline` (currently `{inlineCodePaddingInline}`), and the corner rounding from `--inline-code-border-radius` (currently `{inlineCodeBorderRadius}`). Inline code uses `--font-family-monospace` at the Body small size.',
        'Code inside `<pre>` retains the monospace font without the inline background or padding. For a block of code, use the [Code block](/code-block) component.',
      ],
    },
    { key: 'example' },
  ],
  relatedPages: [
    { label: 'Code block', href: '/code-block' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
}
