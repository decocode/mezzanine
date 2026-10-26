// The example for the Reel page, in Foundations › Layout. The items are Cards.
import { DemoArea } from '@decocode/mezzanine'
import { CssNotes, ExampleCard, ExampleText } from '../../../../components/ExampleParts'
import { reelCssNotes, reelExampleText } from './reelContent'

export function ReelExample() {
  return <>
    <ExampleText>{reelExampleText}</ExampleText>
    {/* A scrolling area is a named region that takes focus, so keyboard users can scroll it. */}
    <DemoArea align="stretch" codeLanguage="css" codeView={reelCssNotes.reel.code}>
      <div className="example-reel" role="region" aria-label="Example reel" tabIndex={0}>
        {Array.from({ length: 8 }, (_, index) => <ExampleCard key={index} title={`Item ${String.fromCharCode(65 + index)}`} headingLevel={3} />)}
      </div>
    </DemoArea>
    <CssNotes name="Reel" note={reelCssNotes.reel} level={3} showCode={false} />
  </>
}
