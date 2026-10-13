import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { Link, TabBar, HomeIcon, AccountIcon, SettingsIcon, CloseIcon, TableOfContents, Table, TableHeader, Column, TableBody, Row, Cell } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'

export default function TabBarPage() {
  const [destination, setDestination] = useState('Home')
  return (
    <>
      <DocumentationHeading title="Tab bar" description="Bottom navigation for smaller screens, with visible labels and optional icons. Destinations that do not fit are available through More in a bottom sheet." />
      <TableOfContents sections={[
        { id: 'tab-bar-example', label: 'Example' },
        { id: 'tab-bar-anatomy', label: 'Anatomy' },
        { id: 'tab-bar-behaviour', label: 'Behaviour' },
        { id: 'tab-bar-usage', label: 'Usage' },
      ]} />
      <section className="component-section" aria-labelledby="tab-bar-example">
        <h2 className="mz-text-heading-md" id="tab-bar-example">Example</h2>
        <p>These sample destinations update the example without opening another page. Resize the window or enlarge text to reveal More. The example is placed inline so it does not cover the documentation.</p>
        <div className="component-example">
          <RouterProvider navigate={(href) => setDestination(href.slice(1))}>
          <TabBar aria-label="Tab bar example" position="inline" items={[
            { id: 'home', href: '#Home', label: 'Home', icon: <HomeIcon />, 'aria-current': destination === 'Home' ? 'page' : undefined },
            { id: 'account', href: '#Account', label: 'Account', icon: <AccountIcon />, 'aria-current': destination === 'Account' ? 'page' : undefined },
            { id: 'settings', href: '#Settings', label: 'Settings', icon: <SettingsIcon />, 'aria-current': destination === 'Settings' ? 'page' : undefined },
            { id: 'disabled', href: '#tab-bar-example', label: 'Disabled', icon: <CloseIcon />, isDisabled: true },
          ]} />
          </RouterProvider>
        </div>
      </section>
      <section className="component-section" aria-labelledby="tab-bar-anatomy">
        <h2 className="mz-text-heading-md" id="tab-bar-anatomy">Anatomy</h2>
        <p>Tab bar composes these Mezzanine components. See the official <Link href="https://react-aria.adobe.com/Link">React Aria Link</Link> and <Link href="https://react-aria.adobe.com/Modal">Modal</Link> documentation.</p>
        <div className="documentation-table">
          <Table aria-label="Tab bar anatomy">
            <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
            <TableBody>
              <Row id="tab-bar"><Cell><code>TabBar</code></Cell><Cell>Provides the labelled navigation region and moves destinations that do not fit into More.</Cell></Row>
              <Row id="link"><Cell><code>Link</code></Cell><Cell>Renders each destination, including its visible label, optional icon and current-page state.</Cell></Row>
              <Row id="button"><Cell><code>Button</code></Cell><Cell>Provides the More trigger and the sheet’s Close control.</Cell></Row>
              <Row id="trigger"><Cell><code>DialogTrigger</code></Cell><Cell>Connects More to the modal sheet and manages its open state.</Cell></Row>
              <Row id="overlay"><Cell><code>ModalOverlay</code></Cell><Cell>Provides the backdrop and modal interaction boundary.</Cell></Row>
              <Row id="modal"><Cell><code>Modal</code></Cell><Cell>Contains the bottom sheet.</Cell></Row>
              <Row id="dialog"><Cell><code>Dialog</code></Cell><Cell>Provides the accessible dialog containing the remaining destinations.</Cell></Row>
              <Row id="heading"><Cell><code>Heading</code></Cell><Cell>Labels the dialog through its title slot.</Cell></Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="component-section" aria-labelledby="tab-bar-behaviour">
        <h2 className="mz-text-heading-md" id="tab-bar-behaviour">Behaviour</h2>
        <p>Items retain the order supplied by the app. Tab bar measures its available width and minimum item width. When all items fit, More is omitted. Otherwise it reserves a place for More and moves the remaining links into the sheet. Very narrow layouts may show only More.</p>
        <p>Tab moves between enabled links and More. Enter follows a link or opens the sheet. Escape, Close, or pressing the backdrop dismisses the sheet. React Aria manages modal focus. Choosing a sheet link closes it; disabled links cannot be activated.</p>
        <p>The current destination uses <code>aria-current="page"</code>, an underline indicator and emphasis. If that destination is in the sheet, More has the indicator and includes its label in its accessible name. The sheet’s contents stay stable while it is open.</p>
      </section>
      <section className="component-section" aria-labelledby="tab-bar-usage">
        <h2 className="mz-text-heading-md" id="tab-bar-usage">Usage</h2>
        <p>Supply an <code>aria-label</code> and an <code>items</code> array. Each item needs a unique <code>id</code>, <code>href</code> and visible <code>label</code>. Optional <code>icon</code> content is decorative. Other link props, including <code>isDisabled</code>, <code>target</code> and event handlers, pass through to Link. The consuming app determines the current page and handles routing.</p>
        <p>The default <code>position="bottom"</code> uses sticky positioning with phone safe-area spacing. Place TabBar after the content in the app’s layout; it remains in normal flow. It does not create a full-screen app shell. Use <code>position="inline"</code> for normal document placement.</p>
        <p><code>moreLabel</code> and <code>closeLabel</code> replace the default More and Close text. The component uses Mezzanine tokens and respects reduced motion. It is page navigation, not a tab-panel control or an action toolbar.</p>
      </section>
    </>
  )
}
