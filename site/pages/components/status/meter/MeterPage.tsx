import { Meter } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { meterContent } from './meterContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MeterPage() {
  return <ContentPage content={meterContent} parts={{ example: <ExampleZone><Meter label="Meter A" value={35} /></ExampleZone> }} />
}
