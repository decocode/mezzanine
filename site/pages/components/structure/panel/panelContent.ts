import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

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
          { name: 'Resize handle', description: 'Optional, on a side Panel’s inner edge: a separator that changes the Panel’s width.' },
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
        'A resizable side Panel can be dragged wider or narrower by its inner edge, between `--panel-min-width` and `--panel-max-width`, and never so wide that the main content drops below its minimum. Clicking the edge without dragging steps through its narrowest, usual and widest widths, so it can be resized without dragging. A double click restores its usual width. As a drawer, it keeps its token width.',
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
        'A resize handle follows the [window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) pattern: a focusable separator named “Resize” and the Panel’s name, which announces its width, with a tooltip on hover and focus. The arrow keys change the width by `--space-4`, and Home and End take it to its narrowest and widest.',
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
          { name: 'title', description: 'The Panel’s visible heading, and the name of its landmark.' },
          { name: 'aria-label', description: 'Use instead of `title` when the app already shows what the Panel is, such as a navigation Panel under a TopBar. The Panel then has no heading, and screen readers announce this name.' },
          { name: 'headingLevel', description: 'The heading’s level, from 2 to 6. Defaults to 2.' },
          { name: 'minimized', description: 'Content shown when the Panel isn’t open: the same content, condensed.' },
          { name: 'closeLabel', description: 'The close button’s label. Defaults to “Close” followed by the title.' },
          { name: 'isCollapsible', description: 'Whether the Panel can be closed. Defaults to `true`, with a close button, and a `PanelTrigger` elsewhere reopens it. When `false`, it stays open with no close button, and it’s hidden when there’s no room beside the content, so offer the same content another way.' },
          { name: 'isResizable', description: 'Whether a side Panel can be resized by dragging or clicking its inner edge, or with the arrow keys. Defaults to `false`. Ignored for a bottom Panel.' },
          { name: 'isOpen / defaultOpen / onOpenChange', description: 'Control the open state, set its starting value, or respond to changes.' },
          { name: 'children', description: 'The Panel’s content.' },
          { name: 'className', description: 'Adds your own class.' },
          { name: 'PanelTrigger: panel', description: 'The `id` of the Panel it opens and closes.' },
          { name: 'PanelTrigger: hierarchy / size / icon / iconPosition', description: 'Appearance, as on `Button`. PanelTrigger accepts every other `Button` prop too.' },
        ],
      },
    },
    {
      key: 'tokens',
      table: {
        label: 'Panel CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--panel-start-width', description: 'How wide the start Panel is. Defaults to `--width-md`.' },
          { name: '--panel-end-width', description: 'How wide the end Panel is, such as wider for a chat Panel or narrower for a list of contents. Defaults to `--width-md`.' },
          { name: '--panel-max-height', description: 'The tallest a bottom Panel grows, as a share of the AppShell’s height.' },
          { name: '--panel-min-width', description: 'The narrowest a resizable Panel can be made. Defaults to `--width-sm`.' },
          { name: '--panel-max-width', description: 'The widest a resizable Panel can be made. Defaults to `--width-lg`.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Panel pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Panel'),
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
    { label: 'WAI-ARIA Authoring Practices: Window splitter', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/' },
    { label: 'React Aria: useMove', href: 'https://react-aria.adobe.com/useMove' },
  ],
}

// The Panel example's labels, and the Properties panel's choices. Only a side Panel can be resized,
// and minimized and defaultOpen only apply to a Panel that can be closed.
export const panelExampleLabels = { title: 'Panel A', text: 'A Panel.', minimized: 'Panel A, minimised', header: 'Header', main: 'Main content', mainText: 'The main content shrinks to make room for the Panel.' } as const
export const panelEdges = ['start', 'end', 'bottom'] as const
export const panelFlags = ['isCollapsible', 'defaultOpen', 'minimized', 'isResizable'] as const

export function panelExampleCode({ edge, flags }: { edge: string, flags: Record<(typeof panelFlags)[number], boolean> }) {
  const isSide = edge !== 'bottom'
  const props = formatJsxProps({
    isCollapsible: flags.isCollapsible ? undefined : false,
    defaultOpen: flags.isCollapsible && flags.defaultOpen,
    isResizable: isSide && flags.isResizable,
  })
  const minimized = flags.isCollapsible && flags.minimized ? ` minimized={<p>${panelExampleLabels.minimized}</p>}` : ''
  return [
    '<AppShell>',
    ...(flags.isCollapsible ? [`  <header><PanelTrigger panel="panel-a">${panelExampleLabels.title}</PanelTrigger></header>`] : []),
    `  <Panel id="panel-a" edge="${edge}" title="${panelExampleLabels.title}"${props}${flags.isCollapsible ? '' : ' isCollapsible={false}'}${minimized}>`,
    `    <p>${panelExampleLabels.text}</p>`,
    '  </Panel>',
    `  <main aria-label="${panelExampleLabels.main}">…</main>`,
    '</AppShell>',
  ].join('\n')
}
