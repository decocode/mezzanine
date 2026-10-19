// The example for the Lab's Reel page, in Side by side.
import { RichText } from '../../../../components/RichText'
import { CssNotes, ExampleText } from '../../../shared/LabParts'
import { Block, Reel } from '../../../shared/LabPrimitives'
import { reelCssNotes, reelExampleLinkText } from './reelContent'

export function ReelExample() {
  return <>
    <ExampleText><RichText text={reelExampleLinkText} /></ExampleText>
      <Reel label="Example reel">
        {Array.from({ length: 8 }, (_, index) => <Block key={index}>Item {index + 1}</Block>)}
      </Reel>
    <CssNotes name="Reel" note={reelCssNotes.reel} level={3} />
  </>
}
