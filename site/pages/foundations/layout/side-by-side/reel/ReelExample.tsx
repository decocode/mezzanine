// The example for the Reel page, in Foundations › Layout › Side by side.
import { DemoArea } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../../components/ExampleParts'
import { reelCssNotes, reelExampleText } from './reelContent'

export function ReelExample() {
  return <>
    <ExampleText>{reelExampleText}</ExampleText>
    {/* A scrolling area is a named region that takes focus, so keyboard users can scroll it. */}
    <DemoArea codeView={reelCssNotes.reel.code}>
      <div className="example-reel" role="region" aria-label="Example reel" tabIndex={0}>
        {Array.from({ length: 8 }, (_, index) => <div key={index} className="example-item mz-text-body-sm">{`Item ${index + 1}`}</div>)}
      </div>
    </DemoArea>
    <CssNotes name="Reel" note={reelCssNotes.reel} level={3} showCode={false} />
  </>
}
