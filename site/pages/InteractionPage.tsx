import type { ReactNode } from 'react'
import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { foundationTechnicalDetailsGroup } from '../templates/foundationTechnicalDetails'
import { DocsTable } from '../components/DocsTable'
import { TokenValue } from '../components/TokenValue'
import {
interactionCssProperties, interactionDescription,
  interactionDisabledParagraphs, interactionFocusParagraphs, interactionFocusRingComponents,
  interactionKeyboardRows, interactionPointerParagraphs, interactionReferences,
  interactionRelatedPages, interactionSharedTokens, interactionStates, interactionTokensIntro,
 
} from '../content/interactionContent'

function Paragraphs({ paragraphs }: { paragraphs: readonly ReactNode[] }) {
  return <>{paragraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}</>
}

export default function InteractionPage() {
  return (
    <ComponentPageTemplate
      title="Interaction"
      description={interactionDescription}
      sections={[
        {
          id: 'interaction-states',
          title: 'States',
          content: (<>
            <p className="component-section-description">
              React Aria sets a data attribute on a component while it is in each state. Mezzanine styles those attributes.
            </p>
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
                      <Cell>{description}</Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>),
        },
        { id: 'interaction-focus', title: 'Focus', content: <Paragraphs paragraphs={interactionFocusParagraphs} /> },
        { id: 'interaction-pointer-and-touch', title: 'Pointer and touch', content: <Paragraphs paragraphs={interactionPointerParagraphs} /> },
        {
          id: 'interaction-keyboard',
          title: 'Keyboard',
          content: <DocsTable aria-label="Keyboard behaviour" nameColumn="Keys" descriptionColumn="Behaviour" namesAreCode={false} rows={interactionKeyboardRows.map(({ keys, behaviour }) => ({ name: keys, description: behaviour }))} />,
        },
        { id: 'interaction-disabled', title: 'Disabled', content: <Paragraphs paragraphs={interactionDisabledParagraphs} /> },
        foundationTechnicalDetailsGroup('interaction', {
          cssProperties: <DocsTable aria-label="Interaction CSS properties" nameColumn="Property" rows={interactionCssProperties} />,
          tokens: (<>
            <p className="component-section-description">{interactionTokensIntro}</p>
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
            <p className="component-section-description">Focus ring width and offset are set per component:</p>
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
        }),
      ]}
      relatedPages={interactionRelatedPages}
      references={interactionReferences}
    />
  )
}
