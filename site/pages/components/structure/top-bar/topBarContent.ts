import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const topBarContent: DocsPageContent = {
  id: 'top-bar',
  kind: 'component',
  title: 'Top bar',
  description: 'A top bar runs across the top of a website and helps people find its main pages. It can include a logo, links and buttons; on smaller screens, the links appear inside a menu and the buttons stay in the bar.',
  sections: [
    { key: 'example', body: ['Home link, Link A and Link B change the current link in this example without navigating away. Button demonstrates an action. Reduce the available width to reveal the mobile menu.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'TopBar anatomy',
        nameColumn: 'Component',
        rows: [
          { name: 'TopBar', description: 'Sticky header with separate brand, navigation and action areas.' },
          { name: 'Link', description: 'Brand home link and navigation destinations, supplied by the app.' },
          { name: 'Disclosure', description: 'Controls the mobile panel’s expanded state.' },
          { name: 'Heading', description: 'Contains the mobile trigger.' },
          { name: 'Button', description: 'Icon-only trigger that opens and closes the mobile panel; also supports app-supplied actions.' },
          { name: 'Tooltip', description: 'Shows the trigger’s name, Menu or Close menu, on hover and keyboard focus.' },
          { name: 'DisclosurePanel', description: 'Contains the links in the compact layout.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        'Below 32rem of container width, a Menu button replaces the inline navigation. Inside an AppShell whose start Panel can’t be closed (such as an app’s navigation) but is hidden for lack of room, the Menu button stays at every width, so that navigation can always be reached. Actions stay in the bar, between the brand and the Menu button. The Menu button shows only an icon. Its accessible name is Menu, and a Tooltip shows that name on hover and keyboard focus. Opening it changes the icon and the name to Close menu. The panel expands beneath the bar in document flow and scrolls vertically when needed.',
        'The mobile panel uses [React Aria Disclosure](https://react-aria.adobe.com/Disclosure).',
        'Enter or Space toggles the trigger. Tab moves through the visible links and actions. This Disclosure is not a modal: focus is not trapped, and Escape and outside clicks do not close it. Motion is removed when reduced motion is requested.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Supply a home Link through `brand`, links through `children`, and optional controls through `actions`. Labels and destinations belong to the consuming app.',
        '`children` and `actions` accept a function receiving `closeMenu` and `isMenu`. The children render once in the compact menu and once in the bar; `isMenu` is true inside the menu, so content such as a site’s section navigation can appear only there, between links. Call it from a link’s `onPress` to close the compact panel and return focus to its trigger. Override `menuLabel` and `closeLabel` for translated trigger text.',
        'The desktop and mobile content are rendered separately; avoid fixed IDs in supplied content. Use React-generated IDs for associated controls. Very long desktop content wraps rather than overflowing. Search is not included.',
        '`TopBar`, `TopBarProps` and `TopBarRenderProps` replace the previous `Navbar` API.',
      ],
    },
    {
      key: 'accessibility',
      body: ['Give the navigation an `aria-label`. Set `aria-current="page"` on the current link.'],
    },
    {
      key: 'props',
      table: {
        label: 'TopBar props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'brand', description: 'Required branding content. Supply a Link for a home destination.' },
          { name: 'children', description: 'Required navigation content, or a function receiving closeMenu and isMenu. TopBar supplies the nav element.' },
          { name: 'actions', description: 'Optional action controls, or a function receiving closeMenu. Shown in the bar at every width.' },
          { name: 'aria-label', description: 'Required accessible name for the navigation.' },
          { name: 'menuLabel', description: 'Closed trigger’s accessible name and tooltip. Defaults to Menu.' },
          { name: 'closeLabel', description: 'Expanded trigger’s accessible name and tooltip. Defaults to Close menu.' },
          { name: 'className', description: 'Optional class added to the outer header.' },
        ],
      },
    },
    {
      key: 'tokens',
      body: ['Override these CSS custom properties on the component or a containing theme. Defaults come from Mezzanine’s token stylesheet; shared colour, spacing tokens also apply.'],
      table: {
        label: 'TopBar tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--motion-duration-interface', description: 'Panel entry animation duration; disabled for reduced motion.' },
          { name: '--motion-distance-reveal', description: 'Shared reveal distance; the recipe applies the upward starting direction.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Top bar pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('TopBar'),
      },
    },
  ],
  relatedPages: [
    { label: 'Footer', href: '/footer' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Disclosure', href: 'https://react-aria.adobe.com/Disclosure' },
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
  ],
}

// The Properties panel's on/off props: the brand at the start, and the actions at the end.
export const topBarFlags = ['brand', 'actions'] as const

export function topBarExampleCode(flags: Record<(typeof topBarFlags)[number], boolean>) {
  return [
    '<TopBar aria-label="Example navigation"',
    ...(flags.brand ? ['  brand={<Link href="/" aria-label="Example home">…</Link>}'] : []),
    ...(flags.actions ? ['  actions={<Button onPress={save}>Button</Button>}'] : []),
    '>',
    '  {({ closeMenu }) => <>',
    '    <Link href="/" aria-current="page" onPress={closeMenu}>Home link</Link>',
    '    <Link href="/a" onPress={closeMenu}>Link A</Link>',
    '    <Link href="/b" onPress={closeMenu}>Link B</Link>',
    '    <Link href="/disabled" isDisabled>Disabled link</Link>',
    '  </>}',
    '</TopBar>',
  ].join('\n')
}
