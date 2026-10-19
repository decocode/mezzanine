import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import {
  motionContent,
  motionPatternDefinitions,
  motionStates,
  motionTimingDefinitions,
  motionTokenDefinitions,
} from './motionContent'
import { useTokenValue } from '../../../components/tokenValueLogic'
import { TokenValue } from '../../../components/TokenValue'
import { ContentPage } from '../../../templates/ContentPage'
import { withValues } from '../../../templates/docsPageContent'

// Puts live values into the {name} placeholders in the section introductions.
export default function MotionPage() {
  const motionEnabled = useTokenValue('--_motion-enabled')
  return (
    <ContentPage
      content={withValues(motionContent, { motionState: motionEnabled === '0' ? motionStates.suppressed : motionStates.enabled })}
      parts={{
        timingAndEasing: (
          <div className="documentation-table">
            <Table aria-label="Motion timing and easing">
              <TableHeader>
                <Column id="timing" isRowHeader>Timing</Column>
                <Column id="duration">Duration</Column>
                <Column id="easing">Easing</Column>
              </TableHeader>
              <TableBody>
                {motionTimingDefinitions.map((timing) => (
                  <Row id={timing.id} key={timing.id}>
                    <Cell>
                      <strong>{timing.label}</strong>
                      <span className="table-supporting-text">{timing.description}</span>
                    </Cell>
                    <Cell><TokenValue token={timing.duration} /></Cell>
                    <Cell><TokenValue token={timing.easing} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        tokens: (
          <div className="documentation-table">
            <Table aria-label="Motion CSS tokens">
              <TableHeader>
                <Column id="token" isRowHeader>CSS token</Column>
                <Column id="value">Value</Column>
                <Column id="purpose">Purpose</Column>
              </TableHeader>
              <TableBody>
                {motionTokenDefinitions.map((motionToken) => (
                  <Row id={motionToken.token} key={motionToken.token}>
                    <Cell><code>{motionToken.token}</code></Cell>
                    <Cell><TokenValue token={motionToken.token} /></Cell>
                    <Cell>{motionToken.description}</Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        currentMotionPatterns: (
          <div className="documentation-table">
            <Table aria-label="Current motion patterns">
              <TableHeader>
                <Column id="pattern" isRowHeader>Pattern</Column>
                <Column id="movement">Movement</Column>
                <Column id="reduced-motion">Reduced motion</Column>
              </TableHeader>
              <TableBody>
                {motionPatternDefinitions.map((pattern) => (
                  <Row id={pattern.id} key={pattern.id}>
                    <Cell>
                      <strong>{pattern.name}</strong>
                      <span className="table-supporting-text">{pattern.scope}</span>
                    </Cell>
                    <Cell>{pattern.movement}</Cell>
                    <Cell>{pattern.reducedMotion}</Cell>
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
