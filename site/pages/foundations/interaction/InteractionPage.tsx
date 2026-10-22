import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { TokenValue } from '../../../components/TokenValue'
import {
  interactionContent, interactionSharedTokens,
} from './interactionContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function InteractionPage() {
  return (
    <ContentPage
      content={interactionContent}
      parts={{
        tokens: (<>
          <div className="documentation-table">
            <Table aria-label="Shared interaction tokens">
              <TableHeader>
                <Column id="token" isRowHeader>Token</Column>
                <Column id="purpose">Purpose</Column>
                <Column id="value">Value</Column>
              </TableHeader>
              <TableBody>
                {interactionSharedTokens.map(({ token, description }) => (
                  <Row id={token} key={token}>
                    <Cell><code>{token}</code></Cell>
                    <Cell>{description}</Cell>
                    <Cell><TokenValue token={token} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        </>),
      }}
    />
  )
}
