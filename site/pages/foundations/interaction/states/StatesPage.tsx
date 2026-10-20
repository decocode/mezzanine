import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { RichText } from '../../../../components/RichText'
import { interactionStates, statesContent } from './statesContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function StatesPage() {
  return (
    <ContentPage
      content={statesContent}
      parts={{
        states: (
          <div className="documentation-table">
            <Table aria-label="Interaction states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="meaning">Meaning</Column>
              </TableHeader>
              <TableBody>
                {interactionStates.map(({ name, attribute, description }) => (
                  <Row id={attribute} key={attribute}>
                    <Cell><span className="table-item-heading"><strong>{name}</strong><code>{attribute}</code></span></Cell>
                    <Cell><RichText text={description} /></Cell>
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
