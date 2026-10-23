import { Button, DemoArea, Dialog, DialogTrigger, Popover, Text } from '@decocode/mezzanine'
import { popoverContent, popoverExampleLabels } from './popoverContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PopoverPage() {
  return (
    <ContentPage
      content={popoverContent}
      parts={{
        example: <DemoArea>
          <DialogTrigger>
            <Button hierarchy="secondary">{popoverExampleLabels.trigger}</Button>
            <Popover>
              <Dialog aria-label={popoverExampleLabels.trigger}>
                <Text elementType="p" className="mz-text-body-md">{popoverExampleLabels.content}</Text>
              </Dialog>
            </Popover>
          </DialogTrigger>
        </DemoArea>,
      }}
    />
  )
}
