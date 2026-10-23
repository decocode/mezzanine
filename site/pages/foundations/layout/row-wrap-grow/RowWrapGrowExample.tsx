// The example for the Row wrap grow page, in Foundations › Layout. The items are Cards.
import { CssNotes, ExampleCard } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { rowWrapGrowCssNotes } from './rowWrapGrowContent'

export function RowWrapGrowExample() {
  return <>
    <WidthDemo label="Row wrap grow" code={rowWrapGrowCssNotes.rowWrapGrow.code}>
      <div className="example-row-wrap-grow">
        {['A', 'B', 'C', 'D'].map((letter) => <ExampleCard key={letter} title={`Item ${letter}`} headingLevel={3} />)}
      </div>
    </WidthDemo>
    <CssNotes name="Row wrap grow" note={rowWrapGrowCssNotes.rowWrapGrow} level={3} showCode={false} />
  </>
}
