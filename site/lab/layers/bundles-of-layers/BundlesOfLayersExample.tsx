// The example for the Lab's Bundles of layers page, in Layers.
import { useState, type CSSProperties } from 'react'
import { Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText } from '../../shared/LabParts'
import { bundlesOfLayersCssNotes } from './bundlesOfLayersContent'

// A layer inside a bundle, showing its own z-index.
function BundleLayer({ z, step }: { z: number; step: number }) {
  return <div className="lab-bundle-layer mz-text-body-sm" style={{ '--lab-layer-z': z, '--lab-layer-step': step } as CSSProperties}>Layer, z-index: {z}</div>
}

export function BundlesOfLayersExample() {
  const [grouped, setGrouped] = useState(true)
  return <>
    <ExampleHeading>Example</ExampleHeading>
    <ExampleText>Bundle A consists of three layers. Bundle B is two layers. Because the z-index of Bundle B is higher, it’s placed on top of Bundle A. Inside each bundle the layers are ordered amongst themselves. But if you remove the bundles, all five layers end up jumbled together, because some share the same z-index values.</ExampleText>
    <Checkbox isSelected={grouped} onChange={setGrouped}>Bundle the layers</Checkbox>
    <div className="lab-bundles">
      <div className={`lab-bundle ${grouped ? 'lab-bundle-a-grouped' : 'lab-bundle-loose'}`}>
        {grouped ? <p className="mz-text-label-md">Bundle A, z-index: 1</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
        <BundleLayer z={1} step={0} />
        <BundleLayer z={2} step={1} />
        <BundleLayer z={3} step={2} />
      </div>
      <div className={`lab-bundle lab-bundle-b ${grouped ? 'lab-bundle-b-grouped' : 'lab-bundle-loose'}`}>
        {grouped ? <p className="mz-text-label-md">Bundle B, z-index: 2</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
        <BundleLayer z={1} step={0} />
        <BundleLayer z={2} step={1} />
      </div>
    </div>
    <CssNotes name="the bundles" note={bundlesOfLayersCssNotes.stackingContexts} level={3} />
  </>
}
