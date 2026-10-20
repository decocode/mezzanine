import { opacityContent, opacityLevels } from './opacityContent'
import { TokenScale } from '../../../components/TokenScale'
import { ContentPage } from '../../../templates/ContentPage'

export default function OpacityPage() {
  return (
    <ContentPage
      content={opacityContent}
      parts={{
        opacityScale: <TokenScale items={opacityLevels} sample="opacity" />,
      }}
    />
  )
}
