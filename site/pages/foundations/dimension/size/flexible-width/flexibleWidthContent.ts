import type { DocsPageContent } from '../../../../../templates/docsPageContent'

export const widthLevels = [
  { token: '--width-xs', label: 'Width xs', description: 'Used for components such as [Tabs](/tabs).' },
  { token: '--width-sm', label: 'Width sm', description: 'Used for layouts such as [Ratio pair](/layout/ratio-pair).' },
  { token: '--width-md', label: 'Width md', description: 'Used for components such as [Tooltip](/tooltip) and [Panel](/panel).' },
  { token: '--width-lg', label: 'Width lg', description: 'Used for components such as Modal.' },
]

export const flexibleWidthContent: DocsPageContent = {
  id: 'flexible-width',
  kind: 'foundation',
  title: 'Flexible width',
  description: 'Lots of random widths can make a page seem disorganised. A shared scale of flexible widths helps to keep things tidy and easy to manage.',
  sections: [
    {
      key: 'widthsThatFlex',
      title: 'A width fit for the content',
      body: [
        'In the past, designers used [media queries](/interaction/media-queries) to make widths switch at certain points based on a set of screen sizes. Although better than using fixed widths (which stay the same size no matter what), media queries don’t take into account the space on the page where things are actually placed.',
        'Flexible width works differently. It takes into account that things stretch to fill available space by default. Limits are set for different types of content, so that it can expand and contract without getting squashed or spreading out too far, no matter the screen size.',
      ],
    },
    {
      key: 'usingWidthScale',
      title: 'Using Flexible width',
      body: ['Flexible width is measured in `rem`, so that if text size is increased, width will follow suit.'],
    },
    {
      key: 'fitToContent',
      title: 'Fit the width to the content',
      body: [
        { list: [
          '**Short text, such as a hint or a label:** a small width, so the words stay together and don’t stretch across the page.',
          '**A few sentences or a short form:** a medium or large width, so lines stay comfortable to read. [Reading width](/text/reading-width) explains how long a line should get.',
          '**Two things side by side:** the smallest width each one can shrink to before it should move underneath instead.',
        ] },
        'If nothing fits, pick the nearest size rather than adding a new one.',
      ],
    },
  ],
  relatedPages: [
    { label: 'Size', href: '/dimension/size' },
    { label: 'Aspect ratio', href: '/dimension/size/aspect-ratio' },
    { label: 'Reading width', href: '/text/reading-width' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Panel', href: '/panel' },
    { label: 'Tooltip', href: '/tooltip' },
  ],
  references: [
    { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length' },
    { label: 'MDN: max-inline-size', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-inline-size' },
  ],
}
