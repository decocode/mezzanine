import { useState } from 'react'
import { Button, DemoBlock, Dialog, DialogTrigger, Popover, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { popoverContent, popoverExampleCode, popoverExampleLabels, popoverPlacements } from './popoverContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PopoverPage() {
  const [placement, setPlacement] = useState<(typeof popoverPlacements)[number]>('bottom')
  return (
    <ContentPage
      content={popoverContent}
      parts={{
        example: (
          <DemoBlock codeView={popoverExampleCode(placement)} endPanel={<PanelSelect label="placement" options={popoverPlacements} value={placement} onChange={setPlacement} />}>
            <DialogTrigger>
              <Button hierarchy="secondary">{popoverExampleLabels.trigger}</Button>
              <Popover placement={placement}>
                <Dialog aria-label={popoverExampleLabels.trigger}>
                  <Text elementType="p" className="mz-text-body-md">{popoverExampleLabels.content}</Text>
                </Dialog>
              </Popover>
            </DialogTrigger>
          </DemoBlock>
        ),
      }}
    />
  )
}
