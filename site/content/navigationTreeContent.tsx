import type { ReactNode } from 'react'
import type { NavTreeProps } from '@decocode/mezzanine'

// Example destinations are page fragments; the example's router turns a press into the current route.
export const navigationTreeExampleInitialRoute = '#strawberries'
export const navigationTreeExampleExpandedKeys = ['vegetables']

export const navigationTreeExampleItems: NavTreeProps['items'] = [
  { id: 'fruit', label: 'Fruit', children: [
    { id: 'apples', label: 'Apples', href: '#apples' },
    { id: 'bananas', label: 'Bananas', href: '#bananas' },
    { id: 'berries', label: 'Berries', children: [
      { id: 'strawberries', label: 'Strawberries', href: '#strawberries' },
      { id: 'blueberries', label: 'Blueberries', href: '#blueberries' },
    ] },
  ] },
  { id: 'vegetables', label: 'Vegetables', href: '#vegetables', children: [
    { id: 'root-vegetables', label: 'Root vegetables', children: [
      { id: 'carrots', label: 'Carrots', href: '#carrots' },
      { id: 'potatoes', label: 'Potatoes', href: '#potatoes' },
    ] },
    { id: 'broccoli', label: 'Broccoli', href: '#broccoli' },
  ] },
]

interface NamedEntry { name: string; description: ReactNode }

