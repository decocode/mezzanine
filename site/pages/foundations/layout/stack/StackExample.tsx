// The example for the Stack page, in Foundations › Layout.
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { stackCssNotes } from './stackContent'

export function StackExample() {
  return <>
    <ExampleText>Three items, one above another, with the same space between each.</ExampleText>
    <WidthDemo label="Stack" code={stackCssNotes.stack.code}>
      <div className="example-stack-pattern">
        {['Item one', 'Item two', 'Item three'].map((item) => <div key={item} className="example-item mz-text-body-sm">{item}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="Stack" note={stackCssNotes.stack} level={3} showCode={false} />
  </>
}
