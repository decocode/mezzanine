import { navbarTokens } from '../componentTokenDocumentation'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { Navbar, Link, Button, Table, TableHeader, Column, TableBody, Row, Cell } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function NavbarPage() {
  const [destination, setDestination] = useState('Home link')
  const [isSaved, setIsSaved] = useState(false)
  return (
    <ComponentPageTemplate
      title="Navbar"
      description="Responsive top navigation with app-supplied branding, links and optional actions. Composes Mezzanine’s Disclosure, Heading and Button with semantic navigation."
      sections={[
        {
          id: 'navbar-example',
          title: 'Example',
          content: (<>
            <p>Home link, Link A and Link B change the current link in this example without navigating away. Button demonstrates an action. Reduce the available width to reveal the mobile menu.</p>
            <div className="component-example navbar-example">
              <RouterProvider navigate={(href) => setDestination(decodeURIComponent(href.slice(1)))}>
                <Navbar aria-label="Example navigation"
                  brand={<Link href="#Home%20link" aria-label="Example home"><span aria-hidden="true" className="site-logo" /></Link>}
                  actions={<Button onPress={() => setIsSaved(true)} isDisabled={isSaved}>{isSaved ? 'Saved' : 'Button'}</Button>}>
                  {({ closeMenu }) => <>
                    {['Home link', 'Link A', 'Link B'].map((label) => <Link key={label} href={`#${encodeURIComponent(label)}`} aria-current={destination === label ? 'page' : undefined} onPress={closeMenu}>{label}</Link>)}
                    <Link href="#Disabled%20link" isDisabled>Disabled link</Link>
                  </>}
                </Navbar>
              </RouterProvider>
              <p role="status">{isSaved ? 'Changes saved.' : ''}</p>
            </div>
          </>),
        },
        {
          id: 'navbar-anatomy',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table">
            <Table aria-label="Navbar anatomy">
              <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
              <TableBody>
                <Row><Cell><code>Navbar</code></Cell><Cell>Sticky header with separate brand, navigation and action areas.</Cell></Row>
                <Row><Cell><code>Link</code></Cell><Cell>Brand home link and navigation destinations, supplied by the app.</Cell></Row>
                <Row><Cell><code>Disclosure</code></Cell><Cell>Controls the mobile panel’s expanded state.</Cell></Row>
                <Row><Cell><code>Heading</code></Cell><Cell>Contains the mobile trigger.</Cell></Row>
                <Row><Cell><code>Button</code></Cell><Cell>Opens and closes the mobile panel; also supports app-supplied actions.</Cell></Row>
                <Row><Cell><code>DisclosurePanel</code></Cell><Cell>Contains links and actions in the compact layout.</Cell></Row>
              </TableBody>
            </Table>
            </div>
          </>),
        },
        {
          id: 'navbar-behaviour',
          title: 'Behaviour',
          content: (<>
            <p>Below 48rem of container width, a Menu button replaces the inline navigation and actions. Opening it changes the icon and label to Close menu. The panel expands beneath the bar in document flow and scrolls vertically when needed.</p>
            <p>The mobile panel uses <Link href="https://react-aria.adobe.com/Disclosure" target="_blank" rel="noreferrer">React Aria Disclosure (opens in a new tab)</Link>.</p>
            <p>Enter or Space toggles the trigger. Tab moves through the visible links and actions. This Disclosure is not a modal: focus is not trapped, and Escape and outside clicks do not close it. Motion is removed when reduced motion is requested.</p>
          </>),
        },
        {
          id: 'navbar-usage',
          title: 'Usage',
          content: (<>
            <p>Supply a home Link through <code>brand</code>, links through <code>children</code>, and optional controls through <code>actions</code>. Give the navigation an <code>aria-label</code>. Labels and destinations belong to the consuming app.</p>
            <p>Both <code>children</code> and <code>actions</code> accept a function receiving <code>closeMenu</code>. Call it from a link’s <code>onPress</code> to close the compact panel and return focus to its trigger. Set <code>aria-current="page"</code> on the current link. Override <code>menuLabel</code> and <code>closeLabel</code> for translated trigger text.</p>
            <p>The desktop and mobile content are rendered separately; avoid fixed IDs in supplied content. Use React-generated IDs for associated controls. Very long desktop content wraps rather than overflowing. Search is not included.</p>
            <p><code>Navbar</code>, <code>NavbarProps</code>, <code>NavbarRenderProps</code> and <code>--navbar-*</code> tokens replace the previous Header API and tokens.</p>
          </>),
        },
        {
          id: 'navbar-props-heading',
          title: 'Props',
          content: (<>
            <div className="documentation-table documentation-props-table">
              <Table aria-label="Navbar props">
                <TableHeader><Column isRowHeader>Prop</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>brand</code></Cell><Cell>Required branding content. Supply a Link for a home destination.</Cell></Row>
                  <Row id="part-1"><Cell><code>children</code></Cell><Cell>Required navigation content, or a function receiving closeMenu. Navbar supplies the nav element.</Cell></Row>
                  <Row id="part-2"><Cell><code>actions</code></Cell><Cell>Optional action controls, or a function receiving closeMenu.</Cell></Row>
                  <Row id="part-3"><Cell><code>aria-label</code></Cell><Cell>Required accessible name for the navigation.</Cell></Row>
                  <Row id="part-4"><Cell><code>menuLabel</code></Cell><Cell>Closed trigger label. Defaults to Menu.</Cell></Row>
                  <Row id="part-5"><Cell><code>closeLabel</code></Cell><Cell>Expanded trigger label. Defaults to Close menu.</Cell></Row>
                  <Row id="part-6"><Cell><code>className</code></Cell><Cell>Optional class added to the outer header.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'navbar-tokens-heading',
          title: 'CSS tokens',
          content: (<>
            <p>Override these CSS custom properties on the component or a containing theme. Defaults come from Mezzanine’s token stylesheet; shared colour, spacing tokens also apply.</p>
            <div className="documentation-table">
              <Table aria-label="Navbar tokens">
                <TableHeader><Column isRowHeader>CSS token</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  {navbarTokens.map((item) => <Row id={item.token} key={item.token}><Cell><code>{item.token}</code></Cell><Cell>{item.description}</Cell></Row>)}
                </TableBody>
              </Table>
            </div>
          </>),
        }
      ]}
    />
  )
}
