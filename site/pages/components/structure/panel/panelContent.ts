import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const panelContent: DocsPageContent = {
  id: 'panel',
  kind: 'component',
  title: 'Panel',
  description: 'A Panel is an area at the start, end or bottom of an AppShell that shares the space with the main content. It is open or closed, with an optional minimised version, and a PanelTrigger placed anywhere in the AppShell opens and closes it.',
  sections: [
    { key: 'example', intro: ['The same AppShell as on the [AppShell](/app-shell) page: Panels A, B and C, each with its own PanelTrigger in the header.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Panel anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Panel', description: 'A labelled `<aside>` at its edge, holding a header and the content.' },
          { name: 'Header', description: 'The Panel’s title as a heading, and a close button whose label shows in a tooltip.' },
          { name: 'Minimised version', description: 'Optional content shown when the Panel isn’t open, such as a condensed timeline.' },
          { name: 'PanelTrigger', description: 'A `Button` placed elsewhere in the AppShell that opens and closes the Panel.' },
        ],
        namesAreCode: false,
      },
    },
    {
      key: 'behaviour',
      body: [
        'Opening a Panel makes room for it: the main content gets smaller. A closed Panel shows its minimised version if it has one, and otherwise takes no space.',
        'A side Panel without room beside the content opens as a drawer in front of the page. The [AppShell](/app-shell) page explains when.',
        'Closing a Panel with its own close button moves focus back to its PanelTrigger.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Give each Panel an `id`, an `edge` (`start`, `end` or `bottom`) and a `title`. A `PanelTrigger` with `panel` set to the same `id` opens and closes it.',
        'Panels are closed until opened, unless you set `defaultOpen`. To control the state yourself, use `isOpen` and `onOpenChange`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'A Panel is a complementary landmark named by its title. When closed without a minimised version, it can’t be reached by keyboard or screen reader.',
        'PanelTrigger tells screen readers whether its Panel is expanded or collapsed (`aria-expanded`), and which element it controls (`aria-controls`).',
        'As a drawer, a Panel is a modal dialog: focus stays inside it, Escape closes it, and focus returns to the PanelTrigger.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'Panel props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'id', description: 'Names the Panel for its PanelTrigger.' },
          { name: 'edge', description: '`start`, `end` or `bottom`.' },
          { name: 'title', description: 'The Panel’s heading, and the name of its landmark.' },
          { name: 'headingLevel', description: 'The heading’s level, from 2 to 6. Defaults to 2.' },
          { name: 'minimized', description: 'Content shown when the Panel isn’t open: the same content, condensed.' },
          { name: 'closeLabel', description: 'The close button’s label. Defaults to “Close” followed by the title.' },
          { name: 'isOpen / defaultOpen / onOpenChange', description: 'Control the open state, set its starting value, or respond to changes.' },
          { name: 'children', description: 'The Panel’s content.' },
          { name: 'className', description: 'Adds your own class.' },
          { name: 'PanelTrigger: panel', description: 'The `id` of the Panel it opens and closes.' },
          { name: 'PanelTrigger: variant / size / iconLeading / labelPlacement', description: 'Appearance, as on `Button`. PanelTrigger accepts every other `Button` prop too.' },
        ],
      },
    },
    {
      key: 'tokens',
      table: {
        label: 'Panel CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--panel-width', description: 'How wide a side Panel is when open, and as a drawer.' },
          { name: '--panel-max-height', description: 'The tallest a bottom Panel grows, as a share of the AppShell’s height.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'AppShell', href: '/app-shell' },
    { label: 'Button', href: '/button' },
  ],
  references: [
    { label: 'React Aria: Modal', href: 'https://react-aria.adobe.com/Modal' },
    { label: 'WAI-ARIA Authoring Practices: Disclosure', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/' },
  ],
}
