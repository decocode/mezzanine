// The example for the Layer groups page, in Foundations › Layers.
import { useState, type CSSProperties } from 'react'
import { DemoArea } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { layerGroupsCssNotes } from './layerGroupsContent'

// A layer inside a layer group, showing its own z-index.
function GroupLayer({ z, step }: { z: number; step: number }) {
  return <div className="layers-group-layer mz-text-body-sm" style={{ '--_layer-z': z, '--_layer-step': step } as CSSProperties}>Layer, z-index: {z}</div>
}

export function LayerGroupsExample() {
  const [grouped, setGrouped] = useState(true)
  return <>
    <ExampleText>Layer group A has three layers. Layer group B has two. Because the z-index of layer group B is higher, it’s placed on top of layer group A. Inside each layer group, the layers are ordered amongst themselves. But if you remove the layer groups, all five layers end up jumbled together, because some share the same z-index values.</ExampleText>
    <DemoArea align="stretch" codeLanguage="css" codeView={layerGroupsCssNotes.stackingContexts.code} endPanel={<PanelSwitch isSelected={grouped} onChange={setGrouped}>Group the layers</PanelSwitch>}>
      <div className="layers-groups">
        <div className={`layers-group ${grouped ? 'layers-group-a-grouped' : 'layers-group-loose'}`}>
          {grouped ? <p className="mz-text-label-md">Layer group A, z-index: 1</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
          <GroupLayer z={1} step={0} />
          <GroupLayer z={2} step={1} />
          <GroupLayer z={3} step={2} />
        </div>
        <div className={`layers-group layers-group-b ${grouped ? 'layers-group-b-grouped' : 'layers-group-loose'}`}>
          {grouped ? <p className="mz-text-label-md">Layer group B, z-index: 2</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
          <GroupLayer z={1} step={0} />
          <GroupLayer z={2} step={1} />
        </div>
      </div>
    </DemoArea>
    <CssNotes name="the layer groups" note={layerGroupsCssNotes.stackingContexts} level={3} showCode={false} />
  </>
}
