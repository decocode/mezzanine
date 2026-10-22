import { rowWrapContent } from './rowWrapContent'
import { RowWrapExample } from './RowWrapExample'
import { ContentPage } from '../../../../../templates/ContentPage'
import '../sideBySide.css'

export default function RowWrapPage() {
  return <ContentPage content={rowWrapContent} parts={{ example: <div className="example-stack"><RowWrapExample /></div> }} />
}
