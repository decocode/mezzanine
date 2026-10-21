import { sizeContent, widthLevels } from './sizeContent'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'
import './size.css'

export default function SizePage() {
  return (
    <ContentPage
      content={sizeContent}
      parts={{
        widths: (
          <div className="size-widths">
            <TokenScale items={widthLevels} sample="length" />
          </div>
        ),
      }}
    />
  )
}
