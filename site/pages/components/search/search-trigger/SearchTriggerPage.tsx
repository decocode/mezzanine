import { ExampleZone } from '../../../../components/ExampleZone'
import { Dialog, DialogTrigger, Input, Modal, ModalOverlay, SearchField, SearchTrigger } from '@decocode/mezzanine'
import { searchTriggerContent } from './searchTriggerContent'
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
                  <Dialog aria-label="Search">
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
