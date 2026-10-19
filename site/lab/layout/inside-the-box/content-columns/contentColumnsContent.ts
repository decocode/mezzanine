// The Lab's Content columns page, in Inside the box: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const contentColumnsPage: StagePage = {
  key: 'contentColumns', id: 'lab-content-columns', kind: 'foundation', stage: 'insideTheBox', title: 'Content columns', href: '/site/lab/layout/inside-the-box/content-columns',
  description: 'When content flows into columns, like a newspaper.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Content columns makes information flow like it does in printed media such as newspapers. Once the content fills the first column from top to bottom, it then carries on at the top of the next column. You choose a width for the columns, and the browser works out how many will fit.',
        'It suits short content, such as a list of links. For long text it’s awkward on a screen, because readers have to scroll back up to start each new column. Cards and pictures can be split across two columns unless each one has `break-inside: avoid`. Their order also runs down each column, not across, so a grid of cards is better built with CSS Grid.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Multi-column layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout' },
    { label: 'MDN: break-inside', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const contentColumnsCssNotes: Record<string, CssNote> = {
  contentColumns: {
    paragraphs: [
      'The `columns` property says how wide a column should be, at least 12rem here. The browser fits in as many as it can, and shares out any space that’s left.',
      'The `column-gap` sets the space between columns, and `column-rule` draws a line in the middle of each gap.',
    ],
    code: `.lab-content-columns {
  columns: 12rem;
  column-gap: var(--space-6);
  column-rule: 1px solid var(--color-border);
}`,
  },
}
