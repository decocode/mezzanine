import { ExampleZone } from '../components/ExampleZone'
import { TableOfContents } from '@decocode/mezzanine'
import { tableOfContentsContent } from '../content/tableOfContentsContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

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
      description={tableOfContentsContent.description}
      title={tableOfContentsContent.title}
      relatedPages={tableOfContentsContent.relatedPages}
      references={tableOfContentsContent.references}
      referencesId={tableOfContentsContent.referencesId}
      sections={[
        {
          id: 'table-of-contents-example-heading',
          title: 'Example',
          content: (<>
            {tableOfContentsContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone className="table-of-contents-example">
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
            </ExampleZone>
            <p className="component-section-description">{tableOfContentsContent.exampleParagraphs[1]}</p>
          </>),
        },
        {
          id: 'table-of-contents-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'table-of-contents-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="TableOfContents anatomy" nameColumn="Component" rows={tableOfContentsContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'table-of-contents-props-heading',
              title: 'Props',
              content: (<>
                <DocsTable aria-label="Table of Contents props" nameColumn="Prop" rows={tableOfContentsContent.propsRows} className="documentation-props-table" />
              </>),
            },
            {
              id: 'table-of-contents-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {tableOfContentsContent.usageParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
