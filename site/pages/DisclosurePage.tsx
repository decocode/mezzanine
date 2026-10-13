import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  Link,
  ExternalLinkIcon,
} from '@decocode/mezzanine'
import { TableOfContents } from '../TableOfContents'
import { PageHeading } from '../PageHeading'

export default function DisclosurePage() {
  return (
    <>
      <PageHeading
        description={<>A <code>Disclosure</code> shows and hides a section of related content.</>}
        reactAriaPage="Disclosure"
        title="Disclosure"
      />
      <TableOfContents sections={[
        { id: 'disclosure-basic-heading', label: 'Example' },
        { id: 'disclosure-group-heading', label: 'DisclosureGroup' },
      ]} />
      <section aria-labelledby="disclosure-basic-heading" className="component-section">
        <h2 id="disclosure-basic-heading" className="mz-text-heading-md">
          Example
        </h2>
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
      </section>
      <section aria-labelledby="disclosure-group-heading" className="component-section">
        <h2 id="disclosure-group-heading" className="mz-text-heading-md">
          DisclosureGroup
        </h2>
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
      </section>
    </>
  )
}
