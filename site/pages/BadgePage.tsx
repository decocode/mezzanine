import { Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { badgeContent } from '../content/badgeContent'
import { ContentPage } from '../templates/ContentPage'

const variants = ['neutral', 'violet', 'info', 'success', 'warning', 'danger'] as const

export default function BadgePage() {
  return (
    <ContentPage
      content={badgeContent}
      parts={{
        example: <ExampleZone><Badge>Badge label</Badge></ExampleZone>,
        variants: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Badge variants">
              <TableHeader>
                <Column id="variant" isRowHeader>Variant</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                {variants.map((variant) => (
                  <Row id={variant} key={variant}>
                    <Cell><code>{variant}</code></Cell>
                    <Cell><Badge variant={variant}>{variant[0].toUpperCase() + variant.slice(1)}</Badge></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
