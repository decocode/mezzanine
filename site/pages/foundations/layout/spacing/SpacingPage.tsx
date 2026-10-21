import { spacingContent, spacingRoleLevels, spacingScaleLevels } from './spacingContent'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SpacingPage() {
  return (
    <ContentPage
      content={spacingContent}
      parts={{
        spacingRoles: <TokenScale items={spacingRoleLevels} sample="length" />,
        spacingScale: <TokenScale items={spacingScaleLevels} sample="length" />,
      }}
    />
  )
}
