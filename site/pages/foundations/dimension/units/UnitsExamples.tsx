// The examples for the Units page, in Foundations › Dimension.
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { RichText } from '../../../../components/RichText'
import { WidthFrame } from '../../../../components/WidthFrame'
import { fourUnitsText, unitsCssNotes } from './unitsContent'

const bars = [
  { className: 'example-unit-px', label: '160px' },
  { className: 'example-unit-rem', label: '10rem' },
  { className: 'example-unit-percent', label: '50% of the frame' },
  { className: 'example-unit-vw', label: '30vw: 30% of the window' },
]

export function FourUnitsExample() {
  return <>
    <ExampleText><RichText text={fourUnitsText} /></ExampleText>
    {/* The vw bar ignores the frame, so it can stick out, and the frame scrolls. */}
    <WidthFrame label="Four units" canOverflow>
      <div className="example-stack">
        {bars.map((bar) => <div key={bar.label} className={`example-item ${bar.className} mz-text-body-sm`}>{bar.label}</div>)}
      </div>
    </WidthFrame>
    <CssNotes name="the units" note={unitsCssNotes.fourUnits} level={3} />
  </>
}
