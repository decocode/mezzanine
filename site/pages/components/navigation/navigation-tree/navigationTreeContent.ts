import type { NavTreeProps } from '@decocode/mezzanine'
import type { ContentTable, Copy, DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

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

export const navigationTreeContent: DocsPageContent = {
  id: 'navigation-tree',
  kind: 'component',
  title: 'Nav tree',
  description: '`NavTree` is a component that shows navigation with levels, such as a documentation site’s navigation. You supply the items as data, and `NavTree` supplies the rows, links, expand controls and states. It is built on React Aria’s NavigationTree.',
  sections: [
    { key: 'example', intro: ['Select an item to make it the current page; its parents open automatically. Fruit, Berries and Root vegetables are parents without a page of their own, so their whole label opens and closes them. Vegetables is a page as well as a parent: its label is a link, and a separate control at the end of the row opens and closes it.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Nav tree anatomy',
        nameColumn: 'Part',
        namesAreCode: false,
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'NavTree', description: 'The whole tree. It needs an accessible name.' },
          { name: 'Section header', description: 'Optional visible label above a group of items, with an optional icon before it. A section cannot be opened or closed.' },
          { name: 'Row', description: 'One item. Each level of nesting indents its text further, and a nested row shows a guide line for each level above it.' },
          { name: 'Link', description: 'The item\'s label, when the item has an `href`.' },
          { name: 'Expand control', description: 'Opens and closes a parent. A parent without a link uses its whole label; a parent with a link has a separate button at the end of the row.' },
          { name: 'Chevron', description: 'Points right when a parent is closed and down when it is open.' },
          { name: 'Content', description: 'Optional badge or text at the end of a row, from the item\'s `content`. It is not interactive.' },
          { name: 'Current page marker', description: 'A bar, a tinted row and bold text in the indicator colour on the item whose `href` matches `selectedRoute`.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        { list: [
          '**Up and Down Arrow:** Moves between rows.',
          '**Right Arrow:** Opens a closed parent.',
          '**Left Arrow:** Closes an open parent.',
          '**End:** Moves to the last row.',
          '**Enter:** Follows a link, or opens and closes a parent without a link.',
          '**Tab:** Moves out of the tree to the next thing on the page.',
        ] },
        'Only one row takes part in the page\'s Tab order, so keyboard users cross the whole tree with one key press and use the arrow keys inside it.',
        'Rows appear and disappear immediately. Only the chevron turns, and it turns instantly when the person has asked for reduced motion or the tree is in a Wireframe area.',
        'If closing a parent or removing an item takes away the row that had focus, focus moves to the nearest remaining parent, or to the tree itself.',
        'When the tree scrolls inside its own container, it scrolls the current page\'s row into view.',
      ],
    },
    // The page renders the Usage topics, each under its own small heading, from navigationTreeUsageTopics.
    { key: 'usage' },
    {
      key: 'accessibility',
      body: [
        'Give the tree an accessible name with `aria-label`. When it is the page\'s navigation, put it inside a `nav` element with its own label.',
        '`getToggleLabel` sets the expand control\'s accessible name, for example to translate it. By default, a parent with a link is named “Expand” or “Collapse” plus its label, and a parent without one uses its label.',
      ],
    },
    // The page renders both Props tables from navigationTreeProps, because the second has its own small heading.
    { key: 'props' },
    {
      key: 'tokens',
      body: ['Override these tokens in a product theme. Nav tree also uses `--color-chevron`, shared with Disclosure, for its chevron, the shared small-button sizing for its expand control, and the shared motion tokens for the chevron’s turn.'],
      table: {
        label: 'Nav tree tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--nav-item-current-indicator-width', description: 'Width of the current page bar. Shared with TopBar links and Table of contents links.' },
          { name: '--nav-item-foreground', description: 'Row text colour. The `--nav-item-*` tokens are shared with TopBar links and Table of contents links, so all three look alike.' },
          { name: '--nav-item-foreground-current', description: 'Current page text colour, the indicator colour.' },
          { name: '--nav-item-background', description: 'Row background.' },
          { name: '--nav-item-background-hovered', description: 'Row background on hover.' },
          { name: '--nav-item-background-pressed', description: 'Row background while pressed.' },
          { name: '--nav-item-background-current', description: 'Current page background: a soft tint of the accent.' },
          { name: '--nav-item-current-indicator', description: 'Current page bar colour.' },
          { name: '--nav-item-inset', description: 'Space between a row’s tint and the edges of its container.' },
          { name: '--nav-item-padding-inline', description: 'Space between a row’s tint and its text.' },
          { name: '--nav-item-border-radius', description: 'Corners of a row’s tint, the controls’ corners.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Nav tree pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('NavTree'),
      },
    },
  ],
  relatedPages: [
    { label: 'Top bar', href: '/top-bar' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Table of contents', href: '/table-of-contents' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [{ label: 'React Aria NavigationTree', href: 'https://react-aria.adobe.com/NavigationTree' }],
}

// Usage topics, each shown under its own small heading.
export const navigationTreeUsageTopics: readonly { readonly title: string; readonly paragraphs: readonly Copy[] }[] = [
  { title: 'Setting it up', paragraphs: [
    'Set `selectedRoute` to the current page\'s address. The item whose `href` matches it is marked as the current page, and its parents open.',
  ] },
  { title: 'Parents and sections', paragraphs: [
    'Any item with `children` is a parent. Give it an `href` only when it has a page of its own; otherwise its label simply opens and closes it.',
    'Use a section (`type: \'section\'`) to group items under a header. Sections can only sit at the top level, not inside an item.',
  ] },
  { title: 'Open and closed parents', paragraphs: [
    'Use `defaultExpandedKeys` to choose which parents start open. To control this yourself, pass `expandedKeys` and update it in `onExpandedChange`.',
    'When the current page changes, Nav tree opens that page\'s parents and leaves everything else as the person left it. A parent they closed stays closed until the current page moves. If you control the open parents, apply the changes Nav tree asks for in `onExpandedChange`, or the current page can stay hidden.',
  ] },
  { title: 'Item data', paragraphs: [
    'Every `id` must be unique across the whole tree.',
    'An item with no `href` and no children is disabled, because there is nothing to do with it.',
    'When your items change, pass new arrays and objects rather than editing the old ones, so Nav tree alerts the change.',
    'Nav tree is Mezzanine\'s only tree. For a different kind of tree, use React Aria\'s NavigationTree parts directly from `react-aria-components`.',
  ] },
]

// The Props section's two tables; the second sits under its own small heading.
export const navigationTreeProps: { readonly props: ContentTable; readonly itemPropsTitle: string; readonly itemProps: ContentTable } = {
  props: {
    label: 'Nav tree props',
    nameColumn: 'Prop',
    className: 'documentation-props-table',
    rows: [
      { name: 'items', description: 'Required. The items and sections to show, in order.' },
      { name: 'aria-label', description: 'Required unless you use `aria-labelledby`. The tree\'s accessible name.' },
      { name: 'selectedRoute', description: 'The current page\'s address. The item with a matching `href` is marked current and its parents open.' },
      { name: 'defaultExpandedKeys', description: 'The ids of parents that start open, when Nav tree manages this itself.' },
      { name: 'expandedKeys', description: 'The ids of open parents, when you manage this yourself. Use with `onExpandedChange`.' },
      { name: 'onExpandedChange', description: 'Called with the new set of open parent ids when a parent opens or closes, or when the current page needs its parents opened.' },
      { name: 'getToggleLabel', description: 'Optional function `(item, isExpanded) => string` that names a parent\'s expand control.' },
      { name: 'className, style', description: 'Added to the tree for your own layout. The rows keep Mezzanine’s styling.' },
    ],
  },
  itemPropsTitle: 'Item and section data',
  itemProps: {
    label: 'Nav tree item and section data',
    nameColumn: 'Field',
    className: 'documentation-props-table',
    rows: [
      { name: 'id', description: 'Required. A unique key for the item.' },
      { name: 'label', description: 'Required. The visible text.' },
      { name: 'href', description: 'Optional destination. Link options such as `target`, `rel` and `download` are also accepted.' },
      { name: 'children', description: 'Optional child items. Their presence makes the item a parent.' },
      { name: 'content', description: 'Optional badge or text shown at the end of the row. It must not be interactive.' },
      { name: 'isDisabled', description: 'Disables the item.' },
      { name: 'textValue', description: 'Plain text that React Aria uses for the item. Defaults to `label`.' },
      { name: "type: 'section'", description: 'Makes a top-level entry a section. A section has an `id`, an optional `label` or `aria-label`, and item `children`.' },
      { name: 'iconLeading', description: 'Optional, for a section. A decorative icon shown before its label; screen readers skip it.' },
    ],
  },
}

// The Properties panel's on/off prop: whether Vegetables starts open.
export function navigationTreeExampleCode(isExpanded: boolean) {
  return [
    '<RouterProvider navigate={setRoute}>',
    '  <nav aria-label="Nav tree example">',
    `    <NavTree aria-label="Nav tree items" items={items}${formatJsxProps({ defaultExpandedKeys: isExpanded ? navigationTreeExampleExpandedKeys : undefined })} selectedRoute={route} />`,
    '  </nav>',
    '</RouterProvider>',
  ].join('\n')
}
