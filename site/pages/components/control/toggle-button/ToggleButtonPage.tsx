import {
  Cell, Column, DemoArea, DownloadIcon, ExternalLinkIcon, Link, Row, Tab, Table, TableBody, TableHeader, TabList, TabPanel, Tabs, ToggleButton, ToggleButtonGroup,
} from '@decocode/mezzanine'
import { buttonSizes, buttonContent } from '../button/buttonContent'
import { toggleButtonContent, toggleButtonGroupExample, toggleButtonSizesTable, toggleButtonStatesTable } from './toggleButtonContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ToggleButtonPage() {
  const { columns: sizeColumns } = toggleButtonSizesTable
  const { columns: stateColumns, rows: stateRows } = toggleButtonStatesTable
  const { documentationLink } = toggleButtonGroupExample
  return (
    <ContentPage
      content={toggleButtonContent}
      parts={{
        example: (
          <DemoArea>
            <ToggleButton>Toggle</ToggleButton>
          </DemoArea>
        ),
        sizes: (
          <div className="documentation-table button-sizes-table">
            <Table aria-label={toggleButtonSizesTable.label}>
              <TableHeader>
                <Column id="size" isRowHeader>{sizeColumns.size}</Column>
                <Column id="text">{sizeColumns.text}</Column>
                <Column id="icon">{sizeColumns.icon}</Column>
              </TableHeader>
              <TableBody>
                {buttonSizes.map(({ label, size }) => <Row id={size} key={size}>
                  <Cell>{label}</Cell>
                  <Cell><ToggleButton size={size}>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton size={size} iconLeading={<DownloadIcon />} labelPlacement="tooltip">{buttonContent.iconButtonLabel}</ToggleButton></Cell>
                </Row>)}
              </TableBody>
            </Table>
          </div>
        ),
        states: (
          <div className="documentation-table toggle-button-states-table">
            <Table aria-label={toggleButtonStatesTable.label}>
              <TableHeader>
                <Column id="state" isRowHeader>{stateColumns.state}</Column>
                <Column id="primary">{stateColumns.primary}</Column>
                <Column id="secondary">{stateColumns.secondary}</Column>
                <Column id="tertiary">{stateColumns.tertiary}</Column>
              </TableHeader>
              <TableBody>
                <Row id="unselected">
                  <Cell><strong>{stateRows.unselected}</strong></Cell>
                  <Cell><ToggleButton>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="secondary">Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="tertiary">Toggle</ToggleButton></Cell>
                </Row>
                <Row id="selected">
                  <Cell><strong>{stateRows.selected}</strong></Cell>
                  <Cell><ToggleButton defaultSelected>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="secondary" defaultSelected>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="tertiary" defaultSelected>Toggle</ToggleButton></Cell>
                </Row>
                <Row id="disabled">
                  <Cell><strong>{stateRows.disabled}</strong></Cell>
                  <Cell><ToggleButton isDisabled>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="secondary" isDisabled>Toggle</ToggleButton></Cell>
                  <Cell><ToggleButton hierarchy="tertiary" isDisabled>Toggle</ToggleButton></Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
        toggleButtonGroup: (<>
          <Link
            className="react-aria-Link react-aria-documentation-link"
            href={documentationLink.href}
          >
            <span>{documentationLink.label}</span>
            <ExternalLinkIcon />
          </Link>
          <DemoArea>
            <Tabs defaultSelectedKey="single">
              <TabList aria-label="Selection mode">
                <Tab id="single">Single</Tab>
                <Tab id="multiple">Multi</Tab>
              </TabList>
              <TabPanel id="single" shouldForceMount>
                <p>{toggleButtonGroupExample.singleSelectionInstruction}</p>
                <ToggleButtonGroup aria-label="Single selection example" defaultSelectedKeys={['toggle-a']} disallowEmptySelection selectionMode="single">
                  <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                  <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                  <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                </ToggleButtonGroup>
              </TabPanel>
              <TabPanel id="multiple" shouldForceMount>
                <p>{toggleButtonGroupExample.multipleSelectionInstruction}</p>
                <ToggleButtonGroup aria-label="Multiple selection example" defaultSelectedKeys={['toggle-a']} selectionMode="multiple">
                  <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                  <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                  <ToggleButton id="toggle-c">Toggle C</ToggleButton>
                </ToggleButtonGroup>
              </TabPanel>
            </Tabs>
          </DemoArea>
        </>),
      }}
    />
  )
}
