import { useId, useState } from 'react'
import { Button, Checkbox, DemoArea, DropZone, FileTrigger, PlaceholderIcon, Text } from '@decocode/mezzanine'
import { dropZoneContent, dropZoneDisabledLabel, dropZoneExampleCode, dropZoneExampleLabels } from './dropZoneContent'
import { ContentPage } from '../../../../templates/ContentPage'

function DropZoneExample({ isDisabled }: { isDisabled: boolean }) {
  const helpId = useId()
  return (
    <DropZone isDisabled={isDisabled} aria-describedby={helpId}>
      <PlaceholderIcon aria-hidden="true" />
      <Text slot="label">{dropZoneExampleLabels.label}</Text>
      <p id={helpId}>{dropZoneExampleLabels.help}</p>
      <FileTrigger>
        <Button hierarchy="secondary" aria-describedby={helpId}>{dropZoneExampleLabels.button}</Button>
      </FileTrigger>
    </DropZone>
  )
}

export default function DropZonePage() {
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <ContentPage
      content={dropZoneContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={dropZoneExampleCode(isDisabled)}
            endPanel={<Checkbox isSelected={isDisabled} onChange={setIsDisabled}>{dropZoneDisabledLabel}</Checkbox>}
          >
            <DropZoneExample isDisabled={isDisabled} />
          </DemoArea>
        ),
      }}
    />
  )
}
