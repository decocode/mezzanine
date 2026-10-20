// The example for the Lab's Spacing page, in Add space.
import { useState, type CSSProperties } from 'react'
import { Button, Cell, Checkbox, Column, Form, Input, Label, Row, Table, TableBody, TableHeader, TextField } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText } from '../../../shared/LabParts'
import { SpacingScale } from './SpacingScale'
import { candidateSpacingLadder, spacingCssNotes } from './spacingPageContent'

export function SpacingExample() {
  return <>
    <ExampleHeading>Spacing tokens</ExampleHeading>
    <ExampleText>These are the real tokens, with their values read live.</ExampleText>
    <SpacingScale />
    <GroupingExample />
    <HeadingsExample />
    <SpacingLadder />
  </>
}

// The same small form with equal gaps or grouped by space.
function GroupingExample() {
  const [grouped, setGrouped] = useState(false)
  return <>
    <ExampleHeading>Grouping with space</ExampleHeading>
    <ExampleText>With equal gaps, every label, field and button looks equally related. Grouped, each label sits close to its field, the fields sit further apart, and the button sits furthest away.</ExampleText>
    <Checkbox isSelected={grouped} onChange={setGrouped}>Group with space</Checkbox>
    {/* A real form; submitting it does nothing, because there is nowhere for it to go. */}
    <Form aria-label="Example form" className={`lab-grouping ${grouped ? 'lab-grouping-grouped' : 'lab-grouping-equal'}`} onSubmit={(event) => event.preventDefault()}>
      <TextField><Label>Label A</Label><Input /></TextField>
      <TextField><Label>Label B</Label><Input /></TextField>
      <Button type="submit">Button A</Button>
    </Form>
    <CssNotes name="the grouping" note={spacingCssNotes.grouping} />
  </>
}

// Two short sections whose headings float between them or join the text they introduce.
function HeadingsExample() {
  const [spaced, setSpaced] = useState(false)
  return <>
    <ExampleHeading>Headings belong to what follows</ExampleHeading>
    <ExampleText>A heading belongs to the text after it. When the space above a heading is larger than the space below, it reads as the start of a new section.</ExampleText>
    <Checkbox isSelected={spaced} onChange={setSpaced}>Space above headings</Checkbox>
    <div className={`lab-headings${spaced ? ' lab-headings-spaced' : ''}`}>
      {['A', 'B', 'C'].map((letter) => <section key={letter} aria-label={`Section ${letter}`}>
        <h4 className="mz-text-title-md">Heading {letter}</h4>
        <p className="mz-text-body-md">Text for section {letter}, which the heading above introduces. It runs to a second line at most widths.</p>
      </section>)}
    </div>
    <CssNotes name="the headings" note={spacingCssNotes.headings} />
  </>
}

// The candidate spacing roles, each with its step and a bar of that length.
function SpacingLadder() {
  return <>
    <ExampleHeading>A candidate spacing ladder</ExampleHeading>
    <ExampleText>A candidate set of spacing roles, from closest to furthest apart. Each one is at least as large as the one before.</ExampleText>
    <div className="lab-table">
      <Table aria-label="Candidate spacing ladder">
        <TableHeader>
          <Column id="job" isRowHeader>Job</Column>
          <Column id="step">Step</Column>
          <Column id="sample">Sample</Column>
        </TableHeader>
        <TableBody>
          {candidateSpacingLadder.map(({ job, step }) => <Row id={job} key={job}>
            <Cell>{job}</Cell>
            <Cell><code>--space-{step}</code></Cell>
            <Cell><span aria-hidden="true" className="lab-ladder-sample" style={{ '--lab-ladder-step': `var(--space-${step})` } as CSSProperties} /></Cell>
          </Row>)}
        </TableBody>
      </Table>
    </div>
  </>
}
