// The Lab's Overflowing the box page, in Inside the box: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const overflowingTheBoxPage: StagePage = {
  key: 'overflowingTheBox', id: 'lab-overflowing-the-box', kind: 'foundation', stage: 'insideTheBox', title: 'Overflowing the box', href: '/site/lab/layout/inside-the-box/overflowing-the-box',
  description: 'When the content doesn’t fit.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Overflow is content that is too big for its box. By default it spills out and draws over whatever comes next. The overflow property chooses what happens instead: hide the extra, or let people scroll to it.',
        'Spilled content overlaps other things, and hidden content is lost. The safest fix is usually to let the box grow. When a box has to stay a fixed size, scrolling keeps the content reachable.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow' },
    { label: 'MDN: overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const overflowingTheBoxCssNotes: Record<string, CssNote> = {
  overflow: {
    paragraphs: [
      'The box has a fixed `height`, so the text can’t make it taller. The `overflow` property decides what happens to the text that doesn’t fit: `visible` lets it spill out, `hidden` cuts it off, `scroll` always adds scroll bars, and `auto` adds them only when they’re needed.',
      'When the box can scroll, it can also take keyboard focus, so people who don’t use a mouse can scroll it with the arrow keys.',
    ],
    code: `.lab-overflow-box {
  width: min(100%, 14rem);
  height: 6rem;
  padding: var(--space-2);
  border: var(--border-width-baseline) solid var(--color-text);
  overflow: var(--lab-overflow);
}`,
  },
}
