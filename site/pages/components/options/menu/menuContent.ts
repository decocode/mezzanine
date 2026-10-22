import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const menuContent: DocsPageContent = {
  id: 'menu',
  kind: 'component',
  title: 'Menu',
  description: 'A menu lists actions to choose from, in a popover opened by a button.',
  sections: [
    { key: 'example', intro: ['A `MenuTrigger` opens the `Menu` in a `Popover` from a `Button`. Its items are rows, like a list box’s options.'] },
    { key: 'variants', intro: ['With `selectionMode`, items can be chosen, and a tick marks each chosen one. A `SubmenuTrigger` opens a further menu, marked with a chevron.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Menu anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'MenuTrigger', description: 'Connects the Button to the Popover.' },
          { name: 'Menu', description: 'The list of items.' },
          { name: 'MenuItem', description: 'One action. Mezzanine adds the tick and the submenu chevron.' },
          { name: 'MenuSection', description: 'Optional group of items, with a `Header`.' },
          { name: 'Separator', description: 'Optional line between groups.' },
          { name: 'SubmenuTrigger', description: 'Opens a further menu from one of its items.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put a `Button`, then a `Popover` holding the `Menu`, inside `MenuTrigger`. Give each `MenuItem` an `id` and handle `onAction` on the `Menu`.',
        'For a choice rather than an action, set `selectionMode` to `single` or `multiple`, with `selectedKeys` and `onSelectionChange`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The arrow keys move between items and Enter or Space chooses one. Typing a letter jumps to the next item starting with it, and Escape closes the menu and returns focus to its button.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Menu pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Menu'),
      },
    },
  ],
  relatedPages: [
    { label: 'Popover', href: '/popover' },
    { label: 'List box', href: '/list-box' },
    { label: 'Button', href: '/button' },
  ],
  references: [
    { label: 'React Aria Menu', href: 'https://react-aria.adobe.com/Menu' },
  ],
}

// The examples' trigger and item labels.
export const menuExampleLabels = { trigger: 'Menu trigger', selectionTrigger: 'Menu with selection', items: ['Action A', 'Action B', 'Action C'] } as const
