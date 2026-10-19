// The example for the Lab's Center page, in Box basics.
import { CssNotes, ExampleFrame, ExampleText } from '../../../shared/LabParts'
import { Block, Center } from '../../../shared/LabPrimitives'
import { centerCssNotes } from './centerContent'

export function CenterExample() {
  return <>
    <ExampleText>However wide the frame gets, the block stays in the middle and never grows past 24rem.</ExampleText>
    <ExampleFrame label="Center">
      <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
    </ExampleFrame>
    <CssNotes name="Center" note={centerCssNotes.center} level={3} />
  </>
}
