import { Badge, Cell, Column, DemoArea, Row, Table, TableBody, TableHeader, type BadgeVariant } from '@decocode/mezzanine'
import { badgeContent } from './badgeContent'
import { ContentPage } from '../../../../templates/ContentPage'

// One label for every BadgeVariant value, so TypeScript reports one that's missing or no longer exists.
const variantLabels: Record<BadgeVariant, string> = {
  neutral: 'Neutral', accent: 'Accent', info: 'Info', success: 'Success', warning: 'Warning', danger: 'Danger',
}
const variants = Object.keys(variantLabels) as BadgeVariant[]

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
                    <Cell><Badge variant={variant}>{variantLabels[variant]}</Badge></Cell>
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
