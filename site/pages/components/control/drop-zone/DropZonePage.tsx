import { DropZone, Text } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { dropZoneContent, dropZoneExampleLabel } from './dropZoneContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DropZonePage() {
  return <ContentPage content={dropZoneContent} parts={{ example: <ExampleZone><DropZone><Text slot="label">{dropZoneExampleLabel}</Text></DropZone></ExampleZone> }} />
}
