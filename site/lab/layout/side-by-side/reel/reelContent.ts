// The Lab's Reel page, in Side by side: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const reelPage: StagePage = {
  key: 'reel', id: 'lab-reel', kind: 'foundation', stage: 'sideBySide', title: 'Reel', href: '/site/lab/layout/side-by-side/reel',
  description: 'When a row scrolls sideways.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Reel is a row of items that scrolls sideways, like a conga line going off the edge of the screen.',
        'It shows lots of items without wrapping them onto new rows. Keyboard users need to reach it too, so the scrolling area can take focus and has a name.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Reel', 'reel'),
    bedrock('Reel', 'reel'),
  ],
}

// Example copy with a link to another Lab page.
export const reelExampleLinkText = 'The reel scrolls sideways. Keyboard users reach it with Tab and scroll it with the arrow keys. The scrolling comes from overflow: see [Overflowing the box](/site/lab/layout/inside-the-box/overflowing-the-box).'

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const reelCssNotes: Record<string, CssNote> = {
  reel: {
    paragraphs: [
      'The rule `display: flex` makes the reel a Flexbox row. A Flexbox doesn’t wrap unless `flex-wrap` says so, so the items stay on one line, and `overflow-x: auto` lets it scroll sideways when they don’t fit.',
      'Each item has `flex: 0 0 12rem`. The `flex` property sets three things at once: `flex-grow`, `flex-shrink` and `flex-basis`. Here that means: don’t grow, don’t shrink, and start at 12rem. That keeps every item the same width, however many there are.',
    ],
    code: `.lab-reel {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  padding-block-end: var(--space-2);
}

.lab-reel > * {
  flex: 0 0 var(--lab-reel-item, 12rem);
}`,
  },
}
