import { Button, Heading, Sheet, SheetTrigger, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { sheetContent, sheetExampleLabels } from './sheetContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SheetPage() {
  return (
    <ContentPage
      content={sheetContent}
      parts={{
        example: <ExampleZone>
          <SheetTrigger>
            <Button variant="secondary">{sheetExampleLabels.trigger}</Button>
            <Sheet>
              <Heading slot="title">{sheetExampleLabels.title}</Heading>
              <Text elementType="p" className="mz-text-body-md">{sheetExampleLabels.body}</Text>
              <Button slot="close" variant="secondary">{sheetExampleLabels.close}</Button>
            </Sheet>
          </SheetTrigger>
        </ExampleZone>,
      }}
    />
  )
}
