import { TableOfContents, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import {
  motionPatternDefinitions,
  motionTimingDefinitions,
  motionTokenDefinitions,
} from '../foundationData'
import { PageHeading } from '../PageHeading'
import { TokenValue } from '../TokenValue'

export default function MotionPage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <PageHeading
        description="Motion helps people understand when interface content opens, closes, or remains busy. This page records the motion that Mezzanine currently uses."
        title="Motion"
      />
      <TableOfContents sections={[
        { id: 'motion-timing-heading', label: 'Timing and easing' },
        { id: 'motion-tokens-heading', label: 'CSS tokens' },
        { id: 'motion-patterns-heading', label: 'Current motion patterns' },
        { id: 'reduced-motion-heading', label: 'Reduced motion' },
      ]} />
      <section aria-labelledby="motion-timing-heading" className="component-section">
        <h2 id="motion-timing-heading" className="mz-text-heading-md">
          Timing and easing
        </h2>
        <p className="component-section-description">
          Short transitions communicate changes of state. Continuous loading cycles indicate
          that an action remains in progress.
        </p>
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
                  <Cell><code>{timing.duration}</code></Cell>
                  <Cell><code>{timing.easing}</code></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="motion-tokens-heading" className="component-section">
        <h2 id="motion-tokens-heading" className="mz-text-heading-md">
          CSS tokens
        </h2>
        <p className="component-section-description">
          These are the motion tokens that exist in Mezzanine today.
        </p>
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
                  <Cell><TokenValue token={motionToken.token} refreshKey={refreshKey} /></Cell>
                  <Cell>{motionToken.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="motion-patterns-heading" className="component-section">
        <h2 id="motion-patterns-heading" className="mz-text-heading-md">
          Current motion patterns
        </h2>
        <p className="component-section-description">
          The scope identifies whether each pattern belongs to the library or the showcase.
          Reduced-motion behaviour preserves the state change without the animation.
        </p>
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
      </section>
      <section aria-labelledby="reduced-motion-heading" className="component-section">
        <h2 id="reduced-motion-heading" className="mz-text-heading-md">
          Reduced motion
        </h2>
        <p className="component-section-description">
          Mezzanine follows the device&apos;s <code>prefers-reduced-motion</code> setting. When a
          person asks for less motion, animations and smooth scrolling are removed while the
          interface continues to change state and communicate progress.
        </p>
      </section>
    </>
  )
}
