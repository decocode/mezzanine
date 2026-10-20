import { ExampleZone } from '../../../../components/ExampleZone'
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  ExternalLinkIcon,
  Link
} from '@decocode/mezzanine'
import { disclosureContent, disclosureGroupReactAriaLink } from './disclosureContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DisclosurePage() {
  return (
    <ContentPage
      content={disclosureContent}
      parts={{
        example: (
          <ExampleZone>
            <Disclosure defaultExpanded>
              <DisclosureHeader>Disclosure A</DisclosureHeader>
              <DisclosurePanel>
                DisclosurePanel A content.
              </DisclosurePanel>
            </Disclosure>
          </ExampleZone>
        ),
        disclosureGroup: (<>
          <Link
            aria-label={`${disclosureGroupReactAriaLink.label} (opens in a new tab)`}
            className="react-aria-Link react-aria-documentation-link"
            href={disclosureGroupReactAriaLink.href}
            rel="noreferrer"
            target="_blank"
          >
            <span>{disclosureGroupReactAriaLink.label}</span>
            <ExternalLinkIcon />
          </Link>
          <ExampleZone>
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
          </ExampleZone>
        </>),
      }}
    />
  )
}
