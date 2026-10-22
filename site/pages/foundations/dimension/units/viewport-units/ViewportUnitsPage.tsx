import { viewportUnitsContent } from './viewportUnitsContent'
import { ViewportUnitsExample } from './ViewportUnitsExample'
import { ContentPage } from '../../../../../templates/ContentPage'
import './viewportUnits.css'

export default function ViewportUnitsPage() {
  return <ContentPage content={viewportUnitsContent} parts={{ example: <div className="example-stack"><ViewportUnitsExample /></div> }} />
}
