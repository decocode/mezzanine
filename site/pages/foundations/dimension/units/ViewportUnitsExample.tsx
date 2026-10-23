// The Units page's viewport example, in Foundations › Dimension: the screen height in four units.
import { useRef } from 'react'
import { CodeBlock } from '@decocode/mezzanine'
import { useProbeHeights } from '../../../../components/browserLogic'
import { DocsTable } from '../../../../components/DocsTable'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { unitsCssNotes } from './unitsContent'

const probes = [
  { label: '100vh', className: 'example-probe-vh' },
  { label: '100svh', className: 'example-probe-svh' },
  { label: '100lvh', className: 'example-probe-lvh' },
  { label: '100dvh', className: 'example-probe-dvh' },
]

export function ViewportUnitsExample() {
  const container = useRef<HTMLDivElement>(null)
  const heights = useProbeHeights(container)
  return <>
    <ExampleText>Every page needs this tag in its HTML. Without it, phones pretend to be a wide screen and shrink the whole page to fit, so viewport units would measure that pretend screen instead of the real one.</ExampleText>
    <CodeBlock language="html">{'<meta name="viewport" content="width=device-width, initial-scale=1">'}</CodeBlock>
    <ExampleText>On a laptop the four heights match. On a phone they differ once the browser’s toolbar hides: svh and lvh stay apart, and dvh changes.</ExampleText>
    <div ref={container} className="example-probes" aria-hidden="true">
      {probes.map((probe) => <div key={probe.label} data-probe={probe.label} className={probe.className} />)}
    </div>
    {heights.length > 0 && <DocsTable
      aria-label="Viewport heights"
      nameColumn="Measurement"
      descriptionColumn="Height"
      rows={heights.map((item) => ({ name: item.label, description: `${item.pixels}px` }))}
    />}
    <CssNotes name="the measurements" note={unitsCssNotes.viewport} level={3} />
  </>
}
