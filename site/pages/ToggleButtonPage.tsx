import {
  Link,
  Cell,
  Column,
  ExternalLinkIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function ToggleButtonPage() {
  return (
    <ComponentPageTemplate
      description={<>A <code>ToggleButton</code> switches one option on or off and keeps its selected state until it is pressed again.</>}
      reactAriaPage="ToggleButton"
      title="ToggleButton"
      sections={[
        {
          id: 'toggle-button-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              Press the <code>ToggleButton</code> to select it, then press it again to clear the selection.
            </p>
            <div className="component-example">
              <ToggleButton>Toggle</ToggleButton>
            </div>
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
            <p className="component-section-description">
              A <code>ToggleButtonGroup</code> brings related <code>ToggleButton</code> components together and supports either single or
              multiple selection.
            </p>
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
                <div className="component-example">
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
                </div>
              </section>
              <section aria-labelledby="multiple-selection-heading">
                <h3 id="multiple-selection-heading" className="mz-text-heading-sm">
                  Multiple selection
                </h3>
                <div className="component-example">
                  <ToggleButtonGroup
                    aria-label="Multiple selection example"
                    defaultSelectedKeys={['toggle-a']}
                    selectionMode="multiple"
                  >
                    <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                    <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                    <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </section>
            </div>
          </>),
        }
      ]}
    />
  )
}
