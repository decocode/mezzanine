import { layerGroupsContent } from './layerGroupsContent'
import { LayerGroupsExample } from './LayerGroupsExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../layers.css'

export default function LayerGroupsPage() {
  return <ContentPage content={layerGroupsContent} parts={{ example: <div className="layers-example"><LayerGroupsExample /></div> }} />
}
