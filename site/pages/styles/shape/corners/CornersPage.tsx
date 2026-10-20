import { cornersContent } from './cornersContent'
import { radiusLevels } from '../shapeContent'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CornersPage() {
  return (
    <ContentPage
      content={cornersContent}
      parts={{
        cornerRadius: <TokenScale items={radiusLevels} sample="radius" />,
      }}
    />
  )
}
