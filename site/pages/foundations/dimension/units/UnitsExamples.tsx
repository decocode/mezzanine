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

export function WithinLimitsExample() {
  return <>
    <ExampleText>This item tries to be half the frame, but it stops shrinking at 10rem and stops growing at 30rem.</ExampleText>
    <WidthFrame label="Grow, but within limits">
      <div className="example-item example-clamp mz-text-body-sm">Half the frame, between 10rem and 30rem</div>
    </WidthFrame>
    <CssNotes name="clamp()" note={unitsCssNotes.withinLimits} level={3} />
  </>
}
