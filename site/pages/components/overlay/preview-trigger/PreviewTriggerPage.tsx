import { DemoArea, Link, Popover, PreviewTrigger, Text } from '@decocode/mezzanine'
import { previewTriggerContent, previewTriggerExampleLabels } from './previewTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PreviewTriggerPage() {
  return (
    <ContentPage
      content={previewTriggerContent}
      parts={{
        example: <DemoArea>
          <PreviewTrigger>
            <Link href="/popover">{previewTriggerExampleLabels.trigger}</Link>
            <Popover>
              <div className="preview-trigger-example">
                <Text elementType="p" className="mz-text-body-md">{previewTriggerExampleLabels.preview}</Text>
              </div>
            </Popover>
          </PreviewTrigger>
        </DemoArea>,
      }}
    />
  )
}
