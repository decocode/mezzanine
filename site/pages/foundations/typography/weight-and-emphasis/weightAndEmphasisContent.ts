import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const weightAndEmphasisContent: DocsPageContent = {
  id: 'weight-and-emphasis',
  kind: 'foundation',
  title: 'Weight and emphasis',
  description: 'When text needs to be lighter or bolder.',
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
  ],
  technicalDetails: [{ key: 'tokens' }],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Text rendering', href: '/typography/text-rendering' },
  ],
}
