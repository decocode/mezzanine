import { useState } from 'react'
import { DemoBlock, TableOfContents } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { tableOfContentsContent, tableOfContentsExampleCode, tableOfContentsExampleHeading } from './tableOfContentsContent'
import { ContentPage } from '../../../../templates/ContentPage'

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

export default function TableOfContentsPage() {
  const [hasHeading, setHasHeading] = useState(true)
  return (
    <ContentPage
      content={tableOfContentsContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={tableOfContentsExampleCode(hasHeading)}
            endPanel={<PanelSwitch isSelected={hasHeading} onChange={setHasHeading}>heading</PanelSwitch>}
          >
            <div className="table-of-contents-example mz-prose">
              {hasHeading
                ? <TableOfContents heading={tableOfContentsExampleHeading} headingLevel={3} sections={exampleSections} />
                : <TableOfContents aria-label={tableOfContentsExampleHeading} sections={exampleSections} />}
              {exampleSections.map(({ id, label, children }) => (
                <section aria-labelledby={id} key={id} className="mz-prose">
                  <h3 className="mz-text-heading-sm" id={id}>{label}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  {children.map((child) => (
                    <section aria-labelledby={child.id} key={child.id} className="mz-prose">
                      <h4 className="mz-text-title-md" id={child.id}>{child.label}</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </section>
                  ))}
                </section>
              ))}
            </div>
          </DemoBlock>
        ),
      }}
    />
  )
}
