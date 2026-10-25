// The example for the Lab's Field sizing page, in Emerging features.
import { DemoArea, Label, TextArea, TextField } from '@decocode/mezzanine'
import { CssNotes, ExampleText, FeatureStatus } from '../../shared/LabParts'
import { supportsCss } from '../../shared/labLogic'
import { fieldSizingCssNotes } from './fieldSizingContent'

export function FieldSizingExample() {
  const fieldSizing = supportsCss('field-sizing', 'content')
  return <>
    <ExampleText>One line of CSS, field-sizing: content, makes the field grow as you type, instead of scrolling inside itself. It’s been available in every major browser since June 2026. This is the real Mezzanine TextArea with that one Lab rule added.</ExampleText>
    <FeatureStatus supported={fieldSizing} />
    <DemoArea align="stretch" codeView={fieldSizingCssNotes.fieldSizing.code}>
      <TextField className="lab-field-sizing">
        <Label>Type a few lines</Label>
        <TextArea />
      </TextField>
    </DemoArea>
    <CssNotes name="the growing field" note={fieldSizingCssNotes.fieldSizing} level={3} showCode={false} />
  </>
}
