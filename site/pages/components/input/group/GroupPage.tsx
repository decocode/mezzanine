import { Button, DemoArea, Group, Input, Label } from '@decocode/mezzanine'
import { groupContent, groupExampleLabels } from './groupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GroupPage() {
  return (
    <ContentPage
      content={groupContent}
      parts={{
        example: <DemoArea>
          <div className="example-stack">
            <Label htmlFor="group-example-input">{groupExampleLabels.input}</Label>
            <Group>
              <Input id="group-example-input" />
              <Button hierarchy="secondary">{groupExampleLabels.button}</Button>
            </Group>
          </div>
        </DemoArea>,
      }}
    />
  )
}
