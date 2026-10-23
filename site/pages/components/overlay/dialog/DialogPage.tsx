import {
  Button, DemoArea, Dialog, DialogTrigger, Heading, Modal, ModalOverlay,
} from '@decocode/mezzanine'
import { useState } from 'react'
import { confirmationFeedback, dialogContent, dialogExampleCopy } from './dialogContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DialogPage() {
  const [confirmationCount, setConfirmationCount] = useState(0)

  return (
    <ContentPage
      content={dialogContent}
      parts={{
        example: (
          <DemoArea>
            <DialogTrigger>
              <Button>Open dialog</Button>
              <ModalOverlay isDismissable>
                <Modal>
                  <Dialog>
                    <Heading slot="title">Dialog title</Heading>
                    <p>{dialogExampleCopy.modalBody}</p>
                    <footer className="mz-dialog-actions">
                      <Button slot="close">Close</Button>
                    </footer>
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
          </DemoArea>
        ),
        confirmationDialog: (
          <DemoArea>
            <DialogTrigger>
              <Button hierarchy="secondary">Open confirmation</Button>
              <ModalOverlay>
                <Modal>
                  <Dialog role="alertdialog" aria-describedby="dialog-confirmation-description">
                    {({ close }) => (
                      <>
                        <Heading slot="title">{dialogExampleCopy.confirmationTitle}</Heading>
                        <p id="dialog-confirmation-description">{dialogExampleCopy.confirmationBody}</p>
                        <footer className="mz-dialog-actions">
                          <Button autoFocus slot="close" hierarchy="secondary">Cancel</Button>
                          <Button onPress={() => {
                            setConfirmationCount((count) => count + 1)
                            close()
                          }}>Confirm</Button>
                        </footer>
                      </>
                    )}
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
            <p className="component-example-feedback" role="status">{confirmationFeedback(confirmationCount)}</p>
          </DemoArea>
        ),
      }}
    />
  )
}
