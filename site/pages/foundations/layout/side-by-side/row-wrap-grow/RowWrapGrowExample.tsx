// The example for the Row wrap grow page, in Foundations › Layout › Side by side.
import { CssNotes } from '../../../../../components/ExampleParts'
import { WidthDemo } from '../../../../../components/WidthFrame'
import { rowWrapGrowCssNotes } from './rowWrapGrowContent'

export function RowWrapGrowExample() {
  return <>
    <WidthDemo label="Row wrap grow" code={rowWrapGrowCssNotes.rowWrapGrow.code}>
      <div className="example-row-wrap-grow">
        {['A', 'B', 'C', 'D'].map((letter) => <div key={letter} className="example-item example-item-tall mz-text-body-sm">{`Item ${letter}`}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="Row wrap grow" note={rowWrapGrowCssNotes.rowWrapGrow} level={3} showCode={false} />
  </>
}
