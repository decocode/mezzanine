import {
  Table, TableHeader, Column, TableBody, Row, Cell,
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  Link,
  ExternalLinkIcon,
} from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function DisclosurePage() {
  return (
    <ComponentPageTemplate
      description={<>A <code>Disclosure</code> shows and hides a section of related content.</>}
      reactAriaPage="Disclosure"
      title="Disclosure"
      sections={[
        {
          id: 'disclosure-basic-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              Activate <code>DisclosureHeader</code> to show or hide the <code>DisclosurePanel</code>. This example starts expanded.
            </p>
            <div className="component-example">
              <Disclosure defaultExpanded>
                <DisclosureHeader>Disclosure A</DisclosureHeader>
                <DisclosurePanel>
                  DisclosurePanel A content.
                </DisclosurePanel>
              </Disclosure>
            </div>
          </>),
        },
        {
          id: 'disclosure-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="Disclosure anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>Disclosure</code></Cell><Cell>Owns one expanded or collapsed panel.</Cell></Row>
                  <Row id="part-1"><Cell><code>DisclosureHeader</code></Cell><Cell>Composes Heading and the trigger Button; defaults to heading level 3.</Cell></Row>
                  <Row id="part-2"><Cell><code>DisclosurePanel</code></Cell><Cell>Contains the content that is shown or hidden.</Cell></Row>
                  <Row id="part-3"><Cell><code>DisclosureGroup</code></Cell><Cell>Optionally coordinates expansion across multiple disclosures.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'disclosure-group-heading',
          title: 'DisclosureGroup',
          content: (<>
            <p className="component-section-description">
              A <code>DisclosureGroup</code> (also known as a concertina) brings related disclosures together.
              Opening an item will close a previously open item by default, but you can opt to have
              multiple disclosures open simultaneously instead.
            </p>
            <Link
              aria-label="View DisclosureGroup on React Aria (opens in a new tab)"
              className="react-aria-Link react-aria-documentation-link"
              href="https://react-aria.adobe.com/DisclosureGroup"
              rel="noreferrer"
              target="_blank"
            >
              <span>View DisclosureGroup on React Aria</span>
              <ExternalLinkIcon />
            </Link>
            <div className="component-example">
              <DisclosureGroup defaultExpandedKeys={['disclosure-a']}>
                <Disclosure id="disclosure-a">
                  <DisclosureHeader>Disclosure A</DisclosureHeader>
                  <DisclosurePanel>DisclosurePanel A content.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="disclosure-b">
                  <DisclosureHeader>Disclosure B</DisclosureHeader>
                  <DisclosurePanel>DisclosurePanel B content.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="disclosure-c">
                  <DisclosureHeader>Disclosure C</DisclosureHeader>
                  <DisclosurePanel>DisclosurePanel C content.</DisclosurePanel>
                </Disclosure>
              </DisclosureGroup>
            </div>
          </>),
        },
        {
          id: 'disclosure-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p>Use <code>defaultExpanded</code> for initial state, or <code>isExpanded</code> with <code>onExpandedChange</code> for controlled state. Give grouped disclosures stable <code>id</code> values; the group uses <code>defaultExpandedKeys</code> or <code>expandedKeys</code> with <code>onExpandedChange</code>. Enable <code>allowsMultipleExpanded</code> when several panels may stay open.</p>
            <p>Tab focuses the trigger; Enter or Space toggles its panel. Tab then reaches available controls inside an expanded panel. The trigger exposes its expanded state. Set <code>isDisabled</code> on a Disclosure to prevent toggling.</p>
            <p>Choose <code>DisclosureHeader level</code> to fit the page’s heading hierarchy. Its children supply the trigger label; do not place another button or link inside that label.</p>
          </>),
        }
      ]}
    />
  )
}
