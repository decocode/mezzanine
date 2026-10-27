import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const textAccessibilityContent: DocsPageContent = {
  id: 'text-accessibility',
  kind: 'foundation',
  title: 'Text accessibility',
  description: 'Text stays readable when people make it bigger or the window narrower.',
  sections: [
    {
      key: 'biggerText',
      title: 'Bigger text',
      body: ['Text sizes are set in `rem`, so they follow the browser’s text size setting. The pages are tested with text at 200%, as WCAG 1.4.4 asks, to check that nothing is cut off or overlaps.'],
    },
    {
      key: 'narrowWindows',
      title: 'Narrow windows',
      body: ['At 320 CSS pixels wide, pages reflow into one column, so nobody has to scroll sideways to read, as WCAG 1.4.10 asks. The pages are tested at that width too. Content that needs two directions, such as a table or a code block, scrolls sideways inside its own box instead of the page.'],
    },
    {
      key: 'contrastAndColor',
      title: 'Contrast and color',
      body: ['Contrast and color are on [Color and contrast](/typography/color-and-contrast).'],
    },
  ],
  relatedPages: [
    { label: 'Size and scaling', href: '/typography/size-and-scaling' },
    { label: 'Lines and words', href: '/typography/lines-and-words' },
    { label: 'Color and contrast', href: '/typography/color-and-contrast' },
  ],
  references: [
    { label: 'WCAG 1.4.4: Resize text', href: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html' },
    { label: 'WCAG 1.4.10: Reflow', href: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html' },
  ],
}
