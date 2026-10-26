import { useState } from 'react'
import {
  Cell, Column, DemoArea, ExternalLinkIcon, Link, Row, Table, TableBody, TableHeader,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { linkContent, linkContentRows, linkExampleCode, linkExampleLabel, linkStates } from './linkContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function LinkPage() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [current, setCurrent] = useState(false)
  return (
    <ContentPage
      content={linkContent}
      parts={{
        example: (
          <DemoArea
            codeView={linkExampleCode({ isDisabled, current })}
            endPanel={<>
              <PanelSwitch isSelected={isDisabled} onChange={setIsDisabled}>isDisabled</PanelSwitch>
              <PanelSwitch isSelected={current} onChange={setCurrent}>aria-current</PanelSwitch>
            </>}
          >
            <Link href="#link-content" isDisabled={isDisabled} aria-current={current ? 'page' : undefined}>{linkExampleLabel}</Link>
          </DemoArea>
        ),
        states: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Link states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                {linkStates.map(({ name, reactAriaState, state }) => (
                  <Row id={state} key={state}>
                    <Cell>
                      <span className="table-item-heading">
                        <strong>{name}</strong>
                        <code>{reactAriaState}</code>
                      </span>
                    </Cell>
                    <Cell>
                      <Link
                        aria-current={state === 'current' ? 'page' : undefined}
                        data-preview-state={state === 'hovered' || state === 'pressed' || state === 'focused'
                          ? state
                          : undefined}
                        isDisabled={state === 'disabled'}
                      >
                        Link
                      </Link>
                    </Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        content: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Link content">
              <TableHeader>
                <Column id="content" isRowHeader>Content</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                <Row id="text-only">
                  <Cell><strong>{linkContentRows.textOnly}</strong></Cell>
                  <Cell><Link>Link</Link></Cell>
                </Row>
                <Row id="trailing-icon">
                  <Cell><strong>{linkContentRows.trailingIcon}</strong></Cell>
                  <Cell>
                    <Link
                      aria-label="External Link, opens in a new tab"
                    >
                      <span>External Link</span>
                      <ExternalLinkIcon />
                    </Link>
                  </Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
