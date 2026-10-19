// The Lab's Row wrap page, in Side by side: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const rowWrapPage: StagePage = {
  key: 'rowWrap', id: 'lab-row-wrap', kind: 'foundation', stage: 'sideBySide', title: 'Row wrap', href: '/site/lab/layout/side-by-side/row-wrap',
  description: 'When squeezed boxes enjoy a spacious new row.',
  alsoKnownAs: [
    { where: 'Figma', called: 'Auto layout, horizontal, with Wrap.' },
    { where: 'CSS', called: 'Flexbox with `flex-wrap: wrap`. CSS has no single name for this pattern.' },
    { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `gap` for the space. There’s no named pattern.' },
    { where: 'Bootstrap', called: '`d-flex flex-wrap` on the parent, with a `gap` utility. There’s no named pattern.' },
    { where: 'Material Design', called: 'A chip set: a group of chips that wraps onto new rows.' },
  ],
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row wrap moves boxes into a new row when they no longer fit. The word “wrap” is borrowed from how words in a string of text behave. Each box keeps its own width, so the rows can end at different places.',
        'Row wrap is useful for small items that come in any number and any length, such as tags, Badges and filter buttons. Every item stays visible, with the same space between each one.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Cluster', 'cluster'),
    bedrock('InlineCluster', 'inline-cluster'),
    { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
    { label: 'MDN: flex-wrap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap' },
    { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
    { label: 'Bootstrap: Flex', href: 'https://getbootstrap.com/docs/5.3/utilities/flex/' },
    { label: 'Material Design: Chips', href: 'https://m3.material.io/components/chips/overview' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const rowWrapCssNotes: Record<string, CssNote> = {
  rowWrap: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox row. The key line is `flex-wrap: wrap`: when the row runs out of room, the next item moves onto a new line instead of squashing or overflowing, just like words in a sentence.',
      'Setting `align-items: center` lines up items of different heights, and `gap` spaces them both along each line and between lines.',
    ],
    code: `.lab-row-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lab-row-wrap-space, var(--space-2));
}`,
  },
}
