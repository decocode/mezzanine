import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Semantic HTML page: the styles plain HTML elements get,
// lists and inline code. {listItemSpacing}, {listIndent}, {inlineCodePaddingBlock}, {inlineCodePaddingInline} and {inlineCodeBorderRadius}
// are replaced with the live values of the tokens they follow.
// The Lists example: two items, the second holding a nested list.
export const listExample = {
  items: ['List item A', 'List item B'],
  nested: ['List item C', 'List item D'],
} as const

// The teaching labels in the description list, emphasis and quote examples.
export const semanticExamples = {
  terms: [{ term: 'Term A', description: 'Description A explains term A.' }, { term: 'Term B', description: 'Description B explains term B.' }],
  quotation: 'Quotation A is set apart from the text around it.',
  inlineQuotation: 'quotation B',
} as const

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
      key: 'lists',
      title: 'Lists',
      intro: ['A list sits in running text like a paragraph. Give it a body text class, such as `mz-text-body-md`, and its items sit `--space-2` apart (currently `{listItemSpacing}`), with each nested level indented by `--space-6` (currently `{listIndent}`).'],
    },
    {
      key: 'descriptionLists',
      title: 'Description lists',
      intro: ['A description list, `<dl>`, pairs terms (`<dt>`) with their descriptions (`<dd>`), as in a glossary or a set of details. Each term is semibold, with its description under it and no indent, and a new term starts clear of the description before it, so each pair reads as one.'],
    },
    {
      key: 'inlineEmphasis',
      title: 'Inline emphasis',
      intro: [
        '`<strong>` marks words as important, in the semibold weight, and `<em>` stresses them, in italics. `<mark>` highlights them, such as a match in search results, with a tint that follows the theme.',
        'To make text bolder for its look alone, without changing its meaning, use a weight class, such as `mz-text-semibold`: see [Font weight](/typography/font-weight).',
      ],
    },
    {
      key: 'quotes',
      title: 'Quotes',
      intro: ['`<blockquote>` holds a quotation set apart from the text around it, and `<q>` holds a short quotation inside a sentence. A line along its start edge sets a blockquote apart, and the browser puts quotation marks around `<q>`, choosing marks that suit the page’s language.'],
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
  references: [
    { label: 'MDN: The description list element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl' },
    { label: 'MDN: The mark text element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark' },
    { label: 'MDN: The block quotation element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote' },
    { label: 'MDN: The unordered list element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul' },
    { label: 'MDN: The ordered list element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol' },
  ],
  relatedPages: [
    { label: 'Code block', href: '/code-block' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
}
