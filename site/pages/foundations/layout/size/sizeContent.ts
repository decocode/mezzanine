import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const widthLevels = [
  { token: '--width-xs', label: 'Extra small', description: 'Tab panels' },
  { token: '--width-sm', label: 'Small', description: 'Each area of a Ratio pair before it stacks' },
  { token: '--width-md', label: 'Medium', description: 'Panels and tooltips' },
  { token: '--width-lg', label: 'Large', description: 'Modals' },
]

export const sizeContent: DocsPageContent = {
  id: 'size',
  kind: 'foundation',
  title: 'Size',
  description: 'Size is how wide or tall a box may be. Components take their widths from one shared scale.',
  sections: [
    {
      key: 'widths',
      title: 'Widths',
      intro: ['Values are in `rem`, so they follow the root font size.'],
    },
  ],
}
