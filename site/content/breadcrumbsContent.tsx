// Written guidance and reference entries; live examples stay in the page.
export const breadcrumbsContent = {
  title: 'Breadcrumbs',
  description: 'Breadcrumbs are a trail of links showing where you are within a website, such as Home, Products and a product page. They help you return to a broader section without retracing every page you visited.',
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Navbar', href: '/navbar' },
    { label: 'Navigation tree', href: '/navigation-tree' },
  ],
  references: [
    { label: 'React Aria Breadcrumbs', href: 'https://react-aria.adobe.com/Breadcrumbs' },
  ],
  anatomyRows: [
    { name: 'Breadcrumbs', description: <>Groups the breadcrumb items in their supplied order.</> },
    { name: 'Breadcrumb', description: <>Contains one level of the hierarchy.</> },
    { name: 'Link', description: <>Makes an earlier level navigable. The current-page example uses plain text.</> },
  ],
  usageParagraphs: [
    <>Wrap the list in a <code>nav</code> with an <code>aria-label</code> describing the breadcrumb trail. Order items from the broadest ancestor to the current page; give each earlier destination a meaningful link label and <code>href</code>.</>,
    <>Tab moves between enabled links and Enter follows the focused link. The plain-text current item in these examples is not a tab stop. Set <code>isDisabled</code> on Breadcrumbs to disable its links.</>,
  ],
}
