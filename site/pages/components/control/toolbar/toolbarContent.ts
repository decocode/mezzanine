import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const toolbarContent: DocsPageContent = {
  id: 'toolbar',
  kind: 'component',
  title: 'Toolbar',
  description: '`Toolbar` is a component that groups related controls, such as buttons, toggle buttons or menus.',
  sections: [
    { key: 'example', intro: ['`Toolbar` lays its controls out in a row that wraps, with a `Separator` between groups.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Toolbar anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Toolbar', description: 'Holds the controls and moves between them with the arrow keys. Mezzanine gives its ToggleButtonGroups its orientation and stands its Separators across it.' },
          { name: 'Group', description: 'Optional, with an `aria-label`, to name related controls.' },
          { name: 'Separator', description: 'Optional line between groups.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put Buttons, ToggleButtonGroups and other controls inside `Toolbar`, and give it an `aria-label`. `orientation="vertical"` stacks them in a column.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab moves into the toolbar and out again, and the arrow keys move between its controls, so keyboard users cross the whole toolbar with one press of Tab.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Toolbar pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Toolbar'),
      },
    },
  ],
  relatedPages: [
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Separator', href: '/separator' },
    { label: 'Button', href: '/button' },
  ],
  references: [
    { label: 'React Aria Toolbar', href: 'https://react-aria.adobe.com/Toolbar' },
  ],
}

// The example's labels.
export const toolbarExampleLabels = { toolbar: 'Toolbar', toggleGroup: 'Group A', toggles: ['Toggle A', 'Toggle B'], actionGroup: 'Group B', actions: ['Action A', 'Action B'] } as const

// The Properties panel's orientation choices, and the example's code.
export const toolbarOrientationLabel = 'orientation'
export const toolbarOrientations = ['horizontal', 'vertical'] as const

export function toolbarExampleCode(orientation: (typeof toolbarOrientations)[number]) {
  const labels = toolbarExampleLabels
  return [
    `<Toolbar aria-label="${labels.toolbar}"${orientation === 'vertical' ? ' orientation="vertical"' : ''}>`,
    `  <ToggleButtonGroup aria-label="${labels.toggleGroup}" selectionMode="single" size="sm" hierarchy="secondary">`,
    ...labels.toggles.map((toggle) => `    <ToggleButton id="${toggle}">${toggle}</ToggleButton>`),
    '  </ToggleButtonGroup>',
    '  <Separator />',
    `  <Group aria-label="${labels.actionGroup}">`,
    ...labels.actions.map((action) => `    <Button size="sm" hierarchy="secondary">${action}</Button>`),
    '  </Group>',
    '</Toolbar>',
  ].join('\n')
}
