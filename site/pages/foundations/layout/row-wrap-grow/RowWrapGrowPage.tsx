import { rowWrapGrowContent } from './rowWrapGrowContent'
import { RowWrapGrowExample } from './RowWrapGrowExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../sideBySide.css'

export default function RowWrapGrowPage() {
  return <ContentPage content={rowWrapGrowContent} parts={{ example: <div className="example-stack"><RowWrapGrowExample /></div> }} />
}
