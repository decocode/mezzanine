// The example for the Media queries page, in Foundations › Interaction.
import { Badge, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { useMediaQuery } from '../../../../components/browserLogic'
import { mediaQueriesCssNotes, environmentQueries } from './mediaQueriesContent'

function EnvironmentRow({ label, query }: { label: string; query: string }) {
  const matches = useMediaQuery(query)
  return <Row id={query}>
    <Cell>{label}</Cell>
    <Cell><code>{query}</code></Cell>
    <Cell>{matches ? <Badge variant="success">Yes</Badge> : <Badge>No</Badge>}</Cell>
  </Row>
}

export function MediaQueriesExample() {
  return <>
    <ExampleText>The answers come from this browser, and change as soon as a setting does, such as dark mode or increased contrast.</ExampleText>
    <div className="documentation-table">
      <Table aria-label="Environment media queries in this browser">
        <TableHeader>
          <Column isRowHeader>Question</Column>
          <Column>Media query</Column>
          <Column>True here?</Column>
        </TableHeader>
        <TableBody>{environmentQueries.map((item) => <EnvironmentRow key={item.query} {...item} />)}</TableBody>
      </Table>
    </div>
    <CssNotes name="environment queries" note={mediaQueriesCssNotes.environment} level={3} />
    <ExampleText>Only the last row is about width, and it’s about the whole window, which is the page frame’s concern. Reduced motion is missing on purpose: in Mezzanine, only the shared motion policy reads that preference.</ExampleText>
  </>
}
