import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { RichText } from '../../../components/RichText'
import { TokenValue } from '../../../components/TokenValue'
import {
  elevationColourTokens, elevationColourTokensIntro, elevationContent, elevationDefinitions, type ElevationDefinition,
} from './elevationContent'
import { ContentPage } from '../../../templates/ContentPage'

function ElevationLevel({ elevation }: { elevation: ElevationDefinition }) {
  return (
    <li className="elevation-role-card">
      <span aria-hidden="true" className="elevation-role-sample" style={{ boxShadow: `var(${elevation.token})` }} />
      <strong>{elevation.label}</strong>
      <p>Level {elevation.level}</p>
      <p>{elevation.useFor}</p>
    </li>
  )
}

export default function ElevationPage() {
  return (
    <ContentPage
      content={elevationContent}
      parts={{
        levels: (
          <ol className="elevation-role-list">
            {elevationDefinitions.map((elevation) => <ElevationLevel elevation={elevation} key={elevation.token} />)}
          </ol>
        ),
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
