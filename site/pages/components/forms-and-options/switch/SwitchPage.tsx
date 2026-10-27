import { useState } from 'react'
import { Cell, Column, DemoBlock, FieldError, Row, SwitchButton, SwitchField, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { switchContent, switchExampleCode, switchExampleError, switchExampleLabel, switchFlags, switchStateLabels } from './switchContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SwitchPage() {
  const [flags, setFlags] = useState<Record<(typeof switchFlags)[number], boolean>>({ defaultSelected: false, isDisabled: false, isReadOnly: false, isInvalid: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  // errorMessage only shows on an invalid switch, so its control appears with isInvalid.
  const showsError = flags.isInvalid && hasErrorMessage
  return (
    <ContentPage
      content={switchContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the switch looks like or does.
        example: (
          <DemoBlock
            codeView={switchExampleCode({ ...flags, errorMessage: showsError })}
            endPanel={<>
              {switchFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <SwitchField key={String(flags.defaultSelected)} {...flags}>
              <SwitchButton>{switchExampleLabel}</SwitchButton>
              {showsError && <FieldError>{switchExampleError}</FieldError>}
            </SwitchField>
          </DemoBlock>
        ),
        states: (
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Switch states">
              <TableHeader>
                <Column id="state" isRowHeader>State</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                <Row id="unselected">
                  <Cell><strong>{switchStateLabels.unselected}</strong></Cell>
                  <Cell><SwitchField><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
                <Row id="selected">
                  <Cell><strong>{switchStateLabels.selected}</strong></Cell>
                  <Cell><SwitchField defaultSelected><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
                <Row id="disabled">
                  <Cell><strong>{switchStateLabels.disabled}</strong></Cell>
                  <Cell><SwitchField isDisabled><SwitchButton>Switch</SwitchButton></SwitchField></Cell>
                </Row>
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
