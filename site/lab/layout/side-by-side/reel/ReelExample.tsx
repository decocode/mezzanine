// The example for the Lab's Reel page, in Side by side.
import { Link } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../shared/LabParts'
import { Block, Reel } from '../../../shared/LabPrimitives'
import { reelCssNotes } from './reelContent'

export function ReelExample() {
  return <>
    <ExampleText>The reel scrolls sideways. Keyboard users reach it with Tab and scroll it with the arrow keys. The scrolling comes from overflow: see <Link href="/site/lab/layout/inside-the-box/overflowing-the-box">Overflowing the box</Link>.</ExampleText>
      <Reel label="Example reel">
        {Array.from({ length: 8 }, (_, index) => <Block key={index}>Item {index + 1}</Block>)}
      </Reel>
    <CssNotes name="Reel" note={reelCssNotes.reel} level={3} />
  </>
}
