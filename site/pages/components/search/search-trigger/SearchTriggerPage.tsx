import { DemoArea, Dialog, DialogTrigger, Heading, Input, Modal, ModalOverlay, SearchField, SearchTrigger, Text } from '@decocode/mezzanine'
import { searchTriggerContent, searchTriggerDialogText } from './searchTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchTriggerPage() {
  return (
    <ContentPage
      content={searchTriggerContent}
      parts={{
        example: (
          <DemoArea>
            <DialogTrigger>
              <SearchTrigger aria-keyshortcuts="Meta+K Control+K" shortcut="⌘ K">Search</SearchTrigger>
              <ModalOverlay isDismissable>
                <Modal>
                  <Dialog>
                    <Heading slot="title">{searchTriggerDialogText.title}</Heading>
                    <Text elementType="p">{searchTriggerDialogText.description}</Text>
                    <SearchField aria-label="Search" autoFocus><Input /></SearchField>
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
          </DemoArea>
        ),
        iconOnly: (
          <DemoArea>
            <DialogTrigger>
              <SearchTrigger aria-keyshortcuts="Meta+K Control+K" iconPosition="iconOnly">Search</SearchTrigger>
              <ModalOverlay isDismissable>
                <Modal>
                  <Dialog>
                    <Heading slot="title">{searchTriggerDialogText.title}</Heading>
                    <Text elementType="p">{searchTriggerDialogText.description}</Text>
                    <SearchField aria-label="Search" autoFocus><Input /></SearchField>
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
