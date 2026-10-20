import { ExampleZone } from '../../../../components/ExampleZone'
import { Dialog, DialogTrigger, Heading, Input, Modal, ModalOverlay, SearchField, SearchTrigger, Text } from '@decocode/mezzanine'
import { searchTriggerContent, searchTriggerDialogText } from './searchTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchTriggerPage() {
  return (
    <ContentPage
      content={searchTriggerContent}
      parts={{
        example: (
          <ExampleZone>
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
          </ExampleZone>
        ),
        iconOnly: (
          <ExampleZone>
            <DialogTrigger>
              <SearchTrigger aria-keyshortcuts="Meta+K Control+K" labelPlacement="tooltip">Search</SearchTrigger>
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
          </ExampleZone>
        ),
      }}
    />
  )
}
