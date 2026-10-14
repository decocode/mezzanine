import { ExternalLinkIcon, Link } from '@decocode/mezzanine'

// Rich text uses JSX to preserve inline code and accessible links.
export const navbarContent = {
  title: 'Navbar',
  relatedPages: [
    { label: 'Tab bar', href: '/tab-bar' },
    { label: 'Sidebar', href: '/sidebar' },
    { label: 'Footer', href: '/footer' },
  ],
  references: [
    { label: 'React Aria Disclosure', href: 'https://react-aria.adobe.com/Disclosure' },
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
  ],
  description: 'A navbar is a bar at the top of a website that helps people find its main pages. It can include a logo, links and buttons; on smaller screens, the links and buttons appear inside a menu.',
  exampleIntroduction: 'Home link, Link A and Link B change the current link in this example without navigating away. Button demonstrates an action. Reduce the available width to reveal the mobile menu.',
  behaviour: [
    <>Below 48rem of container width, a Menu button replaces the inline navigation and actions. Opening it changes the icon and label to Close menu. The panel expands beneath the bar in document flow and scrolls vertically when needed.</>,
    <>The mobile panel uses <Link href="https://react-aria.adobe.com/Disclosure" target="_blank" rel="noreferrer" aria-label="React Aria Disclosure (opens in a new tab)"><span>React Aria Disclosure</span><ExternalLinkIcon /></Link>.</>,
    <>Enter or Space toggles the trigger. Tab moves through the visible links and actions. This Disclosure is not a modal: focus is not trapped, and Escape and outside clicks do not close it. Motion is removed when reduced motion is requested.</>,
  ],
  usage: [
    <>Supply a home Link through <code>brand</code>, links through <code>children</code>, and optional controls through <code>actions</code>. Give the navigation an <code>aria-label</code>. Labels and destinations belong to the consuming app.</>,
    <>Both <code>children</code> and <code>actions</code> accept a function receiving <code>closeMenu</code>. Call it from a link’s <code>onPress</code> to close the compact panel and return focus to its trigger. Set <code>aria-current="page"</code> on the current link. Override <code>menuLabel</code> and <code>closeLabel</code> for translated trigger text.</>,
    <>The desktop and mobile content are rendered separately; avoid fixed IDs in supplied content. Use React-generated IDs for associated controls. Very long desktop content wraps rather than overflowing. Search is not included.</>,
    <><code>Navbar</code>, <code>NavbarProps</code>, <code>NavbarRenderProps</code> and <code>--navbar-*</code> tokens replace the previous Header API and tokens.</>,
  ],
  anatomy: [
    { name: 'Navbar', description: 'Sticky header with separate brand, navigation and action areas.' },
    { name: 'Link', description: 'Brand home link and navigation destinations, supplied by the app.' },
    { name: 'Disclosure', description: 'Controls the mobile panel’s expanded state.' },
    { name: 'Heading', description: 'Contains the mobile trigger.' },
    { name: 'Button', description: 'Opens and closes the mobile panel; also supports app-supplied actions.' },
    { name: 'DisclosurePanel', description: 'Contains links and actions in the compact layout.' },
  ],
  props: [
    { name: 'brand', description: 'Required branding content. Supply a Link for a home destination.' },
    { name: 'children', description: 'Required navigation content, or a function receiving closeMenu. Navbar supplies the nav element.' },
    { name: 'actions', description: 'Optional action controls, or a function receiving closeMenu.' },
    { name: 'aria-label', description: 'Required accessible name for the navigation.' },
    { name: 'menuLabel', description: 'Closed trigger label. Defaults to Menu.' },
    { name: 'closeLabel', description: 'Expanded trigger label. Defaults to Close menu.' },
    { name: 'className', description: 'Optional class added to the outer header.' },
  ],
  tokens: [
    { name: '--navbar-z-index', description: 'Header stacking order.' },
    { name: '--navbar-border-width', description: 'Header and trigger border thickness.' },
    { name: '--navbar-min-height', description: 'Minimum content-row height.' },
    { name: '--navbar-wide-padding-inline', description: 'Horizontal padding in the wide layout.' },
    { name: '--navbar-menu-min-height', description: 'Minimum navigation-link height; the menu trigger uses Button size="sm".' },
    { name: '--navbar-focus-ring-width', description: 'Trigger focus outline thickness.' },
    { name: '--navbar-focus-ring-offset', description: 'Trigger focus outline offset.' },
    { name: '--navbar-panel-max-height', description: 'Maximum panel height before scrolling.' },
    { name: '--motion-duration-interface', description: 'Panel entry animation duration; disabled for reduced motion.' },
    { name: '--motion-distance-reveal', description: 'Shared reveal distance; the recipe applies the upward starting direction.' },
  ],
  tokensIntroduction: 'Override these CSS custom properties on the component or a containing theme. Defaults come from Mezzanine’s token stylesheet; shared colour, spacing tokens also apply.',
}
