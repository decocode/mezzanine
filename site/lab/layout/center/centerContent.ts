// The Lab's Center page, in Layout: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LayoutChildPage } from '../../shared/labTypes'
import { everyLayout, bedrock } from '../../shared/labValues'

export const centerPage: LayoutChildPage = {
  key: 'center', id: 'lab-center', kind: 'foundation', title: 'Center', href: '/site/lab/layout/center',
  description: 'When content stays in the middle, at a comfortable width.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Center keeps content in the middle of the space and stops it growing wider than a set limit.',
        'On a wide screen, content stuck to one edge or stretched across the whole width is hard to read. Center fixes both with a single limit, which could be a token.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Center', 'center'),
    bedrock('Center', 'center'),
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const centerCssNotes: Record<string, CssNote> = {
  center: {
    paragraphs: [
      'The `max-inline-size` property caps the width. Inline means along a line of text, so the rule still makes sense in languages written top to bottom.',
      'Setting `margin-inline: auto` shares any leftover space equally on both sides, which centres the content. With `box-sizing: content-box`, any padding added later goes outside the cap, so the content itself keeps its full width.',
    ],
    code: `.lab-center {
  box-sizing: content-box;
  max-inline-size: var(--lab-center-max, 60ch);
  margin-inline: auto;
}`,
  },
}
