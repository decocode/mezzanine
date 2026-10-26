import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const treeContent: DocsPageContent = {
  id: 'tree',
  kind: 'component',
  title: 'Tree',
  description: '`Tree` is a component that shows items nested inside one another, such as folders, with each parent opening to show its children.',
  sections: [
    { key: 'example', intro: ['Each level indents its rows, and a parent’s chevron turns as it opens. A chosen row takes the soft tint and the indicator bar.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Tree anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Tree', description: 'Holds the rows, their expansion and their selection.' },
          { name: 'TreeItem', description: 'One row. Give it a `title`, and nest `TreeItem`s inside it for its children.' },
          { name: 'TreeItemContent', description: 'The row’s content. Mezzanine adds the chevron, the selection checkbox and the drag handle when they apply.' },
          { name: 'TreeSection', description: 'Optional group of rows, with a `TreeHeader`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Give each `TreeItem` an `id` and a `title`, and nest its children inside it. Use `defaultExpandedKeys`, or `expandedKeys` with `onExpandedChange`. `selectionMode` lets people choose rows.',
        'For navigation between pages, use Nav Tree instead, which marks the current page.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The Up and Down Arrow keys move between rows, Right Arrow opens a parent and Left Arrow closes it. Screen readers announce each row’s level, and whether it is open or chosen.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Tree pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Tree'),
      },
    },
  ],
  relatedPages: [
    { label: 'Nav Tree', href: '/navigation-tree' },
    { label: 'Grid list', href: '/grid-list' },
  ],
  references: [
    { label: 'React Aria Tree', href: 'https://react-aria.adobe.com/Tree' },
  ],
}

// The example's label and rows: each parent with its children.
export const treeExampleLabels = { label: 'Tree A', branches: [{ title: 'Branch A', leaves: ['Leaf A1', 'Leaf A2'] }, { title: 'Branch B', leaves: ['Leaf B1'] }], leaf: 'Leaf C' } as const

// The Properties panel's choices. selectionBehavior only applies once rows can be chosen; replace swaps
// the chosen row on a press, and toggle adds or removes it. disabledKeys turns Leaf C off.
export const treeSelectionModes = ['none', 'single', 'multiple'] as const
export const treeSelectionBehaviors = ['replace', 'toggle'] as const

export function treeExampleCode({ selectionMode, selectionBehavior, isExpanded, disabledKeys }: {
  selectionMode: string, selectionBehavior: string, isExpanded: boolean, disabledKeys: boolean
}) {
  const props = formatJsxProps({
    selectionMode: selectionMode === 'none' ? undefined : selectionMode,
    selectionBehavior: selectionMode === 'none' || selectionBehavior === 'toggle' ? undefined : selectionBehavior,
    defaultExpandedKeys: isExpanded ? [treeExampleLabels.branches[0].title] : undefined,
    disabledKeys: disabledKeys ? [treeExampleLabels.leaf] : undefined,
  })
  return [
    `<Tree aria-label="${treeExampleLabels.label}"${props}>`,
    ...treeExampleLabels.branches.flatMap((branch) => [
      `  <TreeItem id="${branch.title}" title="${branch.title}">`,
      ...branch.leaves.map((leaf) => `    <TreeItem id="${leaf}" title="${leaf}" />`),
      '  </TreeItem>',
    ]),
    `  <TreeItem id="${treeExampleLabels.leaf}" title="${treeExampleLabels.leaf}" />`,
    '</Tree>',
  ].join('\n')
}
