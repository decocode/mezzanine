import { useState } from 'react'
import {
  Button, Cell, Column, Dialog, DialogTrigger, Heading, Modal, ModalOverlay,
  Row, Table, TableBody, TableHeader,
} from '@decocode/mezzanine'
import { TableOfContents } from './TableOfContents'
import { dialogTokens } from './componentTokenDocumentation'

export function DialogExamples() {
  const [confirmationCount, setConfirmationCount] = useState(0)

  return (
    <>
      <TableOfContents sections={[
        { id: 'dialog-example-heading', label: 'Example' },
        { id: 'dialog-confirmation-heading', label: 'Confirmation dialog' },
        { id: 'dialog-anatomy-heading', label: 'Anatomy' },
        { id: 'dialog-usage-heading', label: 'Usage and accessibility' },
        { id: 'dialog-tokens-heading', label: 'CSS tokens' },
      ]} />
      <section aria-labelledby="dialog-example-heading" className="component-section">
        <h2 id="dialog-example-heading" className="mz-text-heading-md">Example</h2>
        <p className="component-section-description">
          A modal dialog blocks interaction with the page behind it. This example can be
          closed with the Close button, Escape, or a click outside the dialog.
        </p>
        <div className="component-example">
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
        </div>
      </section>
      <section aria-labelledby="dialog-confirmation-heading" className="component-section">
        <h2 id="dialog-confirmation-heading" className="mz-text-heading-md">Confirmation dialog</h2>
        <p className="component-section-description">
          Use <code>Dialog</code> with <code>role="alertdialog"</code> for a confirmation
          that needs an immediate response. Cancel receives initial focus. Clicking outside
          does not dismiss this example; Escape still cancels. Confirm only updates the message below.
        </p>
        <div className="component-example">
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
        </div>
      </section>
      <section aria-labelledby="dialog-anatomy-heading" className="component-section">
        <h2 id="dialog-anatomy-heading" className="mz-text-heading-md">Anatomy</h2>
        <div className="documentation-table">
          <Table aria-label="Dialog anatomy">
            <TableHeader>
              <Column isRowHeader>Component</Column>
              <Column>Purpose</Column>
            </TableHeader>
            <TableBody>
              <Row id="trigger"><Cell><code>DialogTrigger</code></Cell><Cell>Connects the opening control to the dialog and manages open state.</Cell></Row>
              <Row id="overlay"><Cell><code>ModalOverlay</code></Cell><Cell>The backdrop; accepts dismissal and controlled open-state props.</Cell></Row>
              <Row id="modal"><Cell><code>Modal</code></Cell><Cell>The modal container. Blocks interaction outside it. Can also create its own overlay when used without an explicit <code>ModalOverlay</code>.</Cell></Row>
              <Row id="dialog"><Cell><code>Dialog</code></Cell><Cell>The accessible content container. Use its close render prop for a custom action.</Cell></Row>
              <Row id="title"><Cell><code>Heading slot="title"</code></Cell><Cell>Provides the visible title and accessible name.</Cell></Row>
              <Row id="close"><Cell><code>Button slot="close"</code></Cell><Cell>Closes the dialog without an additional event handler.</Cell></Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="dialog-usage-heading" className="component-section">
        <h2 id="dialog-usage-heading" className="mz-text-heading-md">Usage and accessibility</h2>
        <ul className="mz-text-body-md">
          <li><code>Dialog</code> describes the content; <code>Modal</code> adds blocking behaviour. A non-modal dialog leaves the rest of the page usable. Non-modal presentation is not included in this first release.</li>
          <li>Give every dialog a title. For a short confirmation, connect the explanatory text with <code>aria-describedby</code>.</li>
          <li>React Aria manages focus containment, background interaction blocking, and focus return to the trigger.</li>
          <li><code>isDismissable</code> enables outside-click dismissal. Escape closes by default; <code>isKeyboardDismissDisabled</code> can disable it. Always provide a visible way to close.</li>
          <li>For controlled use, pass <code>isOpen</code> and <code>onOpenChange</code> to <code>DialogTrigger</code>, or to <code>ModalOverlay</code> when there is no trigger.</li>
          <li>Use <code>mezzanine-dialog-actions</code> on a footer to arrange buttons. <code>Dialog</code> content scrolls when it exceeds the available height, and entry/exit animations respect reduced motion.</li>
        </ul>
      </section>
      <section aria-labelledby="dialog-tokens-heading" className="component-section">
        <h2 id="dialog-tokens-heading" className="mz-text-heading-md">CSS tokens</h2>
        <p className="component-section-description"><code>Dialog</code> and <code>Modal</code> also use shared typography, focus colour and overlay elevation tokens. React Aria supplies the page and visual-viewport dimensions.</p>
        <div className="documentation-table">
          <Table aria-label="Dialog and Modal CSS tokens">
            <TableHeader><Column isRowHeader>CSS token</Column><Column>Purpose</Column></TableHeader>
            <TableBody>
              {dialogTokens.map(({ token, description }) => (
                <Row id={token} key={token}><Cell><code>{token}</code></Cell><Cell>{description}</Cell></Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}
