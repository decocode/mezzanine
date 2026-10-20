// The Lab's The box model page, in Box basics: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const theBoxModelPage: StagePage = {
  key: 'boxModel', id: 'lab-box-model', kind: 'foundation', stage: 'boxBasics', title: 'The box model', href: '/site/lab/layout/box-basics/the-box-model',
  description: 'When every box is made of content, padding, a border and margin.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Everything on a web page is a box, even a single word or a picture. Each box has four parts, nested like rings in a tree trunk. In the middle is the content. Around it is padding, then a border, then margin on the outside.',
        'Most layout puzzles come down to these four parts. Padding is space inside the box, so it pushes the content in. Margin is space outside the box, so it pushes other boxes away. Once you can picture the parts, you can tell which one to change.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Introduction to the CSS box model', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const theBoxModelCssNotes: Record<string, CssNote> = {
  boxAnatomy: {
    paragraphs: [
      'The `margin` sets the space outside the border, `padding` the space inside it, and `border` the line between them. Each one can also be set for a single side, such as `margin-left` or `padding-top`.',
      'The dashed line is drawn by the box around it, so you can see where the margin ends. Margin itself is always invisible.',
    ],
    code: `.lab-box-anatomy {
  margin: var(--space-6);
  padding: var(--space-6);
  border: var(--border-width-xl) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
}
