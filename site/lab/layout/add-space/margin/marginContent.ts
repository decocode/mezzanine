// The Lab's Margin page, in Add space: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const marginPage: StagePage = {
  key: 'margin', id: 'lab-margin', kind: 'foundation', stage: 'addSpace', title: 'Margin', href: '/site/lab/layout/add-space/margin',
  description: 'When boxes assert their need for personal space.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Margin is a way to add space outside of a box. It pushes other boxes away, including from the edge of its parent box, if the parent has a border or padding.',
        'When one box sits above another and both have a margin, the browser uses only the larger of the two. This is called “margin collapsing”.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: margin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin' },
    { label: 'MDN: Mastering margin collapsing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const marginCssNotes: Record<string, CssNote> = {
  margin: {
    paragraphs: [
      'Each box has a `margin`, so it keeps its distance on every side, including from the dashed edge. Where two margins meet top to bottom, the browser uses only the larger one.',
    ],
    code: `.lab-spacing-margin > * {
  margin: var(--space-4);
}`,
  },
}
