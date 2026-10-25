import type { DocsPageContent } from '../../../../../templates/docsPageContent'

export const weightAndEmphasisContent: DocsPageContent = {
  id: 'weight-and-emphasis',
  kind: 'foundation',
  title: 'Weight and emphasis',
  description: 'When text needs to be lighter or bolder, and keep its weight on screen.',
  sections: [
    {
      key: 'lighterAndBolderText',
      title: 'Lighter and bolder text',
      intro: [
        'On their own, Title and Label styles are semibold, and Display, Heading and Body styles are regular. One more class makes any style lighter or bolder:',
        { list: [
          '`mz-text-default` uses the normal weight, currently regular.',
          '`mz-text-emphasis` uses the strong weight, currently semibold.',
        ] },
        "“Default” here means the theme's normal weight, not the style's own weight. Adding `mz-text-default` to a Label style makes it lighter. A brand theme can change both weights, for example to light and extra bold.",
      ],
    },
    {
      key: 'weightOnScreen',
      title: 'Weight on screen',
      body: [
        'On a Mac, browsers draw text slightly heavier than its weight by default, and light text on a dark background looks bolder still. Text is drawn with the thinner rendering instead (`-webkit-font-smoothing: antialiased`), so it keeps its intended weight. Other systems ignore the setting.',
        'In the Dark theme, text is a soft light grey rather than pure white. Very bright text on a near-black background seems to glow, which makes it harder to read for long.',
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Weight and emphasis CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: '-webkit-font-smoothing', description: '`antialiased`, the thinner text rendering on macOS. `-moz-osx-font-smoothing: grayscale` does the same in Firefox.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
}
