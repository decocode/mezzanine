import { Separator, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { separatorContent } from './separatorContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SeparatorPage() {
  return (
    <ContentPage
      content={separatorContent}
      parts={{
        example: <ExampleZone>
          <div className="separator-example">
            <Text elementType="p" className="mz-text-body-md">Group A</Text>
            <Separator />
            <Text elementType="p" className="mz-text-body-md">Group B</Text>
          </div>
        </ExampleZone>,
        variants: <ExampleZone>
          <div className="separator-example separator-example-row">
            <Text className="mz-text-body-md">Item A</Text>
            <Separator orientation="vertical" />
            <Text className="mz-text-body-md">Item B</Text>
          </div>
        </ExampleZone>,
      }}
    />
  )
}
