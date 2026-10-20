import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { RichText } from '../../../../components/RichText'
import { TokenScale } from '../../../../components/TokenScale'
import { TokenValue } from '../../../../components/TokenValue'
import {
  elevationColourTokens, elevationColourTokensIntro, elevationContent, elevationDefinitions,
} from './elevationContent'
import { ContentPage } from '../../../../templates/ContentPage'

// Each level's card shows its shadow, with its level number and what it's for.
const elevationLevels = elevationDefinitions.map(({ token, label, level, useFor }) => ({ token, label, description: `Level ${level}. ${useFor}`, surface: `${token}-surface` }))

export default function ElevationPage() {
  return (
    <ContentPage
      content={elevationContent}
      parts={{
        levels: <TokenScale items={elevationLevels} sample="shadow" showValue={false} />,
        tokens: (<>
          <div className="documentation-table">
            <Table aria-label="Elevation tokens">
              <TableHeader>
                <Column id="token" isRowHeader>Token</Column>
                <Column id="level">Level</Column>
                <Column id="value">Value</Column>
              </TableHeader>
              <TableBody>
                {elevationDefinitions.map(({ token, level }) => (
                  <Row id={token} key={token}>
                    <Cell><code>{token}</code></Cell>
                    <Cell>{level}</Cell>
                    <Cell><TokenValue token={token} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="component-section-description"><RichText text={elevationColourTokensIntro} /></p>
          <div className="documentation-table">
            <Table aria-label="Elevation colour tokens">
              <TableHeader>
                <Column id="token" isRowHeader>Token</Column>
                <Column id="purpose">Purpose</Column>
                <Column id="value">Value</Column>
              </TableHeader>
              <TableBody>
                {elevationColourTokens.map(({ token, purpose }) => (
                  <Row id={token} key={token}>
                    <Cell><code>{token}</code></Cell>
                    <Cell>{purpose}</Cell>
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
