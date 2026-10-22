import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const widthLevels = [
  { token: '--width-xs', label: 'Width xs', description: 'Used for components such as [Tabs](/tabs).' },
  { token: '--width-sm', label: 'Width sm', description: 'Used for layouts such as [Ratio pair](/layout/ratio-pair).' },
  { token: '--width-md', label: 'Width md', description: 'Used for components such as [Tooltip](/tooltip) and [Panel](/panel).' },
  { token: '--width-lg', label: 'Width lg', description: 'Used for components such as Modal.' },
  { token: '--width-xl', label: 'Width xl', description: 'Used for wide page areas, such as a hero.' },
  { token: '--width-2xl', label: 'Width 2xl', description: 'Used for the widest page areas, such as a page heading.' },
]

export const widthContent: DocsPageContent = {
  id: 'width',
  kind: 'foundation',
  title: 'Width',
  description: 'Lots of random widths can make a page seem disorganised. A shared set of widths helps to keep things tidy and easy to manage.',
  sections: [
    {
      key: 'suitContent',
      title: 'Widths that suit the content, on every size of screen',
      body: [
        'The default width of anything placed on a page is full-width. That might be ok for something like the surrounding container of a Footer component. However, lines of text become difficult to read if allowed to run beyond a certain number of characters. Conversely, some things end up looking squashed if allowed to become too narrow.',
        'Instead, Mezzanine’s method of using widths makes sure things placed on a page can expand and contract in a way that suits that particular type of thing, regardless of screen size.',
        { list: [
          'If you give something a maximum width - it won’t expand to full-width.',
          'If you give something a minimum width - it won’t become too narrow, and you can choose to make it wrap onto a new row instead.',
          'If you give something minimum and maximum width - it will have flexible range in which to expand and contract.',
        ] },
      ],
    },
    {
      key: 'screenSize',
      title: 'Why Mezzanine doesn’t use media queries for widths',
      isCollapsible: true,
      body: ['Some design systems use [media queries](/interaction/media-queries) to make everything on a page rearrange itself at a set of certain points, based on screen sizes (or browser window widths, to be more specific). Although better than the previous method of using fixed widths, which stay the same size no matter what, media queries come with a limitation; they don’t take into account that specific types of thing need to be a certain width.'],
    },
    {
      key: 'sharedWidths',
      title: 'Shared widths',
      body: ['If minimum or maximum width is needed, it should come from a shared set of widths. This helps to keep everything looking cohesive and orderly. These widths are measured in `rem`, so that if people increase or decrease the text size in their device or browser settings, the set of widths will follow suit.'],
    },
  ],
  relatedPages: [
    { label: 'Aspect ratio', href: '/dimension/aspect-ratio' },
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
