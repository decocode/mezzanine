import { ExampleZone } from '../components/ExampleZone'
import { Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { badgeContent } from '../content/badgeContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function BadgePage() {
  return (
    <ComponentPageTemplate
      description={badgeContent.description}
      title={badgeContent.title}
      relatedPages={badgeContent.relatedPages}
      references={badgeContent.references}
      sections={[
        {
          id: 'badge-examples-heading',
          title: 'Example',
          content: (<>
            {badgeContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Badge>Badge label</Badge>
            </ExampleZone>
          </>),
        },
        {
          id: 'badge-variants-heading',
          title: 'Variants',
          content: (<>
            {badgeContent.variantsParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
        },
        {
          id: 'badge-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'badge-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="Badge anatomy" nameColumn="Component" rows={badgeContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'badge-usage-heading',
              title: 'Usage',
              content: (<>
                {badgeContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'badge-accessibility-heading',
              title: 'Accessibility',
              content: (<>
                {badgeContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
