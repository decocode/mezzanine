import { orderingLayersContent } from './orderingLayersContent'
import { OrderingLayersExample } from './OrderingLayersExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../layers.css'

export default function OrderingLayersPage() {
  return <ContentPage content={orderingLayersContent} parts={{ example: <div className="layers-example"><OrderingLayersExample /></div> }} />
}
