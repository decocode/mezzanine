import { safeAreasContent } from './safeAreasContent'
import { SafeAreasExample } from './SafeAreasExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './safeAreas.css'

export default function SafeAreasPage() {
  return <ContentPage content={safeAreasContent} parts={{ example: <div className="example-stack"><SafeAreasExample /></div> }} />
}
