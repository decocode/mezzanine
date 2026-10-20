import { spacingScaleSteps } from './spacingContent'
import { TokenScale } from '../../../../components/TokenScale'

// Every spacing token as a bar of its length, labelled with its usual pixel size.
const spacingLevels = spacingScaleSteps.map((step) => ({ token: `--space-${step}`, label: `${step * 4}px` }))

export function SpacingScale() {
  return <TokenScale items={spacingLevels} sample="length" />
}
