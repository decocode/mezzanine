import { readingOrderContent } from './readingOrderContent'
import { ReadingOrderExample } from './ReadingOrderExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../sideBySide.css'

export default function ReadingOrderPage() {
  return <ContentPage content={readingOrderContent} parts={{ example: <div className="example-stack"><ReadingOrderExample /></div> }} />
}
