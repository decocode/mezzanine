// Written guidance and reference entries; live examples stay in the page.
export const disclosureContent = {
  title: 'Disclosure',
  description: 'A disclosure is a section that opens and closes when its heading is pressed. It keeps extra information out of the way until someone needs it, as with an answer in a list of frequently asked questions.',
  relatedPages: [
    { label: 'Dialog', href: '/dialog' },
    { label: 'Navbar', href: '/navbar' },
  ],
  references: [
    { label: 'React Aria Disclosure', href: 'https://react-aria.adobe.com/Disclosure' },
    { label: 'React Aria DisclosureGroup', href: 'https://react-aria.adobe.com/DisclosureGroup' },
  ],
  exampleParagraphs: [
    <>
      Activate <code>DisclosureHeader</code> to show or hide the <code>DisclosurePanel</code>. This example starts expanded.
    </>,
  ],
  anatomyRows: [
    { name: 'Disclosure', description: <>Owns one expanded or collapsed panel.</> },
    { name: 'DisclosureHeader', description: <>Composes Heading and the trigger Button; defaults to heading level 3.</> },
    { name: 'DisclosurePanel', description: <>Contains the content that is shown or hidden.</> },
    { name: 'DisclosureGroup', description: <>Optionally coordinates expansion across multiple disclosures.</> },
  ],
  disclosureGroupParagraphs: [
    <>
      A <code>DisclosureGroup</code> (also known as a concertina) brings related disclosures together.
      Opening an item will close a previously open item by default, but you can opt to have
      multiple disclosures open simultaneously instead.
    </>,
  ],
  usageParagraphs: [
    <>Use <code>defaultExpanded</code> for initial state, or <code>isExpanded</code> with <code>onExpandedChange</code> for controlled state. Give grouped disclosures stable <code>id</code> values; the group uses <code>defaultExpandedKeys</code> or <code>expandedKeys</code> with <code>onExpandedChange</code>. Enable <code>allowsMultipleExpanded</code> when several panels may stay open.</>,
    <>Set <code>isDisabled</code> on a Disclosure to prevent toggling.</>,
  ],
  accessibilityParagraphs: [
    <>Tab focuses the trigger; Enter or Space toggles its panel. Tab then reaches available controls inside an expanded panel. The trigger exposes its expanded state.</>,
    <>Choose <code>DisclosureHeader level</code> to fit the page’s heading hierarchy. Its children supply the trigger label; do not place another button or link inside that label.</>,
    <>Collapsing content stops accepting focus straight away.</>,
    <>The chevron points right when closed and turns down when expanded.</>,
  ],
  tokensRows: [
    { name: '--disclosure-group-gap', description: <>Space between disclosures in a <code>DisclosureGroup</code>.</> },
    { name: '--disclosure-border-width', description: 'Thickness of the divider below each disclosure.' },
    { name: '--disclosure-trigger-min-height', description: 'Minimum trigger height.' },
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
  tokensParagraphs: [
    <><code>Disclosure</code> also uses shared typography, border, surface, text, chevron, focus colour, rotation and disabled-opacity tokens.</>,
  ],
}
