import { Button, SettingsIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { tooltipContent } from '../content/tooltipContent'
import { ContentPage } from '../templates/ContentPage'

export default function TooltipPage() {
  return (
    <ContentPage
      content={tooltipContent}
      parts={{
        example: (
          <ExampleZone>
            <TooltipTrigger>
              <Button iconLeading={<SettingsIcon />} aria-label="Settings" />
              <Tooltip placement="bottom">Settings</Tooltip>
            </TooltipTrigger>
          </ExampleZone>
        ),
      }}
    />
  )
}
