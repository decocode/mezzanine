// The Lab's Hero page, in One below another: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const heroPage: StagePage = {
  key: 'hero', id: 'lab-hero', stage: 'oneBelowAnother', title: 'Hero', href: '/site/lab/layout/one-below-another/hero',
  subtitle: 'When one item takes centre stage, like the title on a book cover.',
  what: 'Hero is a tall box, like the opening section of a homepage. One item sits in the middle, and anything before or after it is pushed to the top and bottom edges, like the title, publisher and author on a book cover.',
  why: 'The box has a minimum height, not a fixed one, so if the content needs more room, such as on a small phone or with enlarged text, the box grows instead of cutting anything off.',
  similarTo: [everyLayout('Cover', 'cover'), bedrock('Cover', 'cover')],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const heroCssNotes: Record<string, CssNote> = {
  hero: {
    paragraphs: [
      'The rule `display: flex` makes the box a Flexbox, which lines its items up in one direction, and `flex-direction: column` makes that direction top to bottom. The box has a minimum height, `min-block-size`, so it’s at least 20rem tall but can grow.',
      'The centred item gets `margin-block: auto`, an automatic margin above and below. Automatic margins soak up all the spare room, so the item ends up in the middle, and anything before or after it is pushed to the top and bottom.',
    ],
    code: `.lab-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-block-size: var(--lab-hero-min, 20rem);
  padding: var(--space-4);
}

.lab-hero-centre {
  margin-block: auto;
}`,
  },
}
