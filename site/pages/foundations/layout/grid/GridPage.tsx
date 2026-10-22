import { gridContent } from './gridContent'
import { AsManyColumnsAsFitExample, GridExample, SetNumberOfColumnsExample } from './GridExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './grid.css'

export default function GridPage() {
  return (
    <ContentPage
      content={gridContent}
      parts={{
        example: <div className="example-stack"><GridExample /></div>,
        setNumberOfColumns: <div className="example-stack"><SetNumberOfColumnsExample /></div>,
        asManyColumnsAsFit: <div className="example-stack"><AsManyColumnsAsFitExample /></div>,
      }}
    />
  )
}
