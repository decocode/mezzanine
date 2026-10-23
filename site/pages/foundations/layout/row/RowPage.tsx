import { rowContent } from './rowContent'
import { RowExample } from './RowExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../sideBySide.css'

export default function RowPage() {
  return <ContentPage content={rowContent} parts={{ example: <div className="example-stack"><RowExample /></div> }} />
}
