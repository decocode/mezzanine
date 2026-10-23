// The Lab's Types of box page, in Layout: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LayoutChildPage } from '../../shared/labTypes'

export const typesOfBoxPage: LayoutChildPage = {
  key: 'typesOfBox', id: 'lab-types-of-box', kind: 'foundation', title: 'Types of box', href: '/site/lab/layout/types-of-box',
  description: 'When boxes decide whether to stack up or line up.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Every box is a type, set with the display property. A block box starts a new row and fills the width of its parent. An inline box sits in a row with its neighbours and wraps like words. An inline-block box sits in a row too, but takes a width, height and padding like a block. And display: none removes a box completely, even for screen readers.',
        'Left alone, block boxes stack one above another and inline boxes line up in rows. This natural arrangement is called normal flow, and it follows the order of the HTML, which is also the order keyboards and screen readers follow. A box can also arrange the boxes inside it, with `display: flex` or `display: grid`, which Side by side and Grids and columns explain.',
      ],
    },
    { key: 'example' },
  ],
  relatedPages: [
    { label: 'Layout', href: '/layout' },
    { label: 'Grids and columns', href: '/site/lab/layout/grids-and-columns' },
  ],
  references: [
    { label: 'MDN: display', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display' },
    { label: 'MDN: Block and inline layout in normal flow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_and_inline_layout' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const typesOfBoxCssNotes: Record<string, CssNote> = {
  normalFlow: {
    paragraphs: [
      'The `display` property decides how a box joins the flow. The buttons switch it between three values.',
      'With `block`, each box starts on its own line. With `inline`, the boxes sit in the line of text, and their padding can overlap the lines above and below. With `inline-block`, they sit in the line but take up their full size, padding included. With `none`, they disappear, and screen readers skip them too.',
    ],
    code: `.lab-flow-item {
  display: var(--lab-flow-display);
  padding: var(--space-2);
  border: var(--border-width-baseline) solid var(--color-accent);
  background: var(--color-accent-muted);
}`,
  },
}
