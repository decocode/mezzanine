import { ComponentExample } from '../components/ComponentExample'
import {
  Button,
  Dialog, DialogTrigger, Heading, Modal, ModalOverlay
} from '@decocode/mezzanine'
import { useState } from 'react'
import { dialogContent } from '../content/dialogContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function DialogPage() {
  const [confirmationCount, setConfirmationCount] = useState(0)

  return (
    <ComponentPageTemplate
      description={dialogContent.description}
      title={dialogContent.title}
      relatedPages={dialogContent.relatedPages}
      references={dialogContent.references}
      sections={[
        {
          id: 'dialog-example-heading',
          title: 'Example',
          content: (<>
            {dialogContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ComponentExample>
              <DialogTrigger>
                <Button>Open dialog</Button>
                <ModalOverlay isDismissable>
                  <Modal>
                    <Dialog>
                      <Heading slot="title">Dialog title</Heading>
                      <p>Dialog content. The page behind this modal cannot be used until it closes.</p>
                      <footer className="mezzanine-dialog-actions">
                        <Button slot="close">Close</Button>
                      </footer>
                    </Dialog>
                  </Modal>
                </ModalOverlay>
              </DialogTrigger>
            </ComponentExample>
          </>),
        },
        {
          id: 'dialog-confirmation-heading',
          title: 'Confirmation dialog',
          content: (<>
            {dialogContent.confirmationDialogParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ComponentExample>
              <DialogTrigger>
                <Button variant="secondary">Open confirmation</Button>
                <ModalOverlay>
                  <Modal>
                    <Dialog role="alertdialog" aria-describedby="dialog-confirmation-description">
                      {({ close }) => (
                        <>
                          <Heading slot="title">Confirm example action?</Heading>
                          <p id="dialog-confirmation-description">
                            This demonstration updates a message on the page. No data will be deleted or saved.
                          </p>
                          <footer className="mezzanine-dialog-actions">
                            <Button autoFocus slot="close" variant="secondary">Cancel</Button>
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
              <p className="component-example-feedback" role="status">
                {confirmationCount === 0
                  ? 'No action confirmed.'
                  : `Example action confirmed ${confirmationCount} ${confirmationCount === 1 ? 'time' : 'times'}.`}
              </p>
            </ComponentExample>
          </>),
        },
        {
          id: 'dialog-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'dialog-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <ComponentReferenceTable aria-label="Dialog anatomy" nameColumn="Component" rows={dialogContent.anatomyRows} />
              </>),
            },
            {
              id: 'dialog-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                <ul className="mz-text-body-md">{dialogContent.usageItems}</ul>
              </>),
            },
            {
              id: 'dialog-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {dialogContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <ComponentReferenceTable aria-label="Dialog and Modal CSS tokens" nameColumn="CSS token" rows={dialogContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
