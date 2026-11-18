import { useId, useState } from 'react'
import { Button, DemoBlock, DropZone, FileTrigger, PlaceholderIcon, Switch, Text } from '@decocode/mezzanine'
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
          <DemoBlock
            align="stretch"
            codeView={dropZoneExampleCode(isDisabled)}
            endPanel={<Switch isSelected={isDisabled} onChange={setIsDisabled}>{dropZoneDisabledLabel}</Switch>}
          >
            <DropZoneExample isDisabled={isDisabled} />
          </DemoBlock>
        ),
      }}
    />
  )
}
