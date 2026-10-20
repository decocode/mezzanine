import { supportsContent } from './supportsContent'
import { SupportsExample } from './SupportsExample'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SupportsPage() {
  return <ContentPage content={supportsContent} parts={{ example: <div className="example-stack"><SupportsExample /></div> }} />
}
