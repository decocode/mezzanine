import { Slider } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { sliderContent } from './sliderContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SliderPage() {
  return (
    <ContentPage
      content={sliderContent}
      parts={{
        example: <ExampleZone><Slider label="Slider A" defaultValue={40} /></ExampleZone>,
        variants: <ExampleZone><Slider label="Range A" defaultValue={[20, 70]} thumbLabels={['Minimum', 'Maximum']} /></ExampleZone>,
      }}
    />
  )
}
