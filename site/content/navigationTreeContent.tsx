import type { NavTreeProps } from '@decocode/mezzanine'

export const navigationTreeExampleItems: NavTreeProps['items'] = [
  { type: 'section', id: 'section-a', label: 'Header A', children: [
    { id: 'item-a', label: 'Item A', href: '/navigation-tree' },
    { id: 'item-b', label: 'Item B', children: [
      { id: 'child-item-b1', label: 'Child item B1', href: '/navigation-tree#child-item-b1' },
      { id: 'child-item-b2', label: 'Child item B2', href: '/navigation-tree#child-item-b2' },
    ] },
  ] },
  { type: 'section', id: 'section-b', label: 'Header B', children: [
    { id: 'item-c', label: 'Item C', href: '/navigation-tree#item-c', children: [
      { id: 'child-item-c1', label: 'Child item C1', href: '/navigation-tree#child-item-c1' },
      { id: 'child-item-c2', label: 'Child item C2', href: '/navigation-tree#child-item-c2' },
    ] },
  ] },
]

export const navigationTreeContent = {
  title: 'Nav Tree',
  description: "Nav Tree is Mezzanine’s composed version of React Aria’s NavigationTree. Supply labels, destinations and optional badges; the library supplies the rows, links, expansion controls and states.",
  relatedPages: [
    { label: 'Navbar', href: '/navbar' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Table of contents', href: '/table-of-contents' },
  ],
  references: [{ label: 'React Aria NavigationTree', href: 'https://react-aria.adobe.com/NavigationTree' }],
  exampleParagraphs: [<>Item B opens from its whole label. Item C has a destination link and a separate expansion control. Sections group items without becoming expandable rows.</>],
  anatomyRows: [
    { name: 'NavTree', description: <>Owns the complete navigation recipe. Pass <code>items</code> and the current <code>selectedRoute</code>.</> },
    { name: 'NavTreeItemData', description: <>A stable <code>id</code>, string <code>label</code>, optional <code>href</code>, badge <code>content</code> and nested <code>children</code>.</> },
    { name: 'NavTreeSectionData', description: <>An entry with <code>type="section"</code>, a visible label or <code>aria-label</code>, and item children.</> },
  ],
  usageParagraphs: [
    <>Give the tree an accessible name and place it inside a labelled navigation landmark when it provides page navigation. IDs must be unique throughout the tree. Sections may contain nested items; an item cannot contain a section.</>,
    <>An unlinked parent uses its visible label as the control’s name and exposes its expanded state separately. Linked parents keep navigation and expansion separate. <code>getToggleLabel</code> can localise expansion labels.</>,
    <>Use <code>defaultExpandedKeys</code> for initial state, or <code>expandedKeys</code> and <code>onExpandedChange</code> for controlled state. Route changes request expansion of the current page’s ancestors without closing other groups. A manual collapse stays collapsed until the route or its ancestor chain changes. Controlled applications must accept the callback to reveal those ancestors.</>,
    <>Rows open and close immediately; only the chevron animates, from right to down. Retaining closing rows did not pass the collection/focus proof, so Nav Tree uses the chevron-only fallback. The system reduced-motion setting and local Wireframe policy make the rotation immediate.</>,
    <>Supply non-interactive badge or text content only. A destination-less item without children is disabled. Replace changed data and its ancestors immutably so collection updates are detected. Links retain native navigation and React Aria keyboard behaviour.</>,
    <>Use the unchanged low-level <code>NavigationTree</code> parts when you need arbitrary React Aria composition. The old optional animation hook and its recipe classes have been removed; Nav Tree needs no consumer slots, classes or motion wiring.</>,
  ],
}
