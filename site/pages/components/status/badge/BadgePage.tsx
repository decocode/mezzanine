import { useState } from 'react'
import { Badge, Cell, Column, DemoArea, Row, Table, TableBody, TableHeader, type BadgePurpose } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { badgeContent, badgeExampleCode, badgeExampleLabel } from './badgeContent'
import { ContentPage } from '../../../../templates/ContentPage'

// One label for every BadgePurpose value, so TypeScript reports one that's missing or no longer exists.
const purposeLabels: Record<BadgePurpose, string> = {
  neutral: 'Neutral', accent: 'Accent', info: 'Info', success: 'Success', warning: 'Warning', danger: 'Danger',
}
const purposes = Object.keys(purposeLabels) as BadgePurpose[]

export default function BadgePage() {
  const [purpose, setPurpose] = useState<BadgePurpose>('neutral')
  return (
    <ContentPage
      content={badgeContent}
      parts={{
        example: (
          <DemoArea codeView={badgeExampleCode(purpose)} endPanel={<PanelSelect label="purpose" options={purposes} value={purpose} onChange={setPurpose} />}>
            <Badge purpose={purpose}>{badgeExampleLabel}</Badge>
          </DemoArea>
        ),
        purposes: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Badge purposes">
              <TableHeader>
                <Column id="purpose" isRowHeader>Purpose</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                {purposes.map((purpose) => (
                  <Row id={purpose} key={purpose}>
                    <Cell><code>{purpose}</code></Cell>
                    <Cell><Badge purpose={purpose}>{purposeLabels[purpose]}</Badge></Cell>
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
