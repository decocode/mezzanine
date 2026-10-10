import { Cell, Column, Row, Table, TableBody, TableHeader, Tab, TabList, TabPanel, Tabs } from '@decocode/mezzanine'
import { TableOfContents } from './TableOfContents'

export function TabsExamples() {
  return (
    <>
      <TableOfContents sections={[
        { id: 'tabs-example-heading', label: 'Example' },
        { id: 'tabs-vertical-heading', label: 'Vertical tabs' },
        { id: 'tabs-anatomy-heading', label: 'Anatomy' },
        { id: 'tabs-props-heading', label: 'Props' },
        { id: 'tabs-usage-heading', label: 'Usage and accessibility' },
      ]} />
      <section aria-labelledby="tabs-example-heading" className="component-section">
        <h2 id="tabs-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          Select a <code>Tab</code> to show its matching <code>TabPanel</code>. Arrow keys
          move between available tabs and select them automatically. The fourth tab is disabled.
        </p>
        <div className="component-example">
          <Tabs defaultSelectedKey="a">
            <TabList aria-label="Example sections">
              <Tab id="a">Tab A</Tab>
              <Tab id="b">Tab B</Tab>
              <Tab id="c">Tab C</Tab>
              <Tab id="d" isDisabled>Disabled tab</Tab>
            </TabList>
            <TabPanel id="a">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TabPanel>
            <TabPanel id="b">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</TabPanel>
            <TabPanel id="c">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</TabPanel>
            <TabPanel id="d">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</TabPanel>
          </Tabs>
        </div>
      </section>
      <section aria-labelledby="tabs-vertical-heading" className="component-section">
        <h2 id="tabs-vertical-heading" className="mz-text-heading-medium">Vertical tabs</h2>
        <p className="component-section-description">
          Set <code>orientation="vertical"</code> to stack the tabs. This example also uses
          {' '}<code>keyboardActivation="manual"</code>: Up and Down move focus; Enter or Space selects.
        </p>
        <div className="component-example">
          <Tabs orientation="vertical" keyboardActivation="manual" defaultSelectedKey="a">
            <TabList aria-label="Vertical example sections">
              <Tab id="a">Tab A</Tab>
              <Tab id="b">Tab B</Tab>
              <Tab id="c">Tab C</Tab>
              <Tab id="d" isDisabled>Disabled tab</Tab>
            </TabList>
            <TabPanel id="a">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TabPanel>
            <TabPanel id="b">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</TabPanel>
            <TabPanel id="c">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</TabPanel>
            <TabPanel id="d">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</TabPanel>
          </Tabs>
        </div>
      </section>
      <section aria-labelledby="tabs-anatomy-heading" className="component-section">
        <h2 id="tabs-anatomy-heading" className="mz-text-heading-medium">Anatomy</h2>
        <div className="documentation-table">
          <Table aria-label="Tabs anatomy">
            <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
            <TableBody>
              <Row id="tabs"><Cell><code>Tabs</code></Cell><Cell>Manages selection, orientation and keyboard activation.</Cell></Row>
              <Row id="list"><Cell><code>TabList</code></Cell><Cell>Groups the tabs and gives the collection an accessible name.</Cell></Row>
              <Row id="tab"><Cell><code>Tab</code></Cell><Cell>Selects a panel. Includes React Aria’s <code>SelectionIndicator</code> for the selected underline.</Cell></Row>
              <Row id="panel"><Cell><code>TabPanel</code></Cell><Cell>Contains the content for the <code>Tab</code> with the matching <code>id</code>.</Cell></Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="tabs-props-heading" className="component-section">
        <h2 id="tabs-props-heading" className="mz-text-heading-medium">Props</h2>
        <p className="component-section-description">These are common React Aria props; the components retain their underlying APIs.</p>
        <div className="documentation-table documentation-props-table">
          <Table aria-label="Tabs props">
            <TableHeader><Column isRowHeader>Prop</Column><Column>Purpose</Column></TableHeader>
            <TableBody>
              <Row id="default"><Cell><code>defaultSelectedKey</code></Cell><Cell>Initial selection on <code>Tabs</code>, matching a tab’s <code>id</code>.</Cell></Row>
              <Row id="controlled"><Cell><code>selectedKey</code><br /><code>onSelectionChange</code></Cell><Cell>Control the selected tab from application state.</Cell></Row>
              <Row id="orientation"><Cell><code>orientation</code></Cell><Cell>On <code>Tabs</code>: <code>horizontal</code> by default, or <code>vertical</code>.</Cell></Row>
              <Row id="activation"><Cell><code>keyboardActivation</code></Cell><Cell>On <code>Tabs</code>: <code>automatic</code> selects on focus; <code>manual</code> waits for activation.</Cell></Row>
              <Row id="disabled"><Cell><code>isDisabled</code></Cell><Cell>Disable an individual <code>Tab</code> or the whole collection on <code>Tabs</code>. Use <code>disabledKeys</code> for a set of tab IDs.</Cell></Row>
              <Row id="id"><Cell><code>id</code></Cell><Cell>Use the same unique key on each <code>Tab</code> and its <code>TabPanel</code>.</Cell></Row>
              <Row id="label"><Cell><code>aria-label</code><br /><code>aria-labelledby</code></Cell><Cell>Give <code>TabList</code> a name that describes the collection.</Cell></Row>
              <Row id="mount"><Cell><code>shouldForceMount</code></Cell><Cell>Keep a <code>TabPanel</code> mounted to preserve local state. Inactive panels remain hidden and inert.</Cell></Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="tabs-usage-heading" className="component-section">
        <h2 id="tabs-usage-heading" className="mz-text-heading-medium">Usage and accessibility</h2>
        <ul>
          <li>Use tabs for related sections shown one at a time, not for independent on/off choices.</li>
          <li>React Aria supplies tab/panel relationships, roving focus and keyboard selection. Do not add custom arrow-key handlers.</li>
          <li>Tab moves into the selected tab, then into its panel. Arrow keys follow the orientation; Home and End move to the first and last available tabs.</li>
          <li>Horizontal tab lists scroll when space is limited. Vertical panels move below the list when there is not enough room beside it. Keep labels short and meaningful.</li>
          <li>Keyboard focus has an outline, selection has an underline, and indicator motion respects reduced-motion preferences.</li>
        </ul>
      </section>
    </>
  )
}
