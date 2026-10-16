import { ExampleZone } from '../components/ExampleZone'
import { Cell, Checkbox, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { checkboxContent } from '../content/checkboxContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function CheckboxPage() {
  return (
    <DocsPageTemplate
      description={checkboxContent.description}
      title={checkboxContent.title}
      relatedPages={checkboxContent.relatedPages}
      references={checkboxContent.references}
      sections={[
        {
          id: 'checkbox-example-heading',
          title: 'Example',
          content: (<>
            {checkboxContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Checkbox>Checkbox label</Checkbox>
            </ExampleZone>
          </>),
        },
        {
          id: 'checkbox-states-heading',
          title: 'States',
          content: (<>
            <div className="documentation-table documentation-comparison-table">
              <Table aria-label="Checkbox states">
                <TableHeader>
                  <Column id="state" isRowHeader>State</Column>
                  <Column id="example">Example</Column>
                </TableHeader>
                <TableBody>
                  <Row id="unselected">
                    <Cell><strong>Unselected</strong></Cell>
                    <Cell><Checkbox>Checkbox</Checkbox></Cell>
                  </Row>
                  <Row id="selected">
                    <Cell><strong>Selected</strong></Cell>
                    <Cell><Checkbox defaultSelected>Checkbox</Checkbox></Cell>
                  </Row>
                  <Row id="indeterminate">
                    <Cell><strong>Indeterminate</strong></Cell>
                    <Cell><Checkbox isIndeterminate>Checkbox</Checkbox></Cell>
                  </Row>
                  <Row id="disabled">
                    <Cell><strong>Disabled</strong></Cell>
                    <Cell><Checkbox isDisabled>Checkbox</Checkbox></Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'checkbox-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'checkbox-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="Checkbox anatomy" nameColumn="Component" rows={checkboxContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'checkbox-usage-heading',
              title: 'Usage',
              content: (<>
                {checkboxContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'checkbox-accessibility-heading',
              title: 'Accessibility',
              content: (<>
                {checkboxContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'checkbox-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {checkboxContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Checkbox CSS tokens" nameColumn="CSS token" rows={checkboxContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
