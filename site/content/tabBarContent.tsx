import { Link } from '@decocode/mezzanine'

// Written guidance and reference entries; live examples stay in the page.
export const tabBarContent = {
  title: 'Tab bar',
  description: 'A tab bar is a row of links, often placed at the bottom of a phone screen, that takes people to the main areas of an app. It highlights the current destination and puts any links that do not fit inside a More menu.',
  relatedPages: [
    { label: 'Navbar', href: '/navbar' },
    { label: 'Tabs', href: '/tabs' },
    { label: 'Link', href: '/link' },
  ],
  references: [
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
    { label: 'React Aria Modal and Dialog', href: 'https://react-aria.adobe.com/Modal' },
  ],
  exampleParagraphs: [
    <>These sample destinations update the example without opening another page. Resize the window or enlarge text to reveal More. The example is placed inline so it does not cover the documentation.</>,
  ],
  anatomyRows: [
    { name: 'TabBar', description: <>Provides the labelled navigation region and moves destinations that do not fit into More.</> },
    { name: 'Link', description: <>Renders each destination, including its visible label, optional icon and current-page state.</> },
    { name: 'Button', description: <>Provides the More trigger and the sheet’s Close control.</> },
    { name: 'DialogTrigger', description: <>Connects More to the modal sheet and manages its open state.</> },
    { name: 'ModalOverlay', description: <>Provides the backdrop and modal interaction boundary.</> },
    { name: 'Modal', description: <>Contains the bottom sheet.</> },
    { name: 'Dialog', description: <>Provides the accessible dialog containing the remaining destinations.</> },
    { name: 'Heading', description: <>Labels the dialog through its title slot.</> },
  ],
  anatomyParagraphs: [
    <>Tab bar composes these Mezzanine components. See the official <Link href="https://react-aria.adobe.com/Link">React Aria Link</Link> and <Link href="https://react-aria.adobe.com/Modal">Modal</Link> documentation.</>,
  ],
  behaviourParagraphs: [
    <>Items retain the order supplied by the app. Tab bar measures its available width and minimum item width. When all items fit, More is omitted. Otherwise it reserves a place for More and moves the remaining links into the sheet. Very narrow layouts may show only More.</>,
    <>Tab moves between enabled links and More. Enter follows a link or opens the sheet. Escape, Close, or pressing the backdrop dismisses the sheet. React Aria manages modal focus. Choosing a sheet link closes it; disabled links cannot be activated.</>,
    <>The current destination uses <code>aria-current="page"</code>, an underline indicator and emphasis. If that destination is in the sheet, More has the indicator and includes its label in its accessible name. The sheet’s contents stay stable while it is open.</>,
  ],
  usageParagraphs: [
    <>Supply an <code>aria-label</code> and an <code>items</code> array. Each item needs a unique <code>id</code>, <code>href</code> and visible <code>label</code>. Optional <code>icon</code> content is decorative. Other link props, including <code>isDisabled</code>, <code>target</code> and event handlers, pass through to Link. The consuming app determines the current page and handles routing.</>,
    <>The default <code>position="bottom"</code> uses sticky positioning with phone safe-area spacing. Place TabBar after the content in the app’s layout; it remains in normal flow. It does not create a full-screen app shell. Use <code>position="inline"</code> for normal document placement.</>,
    <><code>moreLabel</code> and <code>closeLabel</code> replace the default More and Close text. It is page navigation, not a tab-panel control or an action toolbar.</>,
  ],
  propsRows: [
    { name: 'items', description: <>Required ordered array of TabBarItem destinations. An empty array hides the bar.</> },
    { name: 'aria-label', description: <>Required accessible name for the navigation.</> },
    { name: 'position', description: <>bottom (default) uses sticky positioning; inline keeps normal document placement.</> },
    { name: 'moreLabel', description: <>Overflow trigger and sheet title. Defaults to More.</> },
    { name: 'closeLabel', description: <>Sheet close-button label. Defaults to Close.</> },
    { name: 'className', description: <>Optional class added to the outer nav.</> },
  ],
  propsParagraphs: [
    <>Each <code>TabBarItem</code> requires <code>id</code>, <code>href</code> and <code>label</code>. Optional <code>icon</code> content is decorative. Set <code>aria-current="page"</code> on the current item; link props such as <code>isDisabled</code>, <code>target</code> and event handlers pass through.</>,
  ],
  tokensRows: [
    { name: '--tab-bar-background', description: 'Navigation surface colour.' },
    { name: '--tab-bar-item-background-current', description: 'Current destination background.' },
    { name: '--tab-bar-border-width', description: 'Navigation border thickness.' },
    { name: '--tab-bar-z-index', description: 'Sticky bar stacking order.' },
    { name: '--tab-bar-sheet-max-height', description: 'Maximum overflow sheet height.' },
    { name: '--tab-bar-safe-area-bottom', description: 'Space reserved beneath the sticky bar for the device safe area.' },
    { name: '--tab-bar-gap', description: 'Space between destination slots.' },
    { name: '--tab-bar-padding', description: 'Padding around the destination list.' },
    { name: '--tab-bar-item-min-width', description: 'Minimum slot width used to calculate overflow.' },
    { name: '--tab-bar-item-min-height', description: 'Minimum link and More-button height.' },
    { name: '--tab-bar-item-gap', description: 'Space between an icon and its label.' },
    { name: '--tab-bar-item-padding', description: 'Padding inside destination controls.' },
    { name: '--tab-bar-icon-size', description: 'Destination icon dimensions.' },
    { name: '--tab-bar-indicator-width', description: 'Current destination indicator thickness.' },
    { name: '--tab-bar-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
    { name: '--tab-bar-focus-ring-offset', description: 'Keyboard-focus outline offset.' },
  ],
  tokensParagraphs: [
    <>Override these CSS custom properties on the component or a containing theme. Defaults come from Mezzanine’s token stylesheet; shared colour, spacing and Modal tokens also apply.</>,
  ],
}
