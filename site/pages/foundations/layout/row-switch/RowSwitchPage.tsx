import { rowSwitchContent } from './rowSwitchContent'
import { RowSwitchExample } from './RowSwitchExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../sideBySide.css'

export default function RowSwitchPage() {
  return <ContentPage content={rowSwitchContent} parts={{ example: <div className="example-stack"><RowSwitchExample /></div> }} />
}
