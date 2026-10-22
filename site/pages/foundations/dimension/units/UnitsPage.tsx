import { unitsContent } from './unitsContent'
import { FourUnitsExample, WithinLimitsExample } from './UnitsExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './units.css'

export default function UnitsPage() {
  return (
    <ContentPage
      content={unitsContent}
      parts={{
        fourUnits: <div className="example-stack"><FourUnitsExample /></div>,
        withinLimits: <div className="example-stack"><WithinLimitsExample /></div>,
      }}
    />
  )
}
