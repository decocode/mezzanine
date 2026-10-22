import { stylePriorityContent } from './stylePriorityContent'
import { StylePriorityExample } from './StylePriorityExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './stylePriority.css'

export default function StylePriorityPage() {
  return <ContentPage content={stylePriorityContent} parts={{ example: <div className="example-stack"><StylePriorityExample /></div> }} />
}
