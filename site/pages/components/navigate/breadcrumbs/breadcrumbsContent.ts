import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'

export const breadcrumbsContent: DocsPageContent = {
  id: 'breadcrumbs',
  kind: 'component',
  title: 'Breadcrumbs',
  description: '`Breadcrumbs` is a component that shows a trail of links to where you are within a website, such as Home, Products and a product page. It helps you return to a broader section without retracing every page you visited.',
  sections: [
    { key: 'example', intro: ['Earlier levels are links. The final item identifies the current page and is not a link.', 'A disabled `Breadcrumbs` list shows the hierarchy but none of its links can be used.'] },
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
    { label: 'Top bar', href: '/top-bar' },
    { label: 'Navigation tree', href: '/navigation-tree' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Breadcrumbs', href: 'https://react-aria.adobe.com/Breadcrumbs' },
  ],
}

// The Example's crumbs, and its code. The last crumb is the current page, so it isn't a link.
export const breadcrumbsExampleCrumbs = [{ label: 'Homepage', href: '/' }, { label: 'Parent page', href: '/introduction' }, { label: 'Current page' }] as const

export function breadcrumbsExampleCode(isDisabled: boolean) {
  return [
    '<nav aria-label="Breadcrumbs">',
    `  <Breadcrumbs${formatJsxProps({ isDisabled })}>`,
    ...breadcrumbsExampleCrumbs.map((crumb) => 'href' in crumb
      ? `    <Breadcrumb><Link href="${crumb.href}">${crumb.label}</Link></Breadcrumb>`
      : `    <Breadcrumb><span>${crumb.label}</span></Breadcrumb>`),
    '  </Breadcrumbs>',
    '</nav>',
  ].join('\n')
}
