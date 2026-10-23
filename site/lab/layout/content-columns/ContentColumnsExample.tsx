// The example for the Lab's Content columns page, in Inside the box.
import { CssNotes, ExampleFrame } from '../../../shared/LabParts'
import { contentColumnsCssNotes } from './contentColumnsContent'

export function ContentColumnsExample() {
  return <>
    <ExampleFrame label="Content columns" initialWidth={900}>
        <ul className="lab-content-columns mz-text-body-md">
          {Array.from({ length: 12 }, (_, index) => <li key={index}>Item {index + 1}</li>)}
        </ul>
    </ExampleFrame>
    <CssNotes name="Content columns" note={contentColumnsCssNotes.contentColumns} level={3} />
  </>
}
