// The example for the Lab's Center page, in Layout. The item is a Card.
import { CssNotes, ExampleCard, ExampleText, WidthDemo } from '../../shared/LabParts'
import { Center } from '../../shared/LabPrimitives'
import { centerCssNotes } from './centerContent'

export function CenterExample() {
  return <>
    <ExampleText>However wide the frame gets, the block stays in the middle and never grows past 24rem.</ExampleText>
    <WidthDemo label="Center" code={centerCssNotes.center.code}>
      <Center max="24rem"><ExampleCard title="Item A" text="Centred, never wider than 24rem" headingLevel={3} /></Center>
    </WidthDemo>
    <CssNotes name="Center" note={centerCssNotes.center} level={3} showCode={false} />
  </>
}
