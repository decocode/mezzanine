import { positioningContent } from './positioningContent'
import { PositioningExample } from './PositioningExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../layers.css'

export default function PositioningPage() {
  return <ContentPage content={positioningContent} parts={{ example: <div className="layers-example"><PositioningExample /></div> }} />
}
