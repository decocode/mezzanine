import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Teaching labels for the live example, shared with the Panel page.
export const appShellExampleLabels = {
  shell: 'AppShell example',
  header: 'Header',
  main: 'Main content',
  mainText: 'The main content shrinks to make room for open Panels.',
  startPanel: 'Panel A',
  startPanelText: 'A start Panel.',
  endPanel: 'Panel B',
  endPanelText: 'An end Panel.',
  bottomPanel: 'Panel C',
  bottomPanelText: 'A bottom Panel.',
  bottomMinimized: 'Panel C, minimised',
  footer: 'Footer',
} as const

export const appShellContent: DocsPageContent = {
  id: 'app-shell',
  kind: 'component',
  title: 'AppShell',
  description: 'AppShell is the frame around an app’s main content: a header across the top, Panels at the start, end and bottom edges, and the main content in the middle, which shrinks to make room for them.',
  sections: [
    { key: 'example', intro: ['A header with three PanelTriggers, and Panels at the start, end and bottom. The bottom Panel shows a minimised version when it isn’t open.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'AppShell anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'AppShell', description: 'The frame. It lays out its children in a grid that responds to its own size.' },
          { name: 'header', description: 'The app’s own `<header>`, across the top, such as one holding a `TopBar`.' },
          { name: 'Panel', description: 'An area at the start, end or bottom edge. See [Panel](/panel).' },
          { name: 'main', description: 'The app’s own `<main>`, in the middle. It keeps a minimum width.' },
          { name: 'Footer', description: 'Optional. It follows the main content, and the two scroll together. See [Footer](/footer).' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        'Open Panels share the space: the main content gets smaller to make room. AppShell responds to its own width, not the screen’s.',
        'When the main content would drop below its minimum width, a side Panel opens as a drawer in front of the page instead. With two side Panels open, the end Panel becomes a drawer first, and the start Panel stays beside the content as long as it can. Bottom Panels always share the space.',
        'AppShell fills the height of the window. The main content and its Footer scroll together, and each Panel scrolls on its own.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Put a `<header>`, your Panels, a `<main>` and an optional `Footer` inside `AppShell`, in reading order. Give each Panel an `id` and an `edge`, and place a `PanelTrigger` with that `id` wherever suits the app, such as in the header.',
        'Set `bottomPanelSpan="full"` to run a bottom Panel under the side Panels too, as in a code editor. By default it sits under the main content only.',
        'Set `startPanelSpan="full"` or `endPanelSpan="full"` to run a side Panel the full height of the window, with the header beside it rather than above it. On narrow screens nothing changes, as the Panel becomes a drawer or is hidden.',
        'The `<header>` is optional. Without one, the Panels and main content start at the top.',
        'Each area (the header, the Panels and the main content) is a card with rounded corners and a hairline border, on a darker background. In Wireframe the gap is 0 and the cards join into one flat, square frame.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Using your own `<header>` and `<main>` keeps the page’s banner and main landmarks. Each shared-space Panel is a complementary landmark named by its title, and a drawer is a modal dialog.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'AppShell props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'children', description: 'An optional `<header>`, Panels, a `<main>` and an optional Footer.' },
          { name: 'bottomPanelSpan', description: '`main` (default) puts a bottom Panel under the main content only; `full` puts it under the side Panels too.' },
          { name: 'startPanelSpan', description: '`main` (default) puts the start Panel beside the main content; `full` runs it the full height, beside the header.' },
          { name: 'endPanelSpan', description: '`main` (default) puts the end Panel beside the main content; `full` runs it the full height, beside the header.' },
          { name: 'className', description: 'Adds your own class, for example to set the AppShell’s height.' },
        ],
      },
    },
    {
      key: 'tokens',
      table: {
        label: 'AppShell CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--app-shell-min-main-width', description: 'The narrowest the main content gets before a side Panel becomes a drawer. Defaults to `--ratio-pair-min-area-width`.' },
          { name: '--app-shell-gap', description: 'Space around and between the cards. Points at the theme’s `--surface-gap` role: `--space-2` in Light and Dark, 0 in Wireframe, where the cards join into one flat frame.' },
          { name: '--app-shell-background', description: 'The background behind the cards. Points at `--elevation-sunken-1-surface`.' },
          { name: '--app-shell-surface-background', description: 'The cards’ background: the header, Panels and main content. Points at `--elevation-flat-surface`, so Cards and other raised surfaces lift off it.' },
          { name: '--app-shell-surface-radius', description: 'Rounding of the cards’ corners: one step less than `--radius-surface`, and square where surfaces are square.' },
          { name: '--app-shell-surface-border-width', description: 'The cards’ border thickness: `--border-width-xs`, a half-pixel hairline.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Panel', href: '/panel' },
    { label: 'Top bar', href: '/top-bar' },
  ],
  references: [
    { label: 'MDN: grid-template-areas', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas' },
    { label: 'WAI-ARIA Authoring Practices: Landmark regions', href: 'https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/' },
  ],
}
