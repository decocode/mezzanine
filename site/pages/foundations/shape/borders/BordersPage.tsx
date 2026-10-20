import { bordersContent } from './bordersContent'
import { borderWidthLevels } from '../shapeContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'

// Puts live values into the {name} placeholders in the section introductions.
export default function BordersPage() {
  const baseline = useTokenValue('--border-width-baseline')
  return (
    <ContentPage
      content={withValues(bordersContent, { baseline })}
      parts={{
        borderWidth: <TokenScale items={borderWidthLevels} sample="border-width" />,
      }}
    />
  )
}
