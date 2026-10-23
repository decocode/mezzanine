// The Lab's Filling the box page, in Layout: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LayoutChildPage } from '../../shared/labTypes'

export const fillingTheBoxPage: LayoutChildPage = {
  key: 'fillingTheBox', id: 'lab-filling-the-box', kind: 'foundation', title: 'Filling the box', href: '/site/lab/layout/filling-the-box',
  description: 'When pictures fill their box.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Pictures and videos are boxes too, but they arrive with a size of their own, which can be bigger than the space they’re given. A few properties keep them inside their box and in proportion.',
        'An image wider than a phone screen pushes the whole page sideways, and an image squashed into the wrong shape looks broken. Every picture also needs alt text in the HTML, so people who can’t see it still get its meaning.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit' },
    { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const fillingTheBoxCssNotes: Record<string, CssNote> = {
  imageFit: {
    paragraphs: [
      'The rule `max-width: 100%` lets an image shrink to fit its box, but never grow past its own size.',
      'Setting `height: auto` keeps the proportions as the width changes, so the picture is never squashed.',
    ],
    code: `.lab-image-fit {
  max-width: 100%;
  height: auto;
}`,
  },
  objectFit: {
    paragraphs: [
      'The `aspect-ratio` property gives the box a shape, here `1`, a square, so its height follows its width.',
      'The `object-fit` property decides how the picture fills that shape: `fill` stretches it, `contain` fits it all in and leaves gaps, and `cover` fills the shape and crops the edges.',
    ],
    code: `.lab-object-fit {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: var(--lab-object-fit);
  border: var(--border-width-baseline) solid var(--color-text);
}`,
  },
}
