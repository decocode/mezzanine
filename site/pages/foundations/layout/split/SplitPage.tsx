import { splitContent } from './splitContent'
import { SplitExample } from './SplitExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './split.css'

export default function SplitPage() {
  return <ContentPage content={splitContent} parts={{ example: <div className="example-stack"><SplitExample /></div> }} />
}
