import { Breadcrumb, Breadcrumbs, Link } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function BreadcrumbsPage() {
  return (
    <ComponentPageTemplate
      description={<><code>Breadcrumbs</code> show where the current page sits within a hierarchy and help people move back to a previous level.</>}
      reactAriaPage="Breadcrumbs"
      title="Breadcrumbs"
      sections={[
        {
          id: 'breadcrumbs-example-heading',
          title: 'Example',
          content: (<>
            <div className="component-example breadcrumbs-examples">
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
            </div>
          </>),
        }
      ]}
    />
  )
}
