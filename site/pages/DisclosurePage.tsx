import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  Link,
  ExternalLinkIcon,
} from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

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
        }
      ]}
    />
  )
}
