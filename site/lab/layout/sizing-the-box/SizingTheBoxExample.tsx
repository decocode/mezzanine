// The example for the Lab's Sizing the box page, in Layout. Plain items are the concept here, so
// they keep the accent styling.
import { DemoArea, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../shared/LabParts'
import { Stack } from '../../shared/LabPrimitives'
import { sizingTheBoxCssNotes } from './sizingTheBoxContent'

export function SizingTheBoxExample() {
  return <>
    <ExampleText>Both boxes are given the same width. The first ends up wider, because its padding and border are added on top.</ExampleText>
    <DemoArea align="stretch" codeView={sizingTheBoxCssNotes.boxSizing.code}>
      <Stack>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: content-box</Text><div className="lab-sizing-box lab-sizing-content-box mz-text-body-sm">12rem of content, plus padding and border</div></div>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: border-box</Text><div className="lab-sizing-box lab-sizing-border-box mz-text-body-sm">12rem in total</div></div>
      </Stack>
    </DemoArea>
    <CssNotes name="box-sizing" note={sizingTheBoxCssNotes.boxSizing} level={3} showCode={false} />
  </>
}
