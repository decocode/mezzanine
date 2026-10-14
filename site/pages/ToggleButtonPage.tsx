import { ExampleZone } from '../components/ExampleZone'
import {
  Cell,
  DownloadIcon, Tooltip, TooltipTrigger,
  Column,
  ExternalLinkIcon,
  Link,
  Row,
  Table,
  TableBody,
  TableHeader,
  Tabs, TabList, Tab, TabPanel,
  ToggleButton,
  ToggleButtonGroup,
} from '@decocode/mezzanine'
import { buttonSizes, buttonContent } from '../content/buttonContent'
import { toggleButtonContent } from '../content/toggleButtonContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

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
            <ExampleZone>
              <ToggleButton>Toggle</ToggleButton>
            </ExampleZone>
          </>),
        },
        {
          id: 'toggle-button-sizes',
          title: 'Sizes',
          content: <div className="documentation-table button-sizes-table">
            <Table aria-label="ToggleButton sizes">
              <TableHeader>
                <Column id="size" isRowHeader>Size</Column>
                <Column id="text">Text</Column>
                <Column id="icon">Icon only buttons</Column>
              </TableHeader>
              <TableBody>
                {buttonSizes.map(({ label, size }) => <Row id={size} key={size}>
                  <Cell>{label}</Cell>
                  <Cell><ToggleButton size={size}>Toggle</ToggleButton></Cell>
                  <Cell><TooltipTrigger>
                    <ToggleButton size={size} iconLeading={<DownloadIcon />} aria-label={buttonContent.iconOnlyLabel} />
                    <Tooltip>{buttonContent.iconOnlyLabel}</Tooltip>
                  </TooltipTrigger></Cell>
                </Row>)}
              </TableBody>
            </Table>
          </div>,
        },
        {
          id: 'toggle-button-states-heading',
          title: 'States',
          content: (<>
            <div className="documentation-table toggle-button-states-table">
              <Table aria-label="ToggleButton states">
                <TableHeader>
                  <Column id="state" isRowHeader>State</Column>
                  <Column id="primary">Primary</Column>
                  <Column id="secondary">Secondary</Column>
                </TableHeader>
                <TableBody>
                  <Row id="unselected">
                    <Cell><strong>Unselected</strong></Cell>
                    <Cell><ToggleButton>Toggle</ToggleButton></Cell>
                    <Cell><ToggleButton variant="secondary">Toggle</ToggleButton></Cell>
                  </Row>
                  <Row id="selected">
                    <Cell><strong>Selected</strong></Cell>
                    <Cell><ToggleButton defaultSelected>Toggle</ToggleButton></Cell>
                    <Cell><ToggleButton variant="secondary" defaultSelected>Toggle</ToggleButton></Cell>
                  </Row>
                  <Row id="disabled">
                    <Cell><strong>Disabled</strong></Cell>
                    <Cell><ToggleButton isDisabled>Toggle</ToggleButton></Cell>
                    <Cell><ToggleButton variant="secondary" isDisabled>Toggle</ToggleButton></Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'toggle-button-group-heading',
          title: 'Toggle button group',
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
            <ExampleZone>
              <Tabs defaultSelectedKey="single">
                <TabList aria-label="Selection mode">
                  <Tab id="single">Single</Tab>
                  <Tab id="multiple">Multi</Tab>
                </TabList>
                <TabPanel id="single" shouldForceMount>
                  <p>{toggleButtonContent.singleSelectionInstruction}</p>
                  <ToggleButtonGroup aria-label="Single selection example" defaultSelectedKeys={['toggle-a']} disallowEmptySelection selectionMode="single">
                    <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                    <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                    <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                  </ToggleButtonGroup>
                </TabPanel>
                <TabPanel id="multiple" shouldForceMount>
                  <p>{toggleButtonContent.multipleSelectionInstruction}</p>
                  <ToggleButtonGroup aria-label="Multiple selection example" defaultSelectedKeys={['toggle-a']} selectionMode="multiple">
                    <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                    <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                    <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                  </ToggleButtonGroup>
                </TabPanel>
              </Tabs>
            </ExampleZone>
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
                <DocsTable aria-label='ToggleButton anatomy' nameColumn='Component' rows={toggleButtonContent.anatomyRows} className='documentation-anatomy-table' />
              </>),
            },
            {
              id: 'toggle-button-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                <p>{toggleButtonContent.usageParagraphs[0]}</p>
                <p>{toggleButtonContent.usageParagraphs[1]}</p>
                <p>{toggleButtonContent.usageParagraphs[2]}</p>
                <p>{toggleButtonContent.secondaryDescription}</p>
              </>),
            },
          ],
        },
      ]}
    />
  )
}
