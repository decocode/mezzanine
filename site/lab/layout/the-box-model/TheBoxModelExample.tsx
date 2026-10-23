// The example for the Lab's The box model page, in Layout. A plain item is the concept here, so it
// keeps the accent styling, and the dashed line marks where its margin ends.
import { DemoArea } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../shared/LabParts'
import { theBoxModelCssNotes } from './theBoxModelContent'

export function TheBoxModelExample() {
  return <>
    <ExampleText>The box, with each part drawn so you can see it.</ExampleText>
    <ul className="lab-legend mz-text-body-md">
      <li>Content: the innermost box, holding the word “Content”.</li>
      <li>Padding: the shaded space between the content and the thick line.</li>
      <li>Border: the thick line.</li>
      <li>Margin: the empty space between the thick line and the dashed line.</li>
    </ul>
    <DemoArea codeView={theBoxModelCssNotes.boxAnatomy.code}>
      <div className="lab-box-margin-area">
        <div className="lab-box-anatomy">
          <div className="lab-box-content mz-text-body-md">Content</div>
        </div>
      </div>
    </DemoArea>
    <CssNotes name="the four parts" note={theBoxModelCssNotes.boxAnatomy} level={3} showCode={false} />
  </>
}
