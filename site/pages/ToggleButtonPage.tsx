import { ComponentExample } from '../components/ComponentExample'
import {
  Cell,
  Column,
  ExternalLinkIcon,
  Link,
  Row,
  Table,
  TableBody,
  TableHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@decocode/mezzanine'
import { toggleButtonContent } from '../content/toggleButtonContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function ToggleButtonPage() {
  return (
    <ComponentPageTemplate
      description={toggleButtonContent.description}
      title={toggleButtonContent.title}
      relatedPages={toggleButtonContent.relatedPages}
      references={toggleButtonContent.references}
      sections={[
        {
          id: 'toggle-button-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">{toggleButtonContent.exampleParagraphs[0]}</p>
            <ComponentExample>
              <ToggleButton>Toggle</ToggleButton>
            </ComponentExample>
          </>),
        },
        {
          id: 'toggle-button-states-heading',
          title: 'States',
          content: (<>
            <div className="documentation-table documentation-comparison-table">
              <Table aria-label="ToggleButton states">
                <TableHeader>
                  <Column id="state" isRowHeader>State</Column>
                  <Column id="example">Example</Column>
                </TableHeader>
                <TableBody>
                  <Row id="unselected">
                    <Cell><strong>Unselected</strong></Cell>
                    <Cell><ToggleButton>Toggle</ToggleButton></Cell>
                  </Row>
                  <Row id="selected">
                    <Cell><strong>Selected</strong></Cell>
                    <Cell><ToggleButton defaultSelected>Toggle</ToggleButton></Cell>
                  </Row>
                  <Row id="disabled">
                    <Cell><strong>Disabled</strong></Cell>
                    <Cell><ToggleButton isDisabled>Toggle</ToggleButton></Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'toggle-button-group-heading',
          title: 'Toggle button group',
          subsections: [
            { id: 'single-selection-heading', label: 'Single selection' },
            { id: 'multiple-selection-heading', label: 'Multiple selection' },
          ],
          content: (<>
            <p className="component-section-description">{toggleButtonContent.toggleButtonGroupParagraphs[0]}</p>
            <Link
              aria-label="View ToggleButtonGroup on React Aria (opens in a new tab)"
              className="react-aria-Link react-aria-documentation-link"
              href="https://react-aria.adobe.com/ToggleButtonGroup"
              rel="noreferrer"
              target="_blank"
            >
              <span>View ToggleButtonGroup on React Aria</span>
              <ExternalLinkIcon />
            </Link>
            <div className="toggle-button-group-examples">
              <section aria-labelledby="single-selection-heading">
                <h3 id="single-selection-heading" className="mz-text-heading-sm">
                  Single selection
                </h3>
                <ComponentExample>
                  <ToggleButtonGroup
                    aria-label="Single selection example"
                    defaultSelectedKeys={['toggle-a']}
                    disallowEmptySelection
                    selectionMode="single"
                  >
                    <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                    <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                    <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                  </ToggleButtonGroup>
                </ComponentExample>
              </section>
              <section aria-labelledby="multiple-selection-heading">
                <h3 id="multiple-selection-heading" className="mz-text-heading-sm">
                  Multiple selection
                </h3>
                <ComponentExample>
                  <ToggleButtonGroup
                    aria-label="Multiple selection example"
                    defaultSelectedKeys={['toggle-a']}
                    selectionMode="multiple"
                  >
                    <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                    <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                    <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                  </ToggleButtonGroup>
                </ComponentExample>
              </section>
            </div>
          </>),
        },
        {
          id: 'toggle-button-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'toggle-button-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <ComponentReferenceTable aria-label='ToggleButton anatomy' nameColumn='Component' rows={toggleButtonContent.anatomyRows} className='documentation-anatomy-table' />
              </>),
            },
            {
              id: 'toggle-button-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                <p>{toggleButtonContent.usageParagraphs[0]}</p>
                <p>{toggleButtonContent.usageParagraphs[1]}</p>
                <p>{toggleButtonContent.usageParagraphs[2]}</p>
              </>),
            },
          ],
        },
      ]}
    />
  )
}
