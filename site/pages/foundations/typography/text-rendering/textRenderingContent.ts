import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const textRenderingContent: DocsPageContent = {
  id: 'text-rendering',
  kind: 'foundation',
  title: 'Text rendering',
  description: 'When text keeps its intended weight on screen.',
  sections: [
    {
      key: 'weightOnScreen',
      title: 'Weight on screen',
      body: [
        'On a Mac, browsers draw text slightly heavier than its weight by default, and light text on a dark background looks bolder still. Text is drawn with the thinner rendering instead (`-webkit-font-smoothing: antialiased`), so it keeps its intended weight. Other systems ignore the setting.',
        'In the Dark theme, text is a soft light grey rather than pure white. Very bright text on a near-black background seems to glow, which makes it harder to read for long.',
      ],
    },
    {
      key: 'subpixelRendering',
      title: 'Subpixel rendering',
      body: ['Some systems sharpen text by lighting the red, green and blue parts of each pixel separately, which is called subpixel rendering. It’s left to the operating system: Windows uses it, and macOS stopped in 2018. The thinner rendering setting only affects macOS.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Text rendering CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: '-webkit-font-smoothing', description: '`antialiased`, the thinner text rendering on macOS. `-moz-osx-font-smoothing: grayscale` does the same in Firefox.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Font weight', href: '/typography/font-weight' },
  ],
}
