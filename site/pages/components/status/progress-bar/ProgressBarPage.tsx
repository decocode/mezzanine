import { DemoArea, ProgressBar } from '@decocode/mezzanine'
import { progressBarContent } from './progressBarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ProgressBarPage() {
  return (
    <ContentPage
      content={progressBarContent}
      parts={{
        example: <DemoArea><ProgressBar label="Progress A" value={60} /></DemoArea>,
        variants: <DemoArea><ProgressBar label="Progress B" isIndeterminate /></DemoArea>,
      }}
    />
  )
}
