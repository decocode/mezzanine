import { Link, Popover, PreviewTrigger, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { previewTriggerContent, previewTriggerExampleLabels } from './previewTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PreviewTriggerPage() {
  return (
    <ContentPage
      content={previewTriggerContent}
      parts={{
        example: <ExampleZone>
          <PreviewTrigger>
            <Link href="/popover">{previewTriggerExampleLabels.trigger}</Link>
            <Popover>
              <div className="preview-trigger-example">
                <Text elementType="p" className="mz-text-body-md">{previewTriggerExampleLabels.preview}</Text>
              </div>
            </Popover>
          </PreviewTrigger>
        </ExampleZone>,
      }}
    />
  )
}
