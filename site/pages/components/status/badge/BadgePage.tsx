import { Badge, Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { badgeContent } from './badgeContent'
import { ContentPage } from '../../../../templates/ContentPage'

const variants = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const

export default function BadgePage() {
  return (
    <ContentPage
      content={badgeContent}
      parts={{
        example: <DemoArea><Badge>Badge label</Badge></DemoArea>,
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
