import { Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function BadgePage() {
  return (
    <ComponentPageTemplate
      description={<>A <code>Badge</code> is a short, non-interactive label that describes the status or state of something.</>}
      title="Badge"
      sections={[
        {
          id: 'badge-examples-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              <code>Badge</code> defaults to the neutral variant and renders a non-interactive text label.
            </p>
            <div className="component-example">
              <Badge>Badge label</Badge>
            </div>
          </>),
        },
        {
          id: 'badge-variants-heading',
          title: 'Variants',
          content: (<>
            <p className="component-section-description">
              The <code>variant</code> prop selects a core or semantic colour treatment.
            </p>
            <div className="documentation-table documentation-comparison-table">
              <Table aria-label="Badge variants">
                <TableHeader>
                  <Column id="variant" isRowHeader>Variant</Column>
                  <Column id="example">Example</Column>
                </TableHeader>
                <TableBody>
                  <Row id="neutral"><Cell><code>neutral</code></Cell><Cell><Badge variant="neutral">Neutral</Badge></Cell></Row>
                  <Row id="violet"><Cell><code>violet</code></Cell><Cell><Badge variant="violet">Violet</Badge></Cell></Row>
                  <Row id="info"><Cell><code>info</code></Cell><Cell><Badge variant="info">Info</Badge></Cell></Row>
                  <Row id="success"><Cell><code>success</code></Cell><Cell><Badge variant="success">Success</Badge></Cell></Row>
                  <Row id="warning"><Cell><code>warning</code></Cell><Cell><Badge variant="warning">Warning</Badge></Cell></Row>
                  <Row id="danger"><Cell><code>danger</code></Cell><Cell><Badge variant="danger">Danger</Badge></Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        }
      ]}
    />
  )
}
