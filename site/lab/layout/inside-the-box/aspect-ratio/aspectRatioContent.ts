// The Lab's Aspect ratio page, in Inside the box: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const aspectRatioPage: StagePage = {
  key: 'aspectRatio', id: 'lab-aspect-ratio', kind: 'foundation', stage: 'insideTheBox', title: 'Aspect ratio', href: '/site/lab/layout/inside-the-box/aspect-ratio',
  description: 'When a picture is cropped to a set shape.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Aspect ratio gives a box a fixed shape, such as 16:9, and crops the picture inside to fill it.',
        'Pictures from different places come in different shapes. A shared aspect ratio lines them up as a tidy set, without squashing any of them.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Frame', 'frame'),
    bedrock('Frame', 'frame'),
    { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
    { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const aspectRatioCssNotes: Record<string, CssNote> = {
  aspectRatio: {
    paragraphs: [
      'The `aspect-ratio` gives the box its shape, and `overflow: hidden` crops anything that sticks out.',
      'The picture fills the whole box, and `object-fit: cover` crops its edges rather than squashing it. The sizes use logical names: inline means along a line of text, and block means across it.',
    ],
    code: `.lab-aspect-ratio {
  aspect-ratio: var(--lab-aspect-ratio, 16 / 9);
  overflow: hidden;
}

.lab-aspect-ratio > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}`,
  },
}
