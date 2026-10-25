import type { CSSProperties } from 'react'
import { Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { RichText } from '../../../../components/RichText'
import { TokenValue } from '../../../../components/TokenValue'
import {
  elevationColourTokens, elevationColourTokensIntro, elevationContent, elevationDefinitions,
} from './elevationContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './elevation.css'

export default function ElevationPage() {
  return (
    <ContentPage
      content={elevationContent}
      parts={{
        levels: (
          <DemoArea align="stretch">
            <ol className="elevation-levels">
              {elevationDefinitions.map(({ token, label }) => (
                <li key={token} className="elevation-level" style={{ '--_elevation-shadow': `var(${token})`, '--_elevation-surface': `var(${token}-surface)` } as CSSProperties}>
                  <strong className="mz-text-title-sm">{label}</strong>
                  <code>{token}</code>
                </li>
              ))}
            </ol>
          </DemoArea>
        ),
        tokens: (<>
          <div className="documentation-table">
            <Table aria-label="Elevation tokens">
              <TableHeader>
                <Column id="token" isRowHeader>Token</Column>
                <Column id="level">Level</Column>
                <Column id="use-for">Use for</Column>
                <Column id="value">Value</Column>
              </TableHeader>
              <TableBody>
                {elevationDefinitions.map(({ token, level, useFor }) => (
                  <Row id={token} key={token}>
                    <Cell><code>{token}</code></Cell>
                    <Cell>{level}</Cell>
                    <Cell>{useFor}</Cell>
                    <Cell><TokenValue token={token} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="component-section-description"><RichText text={elevationColourTokensIntro} /></p>
          <div className="documentation-table">
            <Table aria-label="Elevation color tokens">
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
