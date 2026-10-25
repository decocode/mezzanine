import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Text › Lists page. {listItemSpacing} is replaced with the live value of
// the token it follows.
export const listsContent: DocsPageContent = {
  id: 'lists',
  kind: 'foundation',
  title: 'Lists',
  description: 'When items are grouped as bullet points or numbered steps.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Unordered lists use bullet points; ordered lists use numbers. Both share the chosen body style’s line height, with `--space-2` between items (currently `{listItemSpacing}`) and `--space-6` indentation at each level. Wrapped lines align with the item text.',
        'Apply a body text class, such as `mz-text-body-md`, to the list to use these styles. Nested lists inherit the same styling.',
      ],
    },
    { key: 'unordered', title: 'Unordered lists', intro: ['An unordered list uses `<ul>` to group related items whose order is not significant. Filled bullet points mark the first level; nested items use hollow bullet points and an additional indent.'] },
    { key: 'ordered', title: 'Ordered lists', intro: ['An ordered list uses `<ol>` to group items in a meaningful sequence, such as steps or rankings. Numbered markers use the same body style as the list text. Nested lists are indented and restart numbering at 1.'] },
  ],
  relatedPages: [
    { label: 'Text spacing', href: '/text/text-spacing' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
}

// The example list items: two at the first level, the second holding a nested list.
export const listItems: { first: Copy; second: Copy; nested: readonly Copy[] } = {
  first: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  second: 'Sed do eiusmod tempor incididunt.',
  nested: ['Ut enim ad minim veniam.', 'Quis nostrud exercitation ullamco laboris.'],
}
