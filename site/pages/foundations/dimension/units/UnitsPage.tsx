import { unitsContent } from './unitsContent'
import { FourUnitsExample } from './UnitsExamples'
import { ViewportUnitsExample } from './ViewportUnitsExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './units.css'

export default function UnitsPage() {
  return (
    <ContentPage
      content={unitsContent}
      parts={{
        fourUnits: <div className="example-stack"><FourUnitsExample /></div>,
        viewportUnits: <div className="example-stack"><ViewportUnitsExample /></div>,
      }}
    />
  )
}
