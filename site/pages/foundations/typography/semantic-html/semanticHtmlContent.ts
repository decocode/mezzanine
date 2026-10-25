import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Semantic HTML page: the styles plain HTML elements get,
// and inline code. {inlineCodePaddingBlock}, {inlineCodePaddingInline} and {inlineCodeBorderRadius}
// are replaced with the live values of the tokens they follow.
export const semanticHtmlContent: DocsPageContent = {
  id: 'semantic-html',
  kind: 'foundation',
  title: 'Semantic HTML',
  description: 'When plain HTML elements get a style without a class.',
  sections: [
    {
      key: 'plainHtmlElements',
      title: 'Plain HTML elements',
      intro: ["Text without a style class still gets a style, so it never falls back to the browser's defaults. Any class you add replaces it."],
    },
    {
      key: 'inlineCode',
      title: 'Inline code',
      body: [
        'Inline code uses `<code>` to identify tokens, property names, values and other technical text within a sentence. A monospace font and contrasting background distinguish it from the surrounding text.',
        'The padding comes from `--inline-code-padding-block` (currently `{inlineCodePaddingBlock}`) and `--inline-code-padding-inline` (currently `{inlineCodePaddingInline}`), and the corner rounding from `--inline-code-border-radius` (currently `{inlineCodeBorderRadius}`). Inline code uses `--font-family-monospace` at the Body small size.',
        'Code inside `<pre>` retains the monospace font without the inline background or padding. For a block of code, use the [Code block](/code-block) component.',
      ],
    },
  ],
  relatedPages: [
    { label: 'Code block', href: '/code-block' },
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Choosing a style', href: '/typography/choosing-a-style' },
  ],
}
