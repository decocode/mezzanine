import { useState } from 'react'
import { DemoBlock, Dialog, DialogTrigger, Heading, Input, Modal, ModalOverlay, SearchField, SearchTrigger, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  searchTriggerContent, searchTriggerDialogText, searchTriggerExample, searchTriggerExampleCode, searchTriggerIconPositions, searchTriggerTooltipPositions,
} from './searchTriggerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchTriggerPage() {
  const [iconPosition, setIconPosition] = useState<(typeof searchTriggerIconPositions)[number]>('leading')
  const [tooltipPosition, setTooltipPosition] = useState<(typeof searchTriggerTooltipPositions)[number]>('top')
  const [shortcut, setShortcut] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const isIconOnly = iconPosition === 'iconOnly'
  return (
    <ContentPage
      content={searchTriggerContent}
      parts={{
        example: (
          <DemoBlock
            codeView={searchTriggerExampleCode({ iconPosition, tooltipPosition, shortcut, isDisabled })}
            endPanel={<>
              <PanelSelect label="iconPosition" options={searchTriggerIconPositions} value={iconPosition} onChange={setIconPosition} />
              {isIconOnly
                ? <PanelSelect label="tooltipPosition" options={searchTriggerTooltipPositions} value={tooltipPosition} onChange={setTooltipPosition} />
                : <PanelSwitch isSelected={shortcut} onChange={setShortcut}>shortcut</PanelSwitch>}
              <PanelSwitch isSelected={isDisabled} onChange={setIsDisabled}>isDisabled</PanelSwitch>
            </>}
          >
            <DialogTrigger>
              {isIconOnly
                ? <SearchTrigger aria-keyshortcuts="Meta+K Control+K" iconPosition="iconOnly" tooltipPosition={tooltipPosition} isDisabled={isDisabled}>{searchTriggerExample.label}</SearchTrigger>
                : <SearchTrigger aria-keyshortcuts="Meta+K Control+K" shortcut={shortcut ? searchTriggerExample.shortcut : undefined} isDisabled={isDisabled}>{searchTriggerExample.label}</SearchTrigger>}
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
          </DemoBlock>
        ),
      }}
    />
  )
}
