import { spacingScaleContent, spacingScaleLevels } from './spacingScaleContent'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SpacingScalePage() {
  return <ContentPage content={spacingScaleContent} parts={{ spacingScale: <TokenScale items={spacingScaleLevels} sample="length" /> }} />
}
