// Written guidance and reference entries; live examples stay in the page.
export const linkContent = {
  title: 'Link',
  description: 'A link takes someone to another page, a file or a different part of the current page. Its words or image tell them where it leads.',
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Navbar', href: '/navbar' },
  ],
  references: [
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
  ],
  exampleParagraphs: [
    <>
      This <code>Link</code> uses an <code>href</code> to navigate to another section on this page.
    </>,
  ],
  anatomyRows: [
    { name: 'Link', description: <>Provides a focusable destination through href, with optional text and decorative icons as children.</> },
  ],
  contentParagraphs: [
    <>
      When a <code>Link</code> opens a page in a new browser tab, add the External Link trailing icon to
      warn people before their browser context changes. Its accessible name must also include
      “opens in a new tab”.
    </>,
  ],
  usageParagraphs: [
    <>Use <code>href</code> for a destination and <code>Button</code> for an action. Give the link text enough context to make its destination clear. Use <code>aria-current="page"</code> for the current destination.</>,
    <>Tab focuses enabled links and Enter follows them. Use <code>isDisabled</code> to prevent activation. Supply <code>target</code> and <code>rel</code> when needed for external destinations, and keep new-window warnings consistent with the Content example above.</>,
    <>Client-side routing is supplied by the consuming application. Mezzanine exports the React Aria Link API directly; it does not choose a router or infer the current page.</>,
  ],
}
