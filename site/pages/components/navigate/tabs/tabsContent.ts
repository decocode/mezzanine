import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const tabsContent: DocsPageContent = {
  id: 'tabs',
  kind: 'component',
  title: 'Tabs',
  description: 'Tabs are a row or column of labelled controls that switch between related sections of content in the same place. Only one section is shown at a time, and the selected tab tells people which section they are viewing.',
  sections: [
    {
      key: 'example',
      intro: ['Select a `Tab` to show its matching `TabPanel`. Arrow keys move between available tabs and select them automatically. The fourth tab is disabled.'],
    },
    {
      key: 'verticalTabs',
      title: 'Vertical tabs',
      intro: ['Set `orientation="vertical"` to stack the tabs. This example also uses `keyboardActivation="manual"`: Up and Down move focus; Enter or Space selects.'],
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
          { name: '--tabs-content-gap', description: 'Space between the tab list and its panel.' },
          { name: '--tabs-border-width', description: 'Tab-list divider thickness.' },
          { name: '--tabs-border', description: 'Tab-list divider colour.' },
          { name: '--tabs-content', description: 'Panel text colour.' },
          { name: '--tabs-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--tabs-focus-ring-offset', description: 'Keyboard-focus outline position.' },
          { name: '--tab-padding-block', description: 'Vertical tab padding.' },
          { name: '--tab-padding-inline', description: 'Horizontal tab padding.' },
          { name: '--tab-content', description: 'Default tab text colour.' },
          { name: '--tab-content-selected', description: 'Selected tab text colour.' },
          { name: '--tab-background-hovered', description: 'Tab background while hovered.' },
          { name: '--tab-background-pressed', description: 'Tab background while pressed.' },
          { name: '--tab-indicator', description: 'Selection indicator colour.' },
          { name: '--tab-indicator-width', description: 'Selection indicator thickness.' },
          { name: '--motion-duration-interface', description: 'Selection indicator movement duration; motion stops with reduced motion.' },
          { name: '--tab-panel-padding', description: 'Padding inside the content panel.' },
          { name: '--tab-panel-preferred-width', description: 'Preferred panel width before a vertical layout wraps the panel below the list.' },
        ],
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
