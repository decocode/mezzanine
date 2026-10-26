import { useState } from 'react'
import { Button, DemoArea, SettingsIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { tooltipContent, tooltipDelays, tooltipExampleCode, tooltipPlacements } from './tooltipContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TooltipPage() {
  const [placement, setPlacement] = useState<(typeof tooltipPlacements)[number]>('bottom')
  const [delay, setDelay] = useState<(typeof tooltipDelays)[number]>('500')
  return (
    <ContentPage
      content={tooltipContent}
      parts={{
        example: (
          <DemoArea
            codeView={tooltipExampleCode({ placement, delay: Number(delay) })}
            endPanel={<>
              <PanelSelect label="placement" options={tooltipPlacements} value={placement} onChange={setPlacement} />
              <PanelSelect label="delay" options={tooltipDelays} value={delay} onChange={setDelay} />
            </>}
          >
            <TooltipTrigger delay={Number(delay)}>
              <Button icon={<SettingsIcon />} aria-label="Settings" />
              <Tooltip placement={placement}>Settings</Tooltip>
            </TooltipTrigger>
          </DemoArea>
        ),
      }}
    />
  )
}
