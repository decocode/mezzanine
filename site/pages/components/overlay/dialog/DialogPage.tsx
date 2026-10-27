import {
  Button, DemoBlock, Dialog, DialogTrigger, Heading, Modal, ModalOverlay,
} from '@decocode/mezzanine'
import { useState } from 'react'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { confirmationFeedback, dialogContent, dialogExampleCode, dialogExampleCopy, dialogRoles } from './dialogContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DialogPage() {
  const [confirmationCount, setConfirmationCount] = useState(0)
  const [role, setRole] = useState<(typeof dialogRoles)[number]>('dialog')
  const [isDismissable, setIsDismissable] = useState(true)
  const isAlert = role === 'alertdialog'

  return (
    <ContentPage
      content={dialogContent}
      parts={{
        example: (
          <DemoBlock
            codeView={dialogExampleCode({ role, isDismissable })}
            endPanel={<>
              <PanelSelect label="role" options={dialogRoles} value={role} onChange={setRole} />
              {!isAlert && <PanelSwitch isSelected={isDismissable} onChange={setIsDismissable}>isDismissable</PanelSwitch>}
            </>}
          >
            {isAlert
              ? <>
                <DialogTrigger>
                  <Button>Open confirmation</Button>
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
              </>
              : <DialogTrigger>
                <Button>Open dialog</Button>
                <ModalOverlay isDismissable={isDismissable}>
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
              </DialogTrigger>}
          </DemoBlock>
        ),
      }}
    />
  )
}
