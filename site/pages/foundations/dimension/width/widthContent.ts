import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const widthLevels = [
  { token: '--width-xs', label: 'Width xs', description: 'Used for components such as [Tabs](/tabs).' },
  { token: '--width-sm', label: 'Width sm', description: 'Used for layouts such as [Split](/layout/split).' },
  { token: '--width-md', label: 'Width md', description: 'Used for components such as [Tooltip](/tooltip) and [Panel](/panel).' },
  { token: '--width-lg', label: 'Width lg', description: 'Used for components such as Modal.' },
  { token: '--width-xl', label: 'Width xl', description: 'Used for wide page areas, such as a hero.' },
  { token: '--width-2xl', label: 'Width 2xl', description: 'Used for the widest page areas, such as a page heading.' },
]

export const widthContent: DocsPageContent = {
  id: 'width',
  kind: 'foundation',
  title: 'Width',
  description: 'Widths that suit the content, on every size of screen.',
  sections: [
    {
      key: 'suitContent',
      title: 'Flexible width, with limits',
      body: [
        'Full-width is the default for anything placed on a page. That might be ok for something like the surrounding container of a Footer component. However, text becomes difficult to read if it runs over a certain number of characters. Conversely, some things end up looking squashed if allowed to become too narrow. Mezzanine allows things placed on a page to expand and contract in width, suited to that particular type of thing, regardless of screen size.',
        { list: [
          'Maximum width stops a thing from expanding to full-width.',
          'Minimum width stops it from becoming too narrow, and you can choose to make it wrap onto a new row instead.',
          'Minimum and maximum width provides a flexible range in which to expand and contract.',
        ] },
      ],
    },
    {
      key: 'screenSize',
      title: 'On not using media queries for widths',
      isCollapsible: true,
      body: ['Some design systems use [media queries](/interaction/media-queries) to make everything on a page rearrange itself at a set of certain points, based on screen sizes (or browser window widths, to be more specific). Although better than the previous method of using fixed widths, which stay the same size no matter what, media queries come with a limitation; they don’t take into account that specific types of thing need to be a certain width.'],
    },
    {
      key: 'sharedWidths',
      title: 'Shared widths',
      body: ['To keep everything looking cohesive and orderly, a shared set of widths is used, measured in `rem`. This is so that if people increase or decrease the text size in their device or browser settings, the widths increase to accommodate it.'],
    },
  ],
  relatedPages: [
    { label: 'Aspect ratio', href: '/dimension/aspect-ratio' },
    { label: 'Lines and words', href: '/typography/lines-and-words' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Panel', href: '/panel' },
    { label: 'Tooltip', href: '/tooltip' },
  ],
  references: [
    { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length' },
    { label: 'MDN: max-inline-size', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-inline-size' },
  ],
}
