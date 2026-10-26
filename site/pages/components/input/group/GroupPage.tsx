import { useState } from 'react'
import { Button, DemoArea, Group, Input, Label } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { groupContent, groupExampleCode, groupExampleLabels, groupFlags } from './groupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GroupPage() {
  const [flags, setFlags] = useState<Record<(typeof groupFlags)[number], boolean>>({ isDisabled: false, isInvalid: false })
  return (
    <ContentPage
      content={groupContent}
      parts={{
        example: (
          <DemoArea
            codeView={groupExampleCode(flags)}
            endPanel={groupFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <div className="example-stack">
              <Label htmlFor="group-example-input">{groupExampleLabels.input}</Label>
              <Group {...flags}>
                <Input id="group-example-input" disabled={flags.isDisabled} />
                <Button hierarchy="secondary" isDisabled={flags.isDisabled}>{groupExampleLabels.button}</Button>
              </Group>
            </div>
          </DemoArea>
        ),
      }}
    />
  )
}
