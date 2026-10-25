import { DemoArea, Slider } from '@decocode/mezzanine'
import { sliderContent } from './sliderContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SliderPage() {
  return (
    <ContentPage
      content={sliderContent}
      parts={{
        example: <DemoArea align="stretch"><Slider label="Slider A" defaultValue={40} /></DemoArea>,
        variants: <DemoArea align="stretch"><Slider label="Range A" defaultValue={[20, 70]} thumbLabels={['Minimum', 'Maximum']} /></DemoArea>,
      }}
    />
  )
}
