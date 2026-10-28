// The example for the Stack page, in Foundations › Layout. The items are Cards.
import { CssNotes, ExampleCard, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { stackCssNotes } from './stackContent'

export function StackExample() {
  return <>
    <ExampleText>Three items, one above another, with the same space between each.</ExampleText>
    <WidthDemo label="Stack" code={stackCssNotes.stack.code}>
      <div className="stack">
        {['Item A', 'Item B', 'Item C'].map((item) => <ExampleCard key={item} title={item} headingLevel={3} />)}
      </div>
    </WidthDemo>
    <CssNotes name="Stack" note={stackCssNotes.stack} level={3} showCode={false} />
  </>
}
