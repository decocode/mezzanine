import { Button, DemoArea, Group, Separator, ToggleButton, ToggleButtonGroup, Toolbar } from '@decocode/mezzanine'
import { toolbarContent, toolbarExampleLabels } from './toolbarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ToolbarPage() {
  return (
    <ContentPage
      content={toolbarContent}
      parts={{
        example: <DemoArea>
          <Toolbar aria-label={toolbarExampleLabels.toolbar}>
            <ToggleButtonGroup aria-label={toolbarExampleLabels.toggleGroup} selectionMode="single" size="sm" variant="secondary">
              {toolbarExampleLabels.toggles.map((toggle) => <ToggleButton key={toggle} id={toggle}>{toggle}</ToggleButton>)}
            </ToggleButtonGroup>
            <Separator />
            <Group aria-label={toolbarExampleLabels.actionGroup}>
              {toolbarExampleLabels.actions.map((action) => <Button key={action} size="sm" variant="secondary">{action}</Button>)}
            </Group>
          </Toolbar>
        </DemoArea>,
      }}
    />
  )
}
