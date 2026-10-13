// Written guidance and reference entries; live examples stay in the page.
export const tabsContent = {
  title: 'Tabs',
  description: 'Tabs are a row or column of labelled controls that switch between related sections of content in the same place. Only one section is shown at a time, and the selected tab tells people which section they are viewing.',
  relatedPages: [
    { label: 'Tab bar', href: '/tab-bar' },
    { label: 'Disclosure', href: '/disclosure' },
  ],
  references: [
    { label: 'React Aria Tabs', href: 'https://react-aria.adobe.com/Tabs' },
  ],
  exampleParagraphs: [
    <>
      Select a <code>Tab</code> to show its matching <code>TabPanel</code>. Arrow keys
      move between available tabs and select them automatically. The fourth tab is disabled.
    </>,
  ],
  anatomyRows: [
    { name: 'Tabs', description: <>Manages selection, orientation and keyboard activation.</> },
    { name: 'TabList', description: <>Groups the tabs and gives the collection an accessible name.</> },
    { name: 'Tab', description: <>Selects a panel. Includes React Aria’s <code>SelectionIndicator</code> for the selected underline.</> },
    { name: 'TabPanel', description: <>Contains the content for the <code>Tab</code> with the matching <code>id</code>.</> },
  ],
  verticalTabsParagraphs: [
    <>
      Set <code>orientation="vertical"</code> to stack the tabs. This example also uses
      {' '}<code>keyboardActivation="manual"</code>: Up and Down move focus; Enter or Space selects.
    </>,
  ],
  propsRows: [
    { name: 'defaultSelectedKey', description: <>Initial selection on <code>Tabs</code>, matching a tab’s <code>id</code>.</> },
    { name: 'selectedKey / onSelectionChange', description: <>Control the selected tab from application state.</> },
    { name: 'orientation', description: <>On <code>Tabs</code>: <code>horizontal</code> by default, or <code>vertical</code>.</> },
    { name: 'keyboardActivation', description: <>On <code>Tabs</code>: <code>automatic</code> selects on focus; <code>manual</code> waits for activation.</> },
    { name: 'isDisabled', description: <>Disable an individual <code>Tab</code> or the whole collection on <code>Tabs</code>. Use <code>disabledKeys</code> for a set of tab IDs.</> },
    { name: 'id', description: <>Use the same unique key on each <code>Tab</code> and its <code>TabPanel</code>.</> },
    { name: 'aria-label / aria-labelledby', description: <>Give <code>TabList</code> a name that describes the collection.</> },
    { name: 'shouldForceMount', description: <>Keep a <code>TabPanel</code> mounted to preserve local state. Inactive panels remain hidden and inert.</> },
  ],
  propsParagraphs: [
    <>These are common React Aria props; the components retain their underlying APIs.</>,
  ],
  usageItems: <>
    <li>Use tabs for related sections shown one at a time, not for independent on/off choices.</li>
    <li>React Aria supplies tab/panel relationships, roving focus and keyboard selection. Do not add custom arrow-key handlers.</li>
    <li>Tab moves into the selected tab, then into its panel. Arrow keys follow the orientation; Home and End move to the first and last available tabs.</li>
    <li>Horizontal tab lists scroll when space is limited. Vertical panels move below the list when there is not enough room beside it. Keep labels short and meaningful.</li>
    <li>Keyboard focus has an outline, selection has an underline, and indicator motion respects reduced-motion preferences.</li>
  </>,
  tokensRows: [
    { name: '--tabs-content-gap', description: 'Space between the tab list and its panel.' },
    { name: '--tabs-border-width', description: 'Tab-list divider thickness.' },
    { name: '--tabs-border', description: 'Tab-list divider colour.' },
    { name: '--tabs-content', description: 'Panel text colour.' },
    { name: '--tabs-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
    { name: '--tabs-focus-ring-offset', description: 'Keyboard-focus outline position.' },
    { name: '--tab-min-height', description: 'Minimum tab target height.' },
    { name: '--tab-padding-block', description: 'Vertical tab padding.' },
    { name: '--tab-padding-inline', description: 'Horizontal tab padding.' },
    { name: '--tab-content', description: 'Default tab text colour.' },
    { name: '--tab-content-selected', description: 'Selected tab text colour.' },
    { name: '--tab-background-hovered', description: 'Tab background while hovered.' },
    { name: '--tab-background-pressed', description: 'Tab background while pressed.' },
    { name: '--tab-indicator', description: 'Selection indicator colour.' },
    { name: '--tab-indicator-width', description: 'Selection indicator thickness.' },
    { name: '--tab-motion-duration', description: 'Selection indicator movement duration; motion stops with reduced motion.' },
    { name: '--tab-panel-padding', description: 'Padding inside the content panel.' },
    { name: '--tab-panel-preferred-width', description: 'Preferred panel width before a vertical layout wraps the panel below the list.' },
  ],
  tokensParagraphs: [
    <><code>Tabs</code> also uses shared typography, focus colour, disabled opacity and radius tokens.</>,
  ],
}
