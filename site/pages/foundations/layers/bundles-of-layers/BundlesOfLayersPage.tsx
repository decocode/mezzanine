import { bundlesOfLayersContent } from './bundlesOfLayersContent'
import { BundlesOfLayersExample } from './BundlesOfLayersExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../layers.css'

export default function BundlesOfLayersPage() {
  return <ContentPage content={bundlesOfLayersContent} parts={{ example: <div className="layers-example"><BundlesOfLayersExample /></div> }} />
}
