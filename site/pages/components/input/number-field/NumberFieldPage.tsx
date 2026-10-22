import { DemoArea, NumberField } from '@decocode/mezzanine'
import { numberFieldContent, numberFieldExampleLabel } from './numberFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function NumberFieldPage() {
  return <ContentPage content={numberFieldContent} parts={{ example: <DemoArea><NumberField label={numberFieldExampleLabel} defaultValue={4} minValue={0} /></DemoArea> }} />
}
