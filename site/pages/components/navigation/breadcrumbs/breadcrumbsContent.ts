import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export const breadcrumbsContent: DocsPageContent = {
  id: 'breadcrumbs',
  kind: 'component',
  title: 'Breadcrumbs',
  description: 'Breadcrumbs are a trail of links showing where you are within a website, such as Home, Products and a product page. They help you return to a broader section without retracing every page you visited.',
  sections: [
    { key: 'example' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Breadcrumbs anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Breadcrumbs', description: 'Groups the breadcrumb items in their supplied order.' },
          { name: 'Breadcrumb', description: 'Contains one level of the hierarchy.' },
          { name: 'Link', description: 'Makes an earlier level navigable. The current-page example uses plain text.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Order items from the broadest ancestor to the current page; give each earlier destination a meaningful link label and `href`. Set `isDisabled` on Breadcrumbs to disable its links.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Wrap the list in a `nav` with an `aria-label` describing the breadcrumb trail.',
        'Tab moves between enabled links and Enter follows the focused link. The plain-text current item in these examples is not a tab stop.',
      ],
    },
  ],
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Navbar', href: '/navbar' },
    { label: 'Navigation tree', href: '/navigation-tree' },
  ],
  references: [
    { label: 'React Aria Breadcrumbs', href: 'https://react-aria.adobe.com/Breadcrumbs' },
  ],
}

// The headings and descriptions of the two live examples in the Example section.
export const breadcrumbsExamples: Record<'hierarchy' | 'disabled', { readonly title: string; readonly description: Copy }> = {
  hierarchy: {
    title: 'Hierarchy',
    description: 'Earlier levels are links. The final item identifies the current page and is not a link.',
  },
  disabled: {
    title: 'Disabled',
    description: 'A disabled `Breadcrumbs` list shows the hierarchy but none of its links can be used.',
  },
}
