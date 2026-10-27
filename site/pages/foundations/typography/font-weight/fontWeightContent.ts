import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const fontWeightContent: DocsPageContent = {
  id: 'font-weight',
  kind: 'foundation',
  title: 'Font weight',
  description: 'Styling text so that it’s lighter, or bold.',
  sections: [
    {
      key: 'howFontWeightsAreUsed',
      title: 'How font weights are used',
      intro: [
        'Mezzanine’s default [text styles](/typography/text-styles) apply different font weights to different text roles. You can change font weights by using the following classes:',
        { list: [
          '`mz-text-light`',
          '`mz-text-regular`',
          '`mz-text-semibold`',
          '`mz-text-bold`',
        ] },
        'Each class is a genuine font weight, so `mz-text-bold` is always bold.',
      ],
    },
    {
      key: 'italics',
      title: 'Italics',
      body: ['`<em>` and `<i>` are shown in italics. If the typeface has a true italic, that’s what appears. If it doesn’t, the browser slants the regular letters instead, which is called oblique.'],
    },
  ],
  technicalDetails: [{ key: 'tokens' }],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Text rendering', href: '/typography/text-rendering' },
  ],
}

// The signature notice after the examples table, as a bulleted list.
export const fontWeightNotice = [
  'Not every font has every weight: a font without a light weight shows regular instead.',
  'Font weight classes change only how text looks. To add semantic meaning to the text, `<strong>` and `<em>` should be used: see [Semantic HTML](/typography/semantic-html).',
]
