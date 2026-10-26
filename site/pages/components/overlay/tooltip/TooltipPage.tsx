import { Button, DemoArea, SettingsIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { tooltipContent } from './tooltipContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TooltipPage() {
  return (
    <ContentPage
      content={tooltipContent}
      parts={{
        example: (
          <DemoArea>
            <TooltipTrigger>
              <Button icon={<SettingsIcon />} aria-label="Settings" />
              <Tooltip placement="bottom">Settings</Tooltip>
            </TooltipTrigger>
          </DemoArea>
        ),
      }}
    />
  )
}
