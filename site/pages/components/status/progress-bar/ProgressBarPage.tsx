import { ProgressBar } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { progressBarContent } from './progressBarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ProgressBarPage() {
  return (
    <ContentPage
      content={progressBarContent}
      parts={{
        example: <ExampleZone><ProgressBar label="Progress A" value={60} /></ExampleZone>,
        variants: <ExampleZone><ProgressBar label="Progress B" isIndeterminate /></ExampleZone>,
      }}
    />
  )
}
