import { widthLevels, widthContent } from './widthContent'
import { TokenScale } from '../../../../../components/TokenScale'
import { ContentPage } from '../../../../../templates/ContentPage'
import './widthScale.css'

export default function WidthPage() {
  return (
    <ContentPage
      content={widthContent}
      parts={{
        sharedWidths: (
          <div className="width-scale">
            <TokenScale items={widthLevels} sample="length" labelInSample />
          </div>
        ),
      }}
    />
  )
}
