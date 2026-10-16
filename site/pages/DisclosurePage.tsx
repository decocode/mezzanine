import { ExampleZone } from '../components/ExampleZone'
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  ExternalLinkIcon,
  Link
} from '@decocode/mezzanine'
import { disclosureContent } from '../content/disclosureContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function DisclosurePage() {
  return (
    <DocsPageTemplate
      description={disclosureContent.description}
      title={disclosureContent.title}
      relatedPages={disclosureContent.relatedPages}
      references={disclosureContent.references}
      sections={[
        {
          id: 'disclosure-basic-heading',
          title: 'Example',
          content: (<>
            {disclosureContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Disclosure defaultExpanded>
                <DisclosureHeader>Disclosure A</DisclosureHeader>
                <DisclosurePanel>
                  DisclosurePanel A content.
                </DisclosurePanel>
              </Disclosure>
            </ExampleZone>
          </>),
        },
        {
          id: 'disclosure-group-heading',
          title: 'DisclosureGroup',
          content: (<>
            {disclosureContent.disclosureGroupParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
        },
        {
          id: 'disclosure-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'disclosure-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="Disclosure anatomy" nameColumn="Component" rows={disclosureContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'disclosure-usage-heading',
              title: 'Usage',
              content: (<>
                {disclosureContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'disclosure-accessibility-heading',
              title: 'Accessibility',
              content: (<>
                {disclosureContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'disclosure-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {disclosureContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Disclosure CSS tokens" nameColumn="CSS token" rows={disclosureContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
