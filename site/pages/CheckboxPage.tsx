import { ExampleZone } from '../components/ExampleZone'
import { Cell, Checkbox, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { checkboxContent } from '../content/checkboxContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function CheckboxPage() {
  return (
    <ComponentPageTemplate
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
              title: 'Usage and accessibility',
              content: (<>
                {checkboxContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
