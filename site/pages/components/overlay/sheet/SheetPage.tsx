import { Button, DemoArea, Heading, Sheet, SheetTrigger, Text } from '@decocode/mezzanine'
import { sheetContent, sheetExampleLabels } from './sheetContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SheetPage() {
  return (
    <ContentPage
      content={sheetContent}
      parts={{
        example: <DemoArea>
          <SheetTrigger>
            <Button hierarchy="secondary">{sheetExampleLabels.trigger}</Button>
            <Sheet>
              <Heading slot="title">{sheetExampleLabels.title}</Heading>
              <Text elementType="p" className="mz-text-body-md">{sheetExampleLabels.body}</Text>
              <Button slot="close" hierarchy="secondary">{sheetExampleLabels.close}</Button>
            </Sheet>
          </SheetTrigger>
        </DemoArea>,
      }}
    />
  )
}
