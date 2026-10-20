// The example for the Supports page, in Foundations › Interaction.
import { Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { supportsCondition, supportsCss } from '../../../../components/browserLogic'
import { supportsCssNotes, supportsExampleText } from './supportsContent'

const supportChecks = [
  { label: 'Subgrid', check: () => supportsCss('grid-template-rows', 'subgrid') },
  { label: ':has()', check: () => supportsCondition('selector(:has(a))') },
  { label: 'Masonry with grid-lanes', check: () => supportsCss('display', 'grid-lanes') },
  { label: 'Anchor positioning', check: () => supportsCss('anchor-name', 'none') },
  { label: 'Field sizing', check: () => supportsCss('field-sizing', 'content') },
]

export function SupportsExample() {
  return <>
    <ExampleText>{supportsExampleText}</ExampleText>
    <div className="documentation-table">
      <Table aria-label="Features this browser supports">
        <TableHeader>
          <Column isRowHeader>Feature</Column>
          <Column>Supported here?</Column>
        </TableHeader>
        <TableBody>{supportChecks.map(({ label, check }) => <Row id={label} key={label}>
          <Cell>{label}</Cell>
          <Cell>{check() ? <Badge variant="success">Yes</Badge> : <Badge>No</Badge>}</Cell>
        </Row>)}</TableBody>
      </Table>
    </div>
    <CssNotes name="the masonry rule" note={supportsCssNotes.supports} level={3} />
  </>
}
