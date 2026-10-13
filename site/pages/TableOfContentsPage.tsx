import { TableOfContents, Link, Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function TableOfContentsPage() {
  const exampleSections = [
    {
      id: 'contents-example-section-a', label: 'Section A',
      children: [
        { id: 'contents-example-section-a-1', label: 'Section A.1' },
        { id: 'contents-example-section-a-2', label: 'Section A.2' },
      ],
    },
    {
      id: 'contents-example-section-b', label: 'Section B',
      children: [
        { id: 'contents-example-section-b-1', label: 'Section B.1' },
        { id: 'contents-example-section-b-2', label: 'Section B.2' },
      ],
    },
  ]

  return (
    <ComponentPageTemplate
      description="Table of Contents provides a stacked list of links to sections within a page."
      title="Table of Contents"
      sections={[
        {
          id: 'table-of-contents-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              Parent links lead to sections; indented child links lead to their subsections.
              All links stay visible. Try a child link in the example to jump to its heading.
            </p>
            <div className="component-example table-of-contents-example">
              <TableOfContents
                heading="Example contents"
                headingLevel={3}
                sections={exampleSections}
              />
              {exampleSections.map(({ id, label, children }) => (
                <section aria-labelledby={id} key={id}>
                  <h3 className="mz-text-heading-sm" id={id}>{label}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  {children.map((child) => (
                    <section aria-labelledby={child.id} key={child.id}>
                      <h4 className="mz-text-title-md" id={child.id}>{child.label}</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </section>
                  ))}
                </section>
              ))}
            </div>
            <p className="component-section-description">
              Import <code>TableOfContents</code> from <code>@decocode/mezzanine</code>.
              It composes Mezzanine’s React Aria <code>Heading</code> and <code>Link</code>
              with a navigation landmark and nested lists.
            </p>
          </>),
        },
        {
          id: 'table-of-contents-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="TableOfContents anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>TableOfContents</code></Cell><Cell>Renders a named navigation landmark and nested lists of section links.</Cell></Row>
                  <Row id="part-1"><Cell><code>Heading</code></Cell><Cell>Provides the visible Contents label and accessible navigation name.</Cell></Row>
                  <Row id="part-2"><Cell><code>Link</code></Cell><Cell>Points to the id supplied for each section.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'table-of-contents-props-heading',
          title: 'Props',
          content: (<>
            <div className="documentation-table documentation-props-table">
              <Table aria-label="Table of Contents props">
                <TableHeader>
                  <Column id="prop" isRowHeader>Prop</Column>
                  <Column id="purpose">Purpose</Column>
                </TableHeader>
                <TableBody>
                  <Row id="sections">
                    <Cell><code>sections</code></Cell>
                    <Cell>
                      Required list of sections, each with an <code>id</code> matching a destination
                      heading and a <code>label</code> for its link. Optional <code>children</code>
                      {' '}contain sections with the same structure, rendered as a nested list.
                      List order is preserved. An empty list renders nothing.
                    </Cell>
                  </Row>
                  <Row id="heading">
                    <Cell><code>heading</code></Cell>
                    <Cell>Visible heading and navigation landmark name. Defaults to Contents.</Cell>
                  </Row>
                  <Row id="headingLevel">
                    <Cell><code>headingLevel</code></Cell>
                    <Cell>Heading level: 2 by default, or 3 when nested within a page section.</Cell>
                  </Row>
                  <Row id="className">
                    <Cell><code>className</code></Cell>
                    <Cell>Optional CSS class added alongside the component’s default class.</Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'table-of-contents-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p className="component-section-description">
              Place the component after the page introduction. Match link labels to the section
              headings and give each destination a unique ID. Nest children to match the heading
              hierarchy. The visible heading names the navigation landmark; use a distinct heading
              when more than one Table of Contents appears on a page.
            </p>
            <p className="component-section-description">
              Tab moves between links and Enter follows a link. Following a link updates the
              URL fragment to identify the section. The showcase keeps target headings
              below its sticky header and turns off smooth scrolling for reduced-motion preferences.
            </p>
          </>),
        },
        {
          id: 'table-of-contents-references-heading',
          title: 'Related references',
          content: (<>
            <ul className="component-reference-links">
              <li><Link href="/link">Link — the underlying interactive component</Link></li>
              <li><Link href="/button">Button — documentation example</Link></li>
              <li><Link href="/radio-group">RadioGroup — documentation example</Link></li>
            </ul>
          </>),
        }
      ]}
    />
  )
}
