// Written guidance and reference entries; live examples stay in the page.
export const navigationTreeContent = {
  title: 'Navigation tree',
  description: 'A navigation tree is a list of links arranged in groups that can open to reveal more links inside them, like folders containing other folders. It helps people explore a website with several levels of pages.',
  relatedPages: [
    { label: 'Navbar', href: '/navbar' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Table of contents', href: '/table-of-contents' },
  ],
  references: [
    { label: 'React Aria NavigationTree', href: 'https://react-aria.adobe.com/NavigationTree' },
  ],
  exampleParagraphs: [
    <>
      A <code>NavigationTreeSection</code> groups related items, and a{' '}
      <code>NavigationTreeHeader</code> labels that section. Each{' '}
      <code>NavigationTreeItem</code> contains <code>NavigationTreeItemContent</code>. An item may
      contain a <code>Link</code>, child items, and a <code>Button</code> in the{' '}
      <code>chevron</code> slot.
    </>,
  ],
  anatomyRows: [
    { name: 'NavigationTree', description: <>Manages the hierarchy, expanded items and current route.</> },
    { name: 'NavigationTreeSection', description: <>Groups related items.</> },
    { name: 'NavigationTreeHeader', description: <>Provides a section label.</> },
    { name: 'NavigationTreeItem', description: <>Defines an item with a stable id, textValue and optional href or child items.</> },
    { name: 'NavigationTreeItemContent', description: <>Contains the visible row content.</> },
    { name: 'Link', description: <>Provides the destination link within a row.</> },
    { name: 'Button slot="chevron"', description: <>Expands or collapses a parent item.</> },
  ],
  usageParagraphs: [
    <>Give the tree an <code>aria-label</code>, and wrap it in a labelled <code>nav</code> when it provides page navigation. Give each item a stable <code>id</code> and a <code>textValue</code> describing its label. A section needs a visible header or an accessible label.</>,
    <>Pass the current destination as <code>selectedRoute</code>. Set <code>defaultExpandedKeys</code> for initial expansion, or use <code>expandedKeys</code> with <code>onExpandedChange</code> when the application owns that state. Routing and the current path remain the application’s responsibility.</>,
    <>Use arrow keys to move through the tree hierarchy. The chevron Button expands or collapses its parent; Enter activates a focused destination. Keep the React Aria row composition so focus and keyboard handling remain connected to the tree.</>,
    <>The optional <code>useAnimatedNavigationTree</code> hook is exported by Mezzanine. Pass its <code>expandedKeys</code> and <code>onExpandedChange</code> to the tree. Use its <code>openingKeys</code> and <code>closingKeys</code> to apply <code>mezzanine-navigation-tree-item-opening</code> and <code>mezzanine-navigation-tree-item-closing</code> to descendant rows with the <code>mezzanine-navigation-tree-item-animated</code> class. Mark a closing parent with <code>mezzanine-navigation-tree-item-closing</code> so its chevron rotates back. Reduced motion skips the row animation and chevron transition; changing the preference during an animation finishes it immediately.</>,
  ],
}
