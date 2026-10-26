import { useState } from 'react'
import { Button, DemoArea, Group, ListBoxItem, Select, Separator, ToggleButton, ToggleButtonGroup, Toolbar } from '@decocode/mezzanine'
import { toolbarContent, toolbarExampleCode, toolbarExampleLabels, toolbarOrientationLabel, toolbarOrientations } from './toolbarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ToolbarPage() {
  const [orientation, setOrientation] = useState<(typeof toolbarOrientations)[number]>('horizontal')
  return (
    <ContentPage
      content={toolbarContent}
      parts={{
        example: (
          <DemoArea
            codeView={toolbarExampleCode(orientation)}
            endPanel={
              <Select size="sm" label={toolbarOrientationLabel} selectedKey={orientation} onSelectionChange={(key) => { if (key != null) setOrientation(key as (typeof toolbarOrientations)[number]) }}>
                {toolbarOrientations.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
            }
          >
            <Toolbar aria-label={toolbarExampleLabels.toolbar} orientation={orientation}>
              <ToggleButtonGroup aria-label={toolbarExampleLabels.toggleGroup} selectionMode="single" size="sm" hierarchy="secondary">
                {toolbarExampleLabels.toggles.map((toggle) => <ToggleButton key={toggle} id={toggle}>{toggle}</ToggleButton>)}
              </ToggleButtonGroup>
              <Separator />
              <Group aria-label={toolbarExampleLabels.actionGroup}>
                {toolbarExampleLabels.actions.map((action) => <Button key={action} size="sm" hierarchy="secondary">{action}</Button>)}
              </Group>
            </Toolbar>
          </DemoArea>
        ),
      }}
    />
  )
}
