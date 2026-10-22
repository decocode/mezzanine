import { reelContent } from './reelContent'
import { ReelExample } from './ReelExample'
import { ContentPage } from '../../../../../templates/ContentPage'
import '../sideBySide.css'

export default function ReelPage() {
  return <ContentPage content={reelContent} parts={{ example: <div className="example-stack"><ReelExample /></div> }} />
}
