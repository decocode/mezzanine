import { useState } from 'react'
import { Button, DemoBlock, Group, Input, Label, Switch } from '@decocode/mezzanine'
import { groupContent, groupExampleCode, groupExampleLabels, groupFlags } from './groupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GroupPage() {
  const [flags, setFlags] = useState<Record<(typeof groupFlags)[number], boolean>>({ isDisabled: false, isInvalid: false })
  return (
    <ContentPage
      content={groupContent}
      parts={{
        example: (
          <DemoBlock
            codeView={groupExampleCode(flags)}
            endPanel={groupFlags.map((name) => (
              <Switch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
            ))}
          >
            <div className="example-stack">
              <Label htmlFor="group-example-input">{groupExampleLabels.input}</Label>
              <Group {...flags}>
                <Input id="group-example-input" disabled={flags.isDisabled} />
                <Button hierarchy="secondary" isDisabled={flags.isDisabled}>{groupExampleLabels.button}</Button>
              </Group>
            </div>
          </DemoBlock>
        ),
      }}
    />
  )
}
