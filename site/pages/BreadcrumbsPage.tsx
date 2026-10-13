import { Table, TableHeader, Column, TableBody, Row, Cell, Breadcrumb, Breadcrumbs, Link } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

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
        },
        {
          id: 'breadcrumbs-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="Breadcrumbs anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>Breadcrumbs</code></Cell><Cell>Groups the breadcrumb items in their supplied order.</Cell></Row>
                  <Row id="part-1"><Cell><code>Breadcrumb</code></Cell><Cell>Contains one level of the hierarchy.</Cell></Row>
                  <Row id="part-2"><Cell><code>Link</code></Cell><Cell>Makes an earlier level navigable. The current-page example uses plain text.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'breadcrumbs-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p>Wrap the list in a <code>nav</code> with an <code>aria-label</code> describing the breadcrumb trail. Order items from the broadest ancestor to the current page; give each earlier destination a meaningful link label and <code>href</code>.</p>
            <p>Tab moves between enabled links and Enter follows the focused link. The plain-text current item in these examples is not a tab stop. Set <code>isDisabled</code> on Breadcrumbs to disable its links.</p>
          </>),
        }
      ]}
    />
  )
}
