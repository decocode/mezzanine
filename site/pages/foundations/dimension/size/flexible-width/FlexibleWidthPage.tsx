import { widthLevels, flexibleWidthContent } from './flexibleWidthContent'
import { TokenScale } from '../../../../../components/TokenScale'
import { ContentPage } from '../../../../../templates/ContentPage'
import './widthScale.css'

export default function FlexibleWidthPage() {
  return (
    <ContentPage
      content={flexibleWidthContent}
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
