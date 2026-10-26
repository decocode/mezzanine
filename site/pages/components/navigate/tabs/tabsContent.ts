import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const tabsContent: DocsPageContent = {
  id: 'tabs',
  kind: 'component',
  title: 'Tabs',
  description: '`Tabs` is a component that shows a row or column of labelled controls, which switch between related sections of content in the same place. Only one section is shown at a time, and the selected tab tells people which section they are viewing.',
  sections: [
    {
      key: 'example',
      intro: ['Select a `Tab` to show its matching `TabPanel`. Arrow keys move between available tabs and select them automatically. With `disabledKeys`, the fourth tab is disabled.', 'Set `orientation="vertical"` to stack the tabs. With `keyboardActivation="manual"`, the arrow keys move focus, and Enter or Space selects.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Tabs anatomy',
        nameColumn: 'Component',
        rows: [
          { name: 'Tabs', description: 'Manages selection, orientation and keyboard activation.' },
          { name: 'TabList', description: 'Groups the tabs and gives the collection an accessible name.' },
          { name: 'Tab', description: 'Selects a panel. Includes React Aria’s `SelectionIndicator` for the selected underline.' },
          { name: 'TabPanel', description: 'Contains the content for the `Tab` with the matching `id`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [{
        list: [
          'Use tabs for related sections shown one at a time, not for independent on/off choices.',
          'Horizontal tab lists scroll when space is limited. Vertical panels move below the list when there is not enough room beside it. Keep labels short and meaningful.',
        ],
      }],
    },
    {
      key: 'accessibility',
      body: [{
        list: [
          'React Aria supplies tab/panel relationships, roving focus and keyboard selection. Do not add custom arrow-key handlers.',
          'Tab moves into the selected tab, then into its panel. Arrow keys follow the orientation; Home and End move to the first and last available tabs.',
          'An underline marks the selected tab.',
        ],
      }],
    },
    {
      key: 'props',
      intro: ['These are common React Aria props; the components retain their underlying APIs.'],
      table: {
        label: 'Tabs props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'defaultSelectedKey', description: 'Initial selection on `Tabs`, matching a tab’s `id`.' },
          { name: 'selectedKey / onSelectionChange', description: 'Control the selected tab from application state.' },
          { name: 'orientation', description: 'On `Tabs`: `horizontal` by default, or `vertical`.' },
          { name: 'keyboardActivation', description: 'On `Tabs`: `automatic` selects on focus; `manual` waits for activation.' },
          { name: 'isDisabled', description: 'Disable an individual `Tab` or the whole collection on `Tabs`. Use `disabledKeys` for a set of tab IDs.' },
          { name: 'id', description: 'Use the same unique key on each `Tab` and its `TabPanel`.' },
          { name: 'aria-label / aria-labelledby', description: 'Give `TabList` a name that describes the collection.' },
          { name: 'shouldForceMount', description: 'Keep a `TabPanel` mounted to preserve local state. Inactive panels remain hidden and inert.' },
        ],
      },
    },
    {
      key: 'tokens',
      intro: ['`Tabs` also uses shared typography, focus colour, disabled opacity and radius tokens.'],
      table: {
        label: 'Tabs CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--motion-duration-interface', description: 'Selection indicator movement duration; motion stops with reduced motion.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Tabs pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Tabs'),
      },
    },
  ],
  relatedPages: [
    { label: 'Disclosure', href: '/disclosure' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Tabs', href: 'https://react-aria.adobe.com/Tabs' },
  ],
}

// The Example's tabs, and the Properties panel's choices. disabledKeys turns the fourth tab off.
export const tabsExampleTabs = [
  { id: 'a', label: 'Tab A', panel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 'b', label: 'Tab B', panel: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 'c', label: 'Tab C', panel: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  { id: 'd', label: 'Tab D', panel: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
] as const
export const tabsOrientations = ['horizontal', 'vertical'] as const
export const tabsKeyboardActivations = ['automatic', 'manual'] as const

export function tabsExampleCode({ orientation, keyboardActivation, disabledKeys }: { orientation: string, keyboardActivation: string, disabledKeys: boolean }) {
  const props = formatJsxProps({
    orientation: orientation === 'horizontal' ? undefined : orientation,
    keyboardActivation: keyboardActivation === 'automatic' ? undefined : keyboardActivation,
    disabledKeys: disabledKeys ? ['d'] : undefined,
  })
  return [
    `<Tabs${props}>`,
    '  <TabList aria-label="Example sections">',
    ...tabsExampleTabs.map((tab) => `    <Tab id="${tab.id}">${tab.label}</Tab>`),
    '  </TabList>',
    ...tabsExampleTabs.map((tab) => `  <TabPanel id="${tab.id}">${tab.panel}</TabPanel>`),
    '</Tabs>',
  ].join('\n')
}
