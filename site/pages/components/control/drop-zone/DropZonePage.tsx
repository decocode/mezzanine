import { useId } from 'react'
import { Button, DropZone, FileTrigger, PlaceholderIcon, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { dropZoneContent, dropZoneExampleLabels } from './dropZoneContent'
import { ContentPage } from '../../../../templates/ContentPage'

function DropZoneExample() {
  const helpId = useId()
  return (
    <DropZone aria-describedby={helpId}>
      <PlaceholderIcon aria-hidden="true" />
      <Text slot="label">{dropZoneExampleLabels.label}</Text>
      <p id={helpId}>{dropZoneExampleLabels.help}</p>
      <FileTrigger>
        <Button variant="secondary" aria-describedby={helpId}>{dropZoneExampleLabels.button}</Button>
      </FileTrigger>
    </DropZone>
  )
}

export default function DropZonePage() {
  return <ContentPage content={dropZoneContent} parts={{ example: <ExampleZone><DropZoneExample /></ExampleZone> }} />
}
