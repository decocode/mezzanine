import { useState } from 'react'
import { Button, DemoArea, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { tooltipContent, tooltipDelays, tooltipExampleCode, tooltipExampleLabels, tooltipPlacements } from './tooltipContent'
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
              <Button>{tooltipExampleLabels.button}</Button>
              <Tooltip placement={placement}>{tooltipExampleLabels.tooltip}</Tooltip>
            </TooltipTrigger>
          </DemoArea>
        ),
      }}
    />
  )
}