export const navigationTreeContent = {
  title: 'Nav Tree',
  description: 'Nav Tree shows navigation with levels, such as a documentation sidebar. You supply the items as data, and Nav Tree supplies the rows, links, expand controls and states. It is built on React Aria’s NavigationTree.',
  relatedPages: [
    { label: 'Sidebar', href: '/sidebar' },
    { label: 'Navbar', href: '/navbar' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Table of contents', href: '/table-of-contents' },
  ],
  references: [{ label: 'React Aria NavigationTree', href: 'https://react-aria.adobe.com/NavigationTree' }],
  exampleParagraphs: [
    <>Select an item to make it the current page; its parents open automatically. Fruit, Berries and Root vegetables are parents without a page of their own, so their whole label opens and closes them. Vegetables is a page as well as a parent: its label is a link, and a separate control at the end of the row opens and closes it.</>,
  ],
  anatomy: [
    { name: 'Tree', description: <>The whole <code>NavTree</code>. It needs an accessible name.</> },
    { name: 'Section header', description: 'Optional visible label above a group of items. A section cannot be opened or closed.' },
    { name: 'Row', description: 'One item. Each level of nesting indents its text further.' },
    { name: 'Link', description: <>The item&apos;s label, when the item has an <code>href</code>.</> },
    { name: 'Expand control', description: 'Opens and closes a parent. A parent without a link uses its whole label; a parent with a link has a separate button at the end of the row.' },
    { name: 'Chevron', description: 'Points right when a parent is closed and down when it is open.' },
    { name: 'Content', description: <>Optional badge or text at the end of a row, from the item&apos;s <code>content</code>. It is not interactive.</> },
    { name: 'Current page marker', description: <>A bar and bold text on the item whose <code>href</code> matches <code>selectedRoute</code>.</> },
  ] satisfies NamedEntry[],
  keyboard: [
    { keys: 'Up and Down Arrow', action: 'Moves between rows.' },
    { keys: 'Right Arrow', action: 'Opens a closed parent.' },
    { keys: 'Left Arrow', action: 'Closes an open parent.' },
    { keys: 'End', action: 'Moves to the last row.' },
    { keys: 'Enter', action: 'Follows a link, or opens and closes a parent without a link.' },
    { keys: 'Tab', action: 'Moves out of the tree to the next thing on the page.' },
  ],
  behaviour: [
    <>Only one row takes part in the page&apos;s Tab order, so keyboard users cross the whole tree with one key press and use the arrow keys inside it.</>,
    <>Rows appear and disappear immediately. Only the chevron turns, and it turns instantly when the person has asked for reduced motion or the tree is in a Wireframe area.</>,
    <>If closing a parent or removing an item takes away the row that had focus, focus moves to the nearest remaining parent, or to the tree itself.</>,
    <>When the tree scrolls inside its own container, it scrolls the current page&apos;s row into view.</>,
  ],
  usage: [
    { title: 'Setting it up', paragraphs: [
      <>Set <code>selectedRoute</code> to the current page&apos;s address. The item whose <code>href</code> matches it is marked as the current page, and its parents open.</>,
    ] },
    { title: 'Parents and sections', paragraphs: [
      <>Any item with <code>children</code> is a parent. Give it an <code>href</code> only when it has a page of its own; otherwise its label simply opens and closes it.</>,
      <>Use a section (<code>type: &apos;section&apos;</code>) to group items under a header. Sections can only sit at the top level, not inside an item.</>,
    ] },
    { title: 'Open and closed parents', paragraphs: [
      <>Use <code>defaultExpandedKeys</code> to choose which parents start open. To control this yourself, pass <code>expandedKeys</code> and update it in <code>onExpandedChange</code>.</>,
      <>When the current page changes, Nav Tree opens that page&apos;s parents and leaves everything else as the person left it. A parent they closed stays closed until the current page moves. If you control the open parents, apply the changes Nav Tree asks for in <code>onExpandedChange</code>, or the current page can stay hidden.</>,
    ] },
    { title: 'Item data', paragraphs: [
      <>Every <code>id</code> must be unique across the whole tree.</>,
      <>An item with no <code>href</code> and no children is disabled, because there is nothing to do with it.</>,
      <>When your items change, pass new arrays and objects rather than editing the old ones, so Nav Tree notices the change.</>,
      <>Nav Tree is Mezzanine&apos;s only tree. For a different kind of tree, use React Aria&apos;s NavigationTree parts directly from <code>react-aria-components</code>.</>,
    ] },
  ],
  accessibility: [
    <>Give the tree an accessible name with <code>aria-label</code>. When it is the page&apos;s navigation, put it inside a <code>nav</code> element with its own label.</>,
    <><code>getToggleLabel</code> sets the expand control&apos;s accessible name, for example to translate it. By default, a parent with a link is named &ldquo;Expand&rdquo; or &ldquo;Collapse&rdquo; plus its label, and a parent without one uses its label.</>,
  ],
  props: [
    { name: 'items', description: 'Required. The items and sections to show, in order.' },
    { name: 'aria-label', description: <>Required unless you use <code>aria-labelledby</code>. The tree&apos;s accessible name.</> },
    { name: 'selectedRoute', description: <>The current page&apos;s address. The item with a matching <code>href</code> is marked current and its parents open.</> },
    { name: 'defaultExpandedKeys', description: 'The ids of parents that start open, when Nav Tree manages this itself.' },
    { name: 'expandedKeys', description: <>The ids of open parents, when you manage this yourself. Use with <code>onExpandedChange</code>.</> },
    { name: 'onExpandedChange', description: 'Called with the new set of open parent ids when a parent opens or closes, or when the current page needs its parents opened.' },
    { name: 'getToggleLabel', description: <>Optional function <code>(item, isExpanded) =&gt; string</code> that names a parent&apos;s expand control.</> },
    { name: 'className, style', description: 'Added to the tree for your own layout. The rows keep Mezzanine’s styling.' },
  ] satisfies NamedEntry[],
  itemProps: [
    { name: 'id', description: 'Required. A unique key for the item.' },
    { name: 'label', description: 'Required. The visible text.' },
    { name: 'href', description: <>Optional destination. Link options such as <code>target</code>, <code>rel</code> and <code>download</code> are also accepted.</> },
    { name: 'children', description: 'Optional child items. Their presence makes the item a parent.' },
    { name: 'content', description: 'Optional badge or text shown at the end of the row. It must not be interactive.' },
    { name: 'isDisabled', description: 'Disables the item.' },
    { name: 'textValue', description: <>Plain text that React Aria uses for the item. Defaults to <code>label</code>.</> },
    { name: "type: 'section'", description: <>Makes a top-level entry a section. A section has an <code>id</code>, an optional <code>label</code> or <code>aria-label</code>, and item <code>children</code>.</> },
  ] satisfies NamedEntry[],
  tokensIntroduction: 'Override these tokens in a product theme. Nav Tree also uses --chevron-size and --color-chevron, shared with Disclosure, for its chevron, the shared small-button sizing for its expand control, and the shared motion tokens for the chevron’s turn.',
  tokens: [
    { name: '--navigation-tree-gap', description: 'Space between rows and sections.' },
    { name: '--navigation-tree-item-min-height', description: 'Minimum row height.' },
    { name: '--navigation-tree-item-padding-block', description: 'Space above and below a row’s content.' },
    { name: '--navigation-tree-item-padding-inline', description: 'Space at the start and end of a row.' },
    { name: '--navigation-tree-item-gap', description: 'Space between a row’s label, content and expand control.' },
    { name: '--navigation-tree-indent', description: 'Extra indent for each level of nesting.' },
    { name: '--navigation-tree-header-padding-block', description: 'Space above and below a section header.' },
    { name: '--navigation-tree-current-indicator-width', description: 'Width of the current page bar.' },
    { name: '--navigation-tree-focus-ring-width', description: 'Width of the keyboard focus outline.' },
    { name: '--navigation-tree-focus-ring-offset', description: 'Position of the keyboard focus outline.' },
    { name: '--navigation-tree-item-content', description: 'Row text colour.' },
    { name: '--navigation-tree-item-content-current', description: 'Current page text colour.' },
    { name: '--navigation-tree-item-background', description: 'Row background.' },
    { name: '--navigation-tree-item-background-hovered', description: 'Row background on hover.' },
    { name: '--navigation-tree-item-background-pressed', description: 'Row background while pressed.' },
    { name: '--navigation-tree-item-background-current', description: 'Current page background. Transparent in Mezzanine’s themes.' },
    { name: '--navigation-tree-current-indicator', description: 'Current page bar colour.' },
    { name: '--navigation-tree-header-content', description: 'Section header text colour.' },
  ] satisfies NamedEntry[],
}
