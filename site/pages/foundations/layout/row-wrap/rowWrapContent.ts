// The Row wrap page, in Foundations › Layout: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const rowWrapContent: DocsPageContent = {
  id: 'row-wrap', kind: 'foundation', title: 'Row wrap',
  description: 'When squeezed items move onto a spacious new row.',
  alsoKnownAs: [
    { where: 'Figma', called: 'Auto layout, horizontal, with Wrap.' },
    { where: 'CSS', called: 'Flexbox with `flex-wrap: wrap`. CSS has no single name for this pattern.' },
    { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `gap` for the space. There’s no named pattern.' },
    { where: 'Material Design', called: 'A chip set: a group of chips that wraps onto new rows.' },
  ],
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row wrap moves items onto a new row when they no longer fit. The word “wrap” is borrowed from how words in a sentence behave. Each item keeps its own width, so the rows can end at different places.',
        'Row wrap is useful for small items that come in any number and any length, such as tags, Badges and filter buttons. Every item stays visible, with the same space between each one.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Cluster', href: 'https://every-layout.dev/layouts/cluster/' },
    { label: 'Bedrock: InlineCluster', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/inline-cluster' },
    { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
    { label: 'MDN: flex-wrap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-wrap' },
    { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
    { label: 'Material Design: Chips', href: 'https://m3.material.io/components/chips/overview' },
  ],
}

// What the example's CSS does. The code is copied from sideBySide.css, and a browser test checks
// that it still matches.
export const rowWrapCssNotes: Record<string, CssNote> = {
  rowWrap: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox row. The key line is `flex-wrap: wrap`: when the row runs out of room, the next item moves onto a new line instead of squashing or overflowing, just like words in a sentence.',
      'Setting `align-items: center` lines up items of different heights, and `gap` spaces them both along each line and between lines.',
    ],
    code: `.row-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}`,
  },
}
