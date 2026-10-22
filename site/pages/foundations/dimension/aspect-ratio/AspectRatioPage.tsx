import { aspectRatioContent } from './aspectRatioContent'
import { AspectRatioExample } from './AspectRatioExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './aspectRatio.css'

export default function AspectRatioPage() {
  return <ContentPage content={aspectRatioContent} parts={{ example: <div className="example-stack"><AspectRatioExample /></div> }} />
}
