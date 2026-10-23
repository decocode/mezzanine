import {
  DemoArea, Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel, ExternalLinkIcon, Link,
} from '@decocode/mezzanine'
import { disclosureContent, disclosureGroupReactAriaLink } from './disclosureContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DisclosurePage() {
  return (
    <ContentPage
      content={disclosureContent}
      parts={{
        example: (
          <DemoArea>
            <Disclosure defaultExpanded>
              <DisclosureHeader>Disclosure A</DisclosureHeader>
              <DisclosurePanel>
                DisclosurePanel A content.
              </DisclosurePanel>
            </Disclosure>
          </DemoArea>
        ),
        disclosureGroup: (<>
          <Link
            className="react-aria-Link react-aria-documentation-link"
            href={disclosureGroupReactAriaLink.href}
          >
            <span>{disclosureGroupReactAriaLink.label}</span>
            <ExternalLinkIcon />
          </Link>
          <DemoArea>
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
          </DemoArea>
        </>),
      }}
    />
  )
}
