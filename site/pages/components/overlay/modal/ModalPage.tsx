import { useState } from 'react'
import { Button, DemoArea, Dialog, DialogTrigger, Heading, Modal, ModalOverlay, Text } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { modalContent, modalExampleCode, modalExampleLabels, modalFlags } from './modalContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ModalPage() {
  const [flags, setFlags] = useState<Record<(typeof modalFlags)[number], boolean>>({ isDismissable: true, isKeyboardDismissDisabled: false })
  return (
    <ContentPage
      content={modalContent}
      parts={{
        example: (
          <DemoArea
            codeView={modalExampleCode(flags)}
            endPanel={modalFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <DialogTrigger>
              <Button hierarchy="secondary">{modalExampleLabels.trigger}</Button>
              <ModalOverlay {...flags}>
                <Modal>
                  <Dialog>
                    <Heading slot="title">{modalExampleLabels.title}</Heading>
                    <Text elementType="p" className="mz-text-body-md">{modalExampleLabels.body}</Text>
                    <footer className="mz-dialog-actions">
                      <Button slot="close" hierarchy="secondary">{modalExampleLabels.close}</Button>
                    </footer>
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
          </DemoArea>
        ),
      }}
    />
  )
}
