import { containerQueriesContent } from './containerQueriesContent'
import { OneSlotExample, TwoSlotsExample } from './ContainerQueriesExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './containerQueries.css'

export default function ContainerQueriesPage() {
  return (
    <ContentPage
      content={containerQueriesContent}
      parts={{
        twoSlots: <div className="example-stack"><TwoSlotsExample /></div>,
        oneSlot: <div className="example-stack"><OneSlotExample /></div>,
      }}
    />
  )
}
