import { DemoArea, Meter } from '@decocode/mezzanine'
import { meterContent } from './meterContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MeterPage() {
  return <ContentPage content={meterContent} parts={{ example: <DemoArea align="stretch"><Meter label="Meter A" value={35} /></DemoArea> }} />
}
