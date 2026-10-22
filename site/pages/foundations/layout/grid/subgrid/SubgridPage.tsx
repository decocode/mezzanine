import { subgridContent } from './subgridContent'
import { SubgridExample } from './SubgridExample'
import { ContentPage } from '../../../../../templates/ContentPage'
import './subgrid.css'

export default function SubgridPage() {
  return <ContentPage content={subgridContent} parts={{ example: <div className="example-stack"><SubgridExample /></div> }} />
}
