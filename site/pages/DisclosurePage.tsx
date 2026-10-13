import { ComponentExample } from '../components/ComponentExample'
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  ExternalLinkIcon,
  Link
} from '@decocode/mezzanine'
import { disclosureContent } from '../content/disclosureContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function DisclosurePage() {
  return (
    <ComponentPageTemplate
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
            <ComponentExample>
              <Disclosure defaultExpanded>
                <DisclosureHeader>Disclosure A</DisclosureHeader>
                <DisclosurePanel>
                  DisclosurePanel A content.
                </DisclosurePanel>
              </Disclosure>
            </ComponentExample>
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
            <ComponentExample>
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
            </ComponentExample>
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
                <ComponentReferenceTable aria-label="Disclosure anatomy" nameColumn="Component" rows={disclosureContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'disclosure-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {disclosureContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
