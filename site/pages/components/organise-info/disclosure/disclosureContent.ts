import type { DocsPageContent, LinkItem } from '../../../../templates/docsPageContent'

export const disclosureContent: DocsPageContent = {
  id: 'disclosure',
  kind: 'component',
  title: 'Disclosure',
  description: 'A disclosure is a section that opens and closes when its heading is pressed. It keeps extra information out of the way until someone needs it, as with an answer in a list of frequently asked questions.',
  sections: [
    { key: 'example', intro: ['Activate `DisclosureHeader` to show or hide the `DisclosurePanel`. This example starts expanded.'] },
    {
      key: 'disclosureGroup',
      title: 'DisclosureGroup',
      intro: ['A `DisclosureGroup` (also known as a concertina) brings related disclosures together. Opening an item will close a previously open item by default, but you can opt to have multiple disclosures open simultaneously instead.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Disclosure anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Disclosure', description: 'Owns one expanded or collapsed panel.' },
          { name: 'DisclosureHeader', description: 'Composes Heading and the trigger Button; defaults to heading level 3.' },
          { name: 'DisclosurePanel', description: 'Contains the content that is shown or hidden.' },
          { name: 'DisclosureGroup', description: 'Optionally coordinates expansion across multiple disclosures.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Use `defaultExpanded` for initial state, or `isExpanded` with `onExpandedChange` for controlled state. Give grouped disclosures stable `id` values; the group uses `defaultExpandedKeys` or `expandedKeys` with `onExpandedChange`. Enable `allowsMultipleExpanded` when several panels may stay open.',
        'Set `isDisabled` on a Disclosure to prevent toggling.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab focuses the trigger; Enter or Space toggles its panel. Tab then reaches available controls inside an expanded panel. The trigger exposes its expanded state.',
        'Choose `DisclosureHeader level` to fit the page’s heading hierarchy. Its children supply the trigger label; do not place another button or link inside that label.',
        'Collapsing content stops accepting focus straight away.',
        'The chevron points right when closed and turns down when expanded.',
      ],
    },
    {
      key: 'tokens',
      intro: ['`Disclosure` also uses shared typography, border, surface, text, chevron, focus colour, rotation and disabled-opacity tokens.'],
      table: {
        label: 'Disclosure CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--disclosure-group-gap', description: 'Space between disclosures in a `DisclosureGroup`.' },
          { name: '--disclosure-border-width', description: 'Thickness of the divider below each disclosure.' },
          { name: '--disclosure-trigger-padding-block', description: 'Vertical trigger padding.' },
          { name: '--disclosure-trigger-padding-inline', description: 'Horizontal trigger padding.' },
          { name: '--disclosure-trigger-gap', description: 'Space between the trigger label and the chevron.' },
          { name: '--disclosure-trigger-background', description: 'Trigger background when not hovered or pressed.' },
          { name: '--disclosure-icon-size', description: 'Chevron size.' },
          { name: '--disclosure-panel-padding-block', description: 'Space below the panel content.' },
          { name: '--disclosure-panel-padding-inline', description: 'Horizontal panel padding.' },
          { name: '--disclosure-focus-ring-width', description: 'Keyboard-focus outline thickness on the trigger.' },
          { name: '--disclosure-focus-ring-offset', description: 'Keyboard-focus outline position on the trigger.' },
          { name: '--motion-duration-interface', description: 'Chevron rotation duration; the chevron turns immediately with reduced motion.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Dialog', href: '/dialog' },
    { label: 'Top bar', href: '/top-bar' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Disclosure', href: 'https://react-aria.adobe.com/Disclosure' },
    { label: 'React Aria DisclosureGroup', href: 'https://react-aria.adobe.com/DisclosureGroup' },
  ],
}

// The styled React Aria documentation link in the DisclosureGroup section.
export const disclosureGroupReactAriaLink: LinkItem = {
  label: 'View DisclosureGroup on React Aria',
  href: 'https://react-aria.adobe.com/DisclosureGroup',
}
