import { TableOfContents, Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'

export default function BadgePage() {
  return (
    <>
      <DocumentationHeading
        description={<>A <code>Badge</code> is a short, non-interactive label that describes the status or state of something.</>}
        title="Badge"
      />
      <TableOfContents sections={[
        { id: 'badge-examples-heading', label: 'Example' },
        { id: 'badge-variants-heading', label: 'Variants' },
      ]} />
      <section aria-labelledby="badge-examples-heading" className="component-section">
        <h2 id="badge-examples-heading" className="mz-text-heading-md">
          Example
        </h2>
        <p className="component-section-description">
          <code>Badge</code> defaults to the neutral variant and renders a non-interactive text label.
        </p>
        <div className="component-example">
          <Badge>Badge label</Badge>
        </div>
      </section>
      <section aria-labelledby="badge-variants-heading" className="component-section">
        <h2 id="badge-variants-heading" className="mz-text-heading-md">Variants</h2>
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
      </section>
    </>
  )
}
