import { useState } from 'react'
import { DemoBlock, Link, Popover, PreviewTrigger, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import {
  previewTriggerCloseDelays, previewTriggerContent, previewTriggerDelays, previewTriggerExampleCode, previewTriggerExampleLabels,
} from './previewTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PreviewTriggerPage() {
  const [delay, setDelay] = useState<(typeof previewTriggerDelays)[number]>('600')
  const [closeDelay, setCloseDelay] = useState<(typeof previewTriggerCloseDelays)[number]>('200')
  return (
    <ContentPage
      content={previewTriggerContent}
      parts={{
        example: (
          <DemoBlock
            codeView={previewTriggerExampleCode({ delay: Number(delay), closeDelay: Number(closeDelay) })}
            endPanel={<>
              <PanelSelect label="delay" options={previewTriggerDelays} value={delay} onChange={setDelay} />
              <PanelSelect label="closeDelay" options={previewTriggerCloseDelays} value={closeDelay} onChange={setCloseDelay} />
            </>}
          >
            <PreviewTrigger delay={Number(delay)} closeDelay={Number(closeDelay)}>
              <Link href="/popover">{previewTriggerExampleLabels.trigger}</Link>
              <Popover>
                <div className="preview-trigger-example">
                  <Text elementType="p" className="mz-text-body-md">{previewTriggerExampleLabels.preview}</Text>
                </div>
              </Popover>
            </PreviewTrigger>
          </DemoBlock>
        ),
      }}
    />
  )
}
