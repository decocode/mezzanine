import { ComponentExample } from '../components/ComponentExample'
import { Breadcrumb, Breadcrumbs, Link } from '@decocode/mezzanine'
import { breadcrumbsContent } from '../content/breadcrumbsContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function BreadcrumbsPage() {
  return (
    <ComponentPageTemplate
      description={breadcrumbsContent.description}
      reactAriaPage="Breadcrumbs"
      title={breadcrumbsContent.title}
      relatedPages={breadcrumbsContent.relatedPages}
      references={breadcrumbsContent.references}
      sections={[
        {
          id: 'breadcrumbs-example-heading',
          title: 'Example',
          content: (<>
            <ComponentExample className="breadcrumbs-examples">
              <div>
                <h3 className="mz-text-heading-sm">Hierarchy</h3>
                <p className="component-section-description">
                  Earlier levels are links. The final item identifies the current page and is not a
                  link.
                </p>
                <nav aria-label="Hierarchy example breadcrumbs">
                  <Breadcrumbs>
                    <Breadcrumb>
                      <Link href="/">Homepage</Link>
                    </Breadcrumb>
                    <Breadcrumb>
                      <Link href="/introduction">Parent page</Link>
                    </Breadcrumb>
                    <Breadcrumb>
                      <span>Current page</span>
                    </Breadcrumb>
                  </Breadcrumbs>
                </nav>
              </div>
              <div>
                <h3 className="mz-text-heading-sm">Disabled</h3>
                <p className="component-section-description">
                  A disabled <code>Breadcrumbs</code> list shows the hierarchy but none of its links can be used.
                </p>
                <nav aria-label="Disabled example breadcrumbs">
                  <Breadcrumbs isDisabled>
                    <Breadcrumb>
                      <Link href="/">Homepage</Link>
                    </Breadcrumb>
                    <Breadcrumb>
                      <Link href="/introduction">Parent page</Link>
                    </Breadcrumb>
                    <Breadcrumb>
                      <span>Current page</span>
                    </Breadcrumb>
                  </Breadcrumbs>
                </nav>
              </div>
            </ComponentExample>
          </>),
        },
        {
          id: 'breadcrumbs-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'breadcrumbs-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <ComponentReferenceTable aria-label="Breadcrumbs anatomy" nameColumn="Component" rows={breadcrumbsContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'breadcrumbs-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {breadcrumbsContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
