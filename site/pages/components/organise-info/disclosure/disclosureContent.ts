import type { DocsPageContent, LinkItem } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const disclosureContent: DocsPageContent = {
  id: 'disclosure',
  kind: 'component',
  title: 'Disclosure',
  description: 'A disclosure is a section that opens and closes when its heading is pressed. It keeps extra information out of the way until someone needs it, as with an answer in a list of frequently asked questions.',
  sections: [
    { key: 'example', intro: ['`DisclosureHeader` shows or hides the `DisclosurePanel`. With `defaultExpanded`, it starts open.'] },
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
          { name: '--motion-duration-interface', description: 'Chevron rotation duration; the chevron turns immediately with reduced motion.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Disclosure pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Disclosure'),
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

// The Properties panels' on/off props, in panel order.
export const disclosureFlags = ['defaultExpanded', 'isDisabled'] as const
export const disclosureGroupFlags = ['allowsMultipleExpanded', 'isDisabled'] as const
export const disclosureGroupItems = ['A', 'B', 'C'] as const

export function disclosureExampleCode(props: Record<string, unknown>) {
  return [
    `<Disclosure${formatJsxProps(props)}>`,
    '  <DisclosureHeader>Disclosure A</DisclosureHeader>',
    '  <DisclosurePanel>DisclosurePanel A content.</DisclosurePanel>',
    '</Disclosure>',
  ].join('\n')
}

export function disclosureGroupExampleCode(props: Record<string, unknown>) {
  return [
    `<DisclosureGroup defaultExpandedKeys={['disclosure-a']}${formatJsxProps(props)}>`,
    ...disclosureGroupItems.flatMap((item) => [
      `  <Disclosure id="disclosure-${item.toLowerCase()}">`,
      `    <DisclosureHeader>Disclosure ${item}</DisclosureHeader>`,
      `    <DisclosurePanel>DisclosurePanel ${item} content.</DisclosurePanel>`,
      '  </Disclosure>',
    ]),
    '</DisclosureGroup>',
  ].join('\n')
}
