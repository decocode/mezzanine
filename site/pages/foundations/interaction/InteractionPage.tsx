import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { RichText } from '../../../components/RichText'
import { TokenValue } from '../../../components/TokenValue'
import {
  interactionContent, interactionFocusRingComponents, interactionFocusRingIntro, interactionSharedTokens,
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
          <p className="component-section-description"><RichText text={interactionFocusRingIntro} /></p>
          <div className="documentation-table">
            <Table aria-label="Focus ring tokens">
              <TableHeader>
                <Column id="component" isRowHeader>Component</Column>
                <Column id="width">Ring width</Column>
                <Column id="offset">Ring offset</Column>
              </TableHeader>
              <TableBody>
                {interactionFocusRingComponents.map(({ component, prefix }) => (
                  <Row id={prefix} key={prefix}>
                    <Cell>{component}</Cell>
                    <Cell><span className="table-item-heading"><code>{`${prefix}-focus-ring-width`}</code><TokenValue token={`${prefix}-focus-ring-width`} /></span></Cell>
                    <Cell><span className="table-item-heading"><code>{`${prefix}-focus-ring-offset`}</code><TokenValue token={`${prefix}-focus-ring-offset`} /></span></Cell>
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
