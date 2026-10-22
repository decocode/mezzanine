import { Button, Dialog, DialogTrigger, Popover, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { popoverContent, popoverExampleLabels } from './popoverContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PopoverPage() {
  return (
    <ContentPage
      content={popoverContent}
      parts={{
        example: <ExampleZone>
          <DialogTrigger>
            <Button variant="secondary">{popoverExampleLabels.trigger}</Button>
            <Popover>
              <Dialog aria-label={popoverExampleLabels.trigger}>
                <Text elementType="p" className="mz-text-body-md">{popoverExampleLabels.content}</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </ExampleZone>,
      }}
    />
  )
}
