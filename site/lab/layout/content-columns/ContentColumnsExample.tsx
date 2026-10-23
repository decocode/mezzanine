// The example for the Lab's Content columns page, in Layout. The items are lines of text, which
// is what multi-column layout is for.
import { CssNotes, WidthDemo } from '../../shared/LabParts'
import { contentColumnsCssNotes } from './contentColumnsContent'

export function ContentColumnsExample() {
  return <>
    <WidthDemo label="Content columns" code={contentColumnsCssNotes.contentColumns.code}>
      <ul className="lab-content-columns mz-text-body-md">
        {Array.from({ length: 12 }, (_, index) => <li key={index}>{`Item ${String.fromCharCode(65 + index)}`}</li>)}
      </ul>
    </WidthDemo>
    <CssNotes name="Content columns" note={contentColumnsCssNotes.contentColumns} level={3} showCode={false} />
  </>
}
