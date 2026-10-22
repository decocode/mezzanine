// The Aspect ratio page, in Foundations › Dimension › Size: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const aspectRatioContent: DocsPageContent = {
  id: 'aspect-ratio', kind: 'foundation', title: 'Aspect ratio',
  description: 'When a picture is cropped to a set shape.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Aspect ratio gives an element a fixed shape, such as 16:9, and crops the picture inside to fill it.',
        'Pictures from different places come in different shapes. A shared aspect ratio lines them up as a tidy set, without squashing any of them.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Frame', href: 'https://every-layout.dev/layouts/frame/' },
    { label: 'Bedrock: Frame', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/frame' },
    { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio' },
    { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit' },
  ],
}

// The picture's text alternative.
export const aspectRatioImageAlt = 'Example picture: a dark square and a grey circle on a light background'

// What the example's CSS does. The code is copied from aspectRatio.css, and a browser test checks
// that it still matches.
export const aspectRatioCssNotes: Record<string, CssNote> = {
  aspectRatio: {
    paragraphs: [
      'The `aspect-ratio` gives the frame its shape, and `overflow: hidden` crops anything that sticks out.',
      'The picture fills the whole frame, and `object-fit: cover` crops its edges rather than squashing it. The sizes use logical names: inline means along a line of text, and block means across it.',
    ],
    code: `.aspect-ratio-frame {
  aspect-ratio: var(--_aspect-ratio);
  overflow: hidden;
}

.aspect-ratio-frame > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}`,
  },
}
