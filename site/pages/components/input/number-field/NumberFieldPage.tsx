import { NumberField } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { numberFieldContent, numberFieldExampleLabel } from './numberFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function NumberFieldPage() {
  return <ContentPage content={numberFieldContent} parts={{ example: <ExampleZone><NumberField label={numberFieldExampleLabel} defaultValue={4} minValue={0} /></ExampleZone> }} />
}
