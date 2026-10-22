import { Button, DemoArea, Dialog, DialogTrigger, Heading, Modal, ModalOverlay, Text } from '@decocode/mezzanine'
import { modalContent, modalExampleLabels } from './modalContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ModalPage() {
  return (
    <ContentPage
      content={modalContent}
      parts={{
        example: <DemoArea>
          <DialogTrigger>
            <Button variant="secondary">{modalExampleLabels.trigger}</Button>
            <ModalOverlay isDismissable>
              <Modal>
                <Dialog>
                  <Heading slot="title">{modalExampleLabels.title}</Heading>
                  <Text elementType="p" className="mz-text-body-md">{modalExampleLabels.body}</Text>
                  <footer className="mz-dialog-actions">
                    <Button slot="close" variant="secondary">{modalExampleLabels.close}</Button>
                  </footer>
                </Dialog>
              </Modal>
            </ModalOverlay>
          </DialogTrigger>
        </DemoArea>,
      }}
    />
  )
}
