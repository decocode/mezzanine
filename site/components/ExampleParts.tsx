import type { ReactNode } from 'react'
import { Card, CodeBlock, Heading, Label, RadioButton, RadioField, RadioGroup, SelectionIndicator, Text } from '@decocode/mezzanine'
import { RichText } from './RichText'

// The CSS behind an example: plain-English notes and the rules themselves, quoted from the page's
// stylesheet. A browser test checks that each quote still matches its stylesheet.
export interface CssNote {
  // Copy with `code`, **strong** and [label](href) markers, like the page's content. A paragraph can also be a
  // bulleted list, as in a page's sections.
  paragraphs: (string | { list: string[] })[]
  code: string
  // True when the code is an example for apps rather than the rules this page uses.
  isExample?: boolean
}

// The explanation that goes with an example.
export function ExampleText({ children }: { children: ReactNode }) {
  return <Text elementType="p" className="example-text mz-text-body-md">{children}</Text>
}

// The notes and code for one CssNote, without a heading. Without showCode, the code is left out, for an
// example whose DemoArea already shows it in its Code tab.
export function CssNotesBody({ note, showCode = true }: { note: CssNote; showCode?: boolean }) {
  return <div className="css-notes-body">
    {note.isExample && <Text elementType="p" className="mz-text-body-md">This CSS is for an app to use; the example on this page doesn’t use it.</Text>}
    {note.paragraphs.map((paragraph, index) => typeof paragraph === 'string'
      ? <Text key={index} elementType="p" className="mz-text-body-md"><RichText text={paragraph} /></Text>
      : <ul key={index} className="mz-text-body-md">{paragraph.list.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>)}
    {showCode && <CodeBlock language="css">{note.code}</CodeBlock>}
  </div>
}

// The same notes under their own heading: level 4 under an example's heading, level 3 on a page
// with a single example under a section heading, or level 2 directly under the page title.
export function CssNotes({ name, note, level = 4, showCode = true }: { name: string; note: CssNote; level?: 2 | 3 | 4; showCode?: boolean }) {
  const className = level === 2 ? 'css-notes-heading mz-text-heading-md' : level === 3 ? 'css-notes-heading mz-text-heading-sm' : 'mz-text-title-md'
  return <div className="css-notes">
    <Heading level={level} className={className}>The CSS behind {name}</Heading>
    <CssNotesBody note={note} showCode={showCode} />
  </div>
}

// A Card with an image's place, a heading and a line of text, like a real card, for layout examples. The
// heading level fits where the example sits on its page.
export function ExampleCard({ title, text = 'Supporting text for the card.', headingLevel, className }: { title: string; text?: string; headingLevel: 3 | 4; className?: string }) {
  return <Card className={className}>
    <div className="example-item example-card-image mz-text-body-sm">Image</div>
    <Heading level={headingLevel}>{title}</Heading>
    <Text elementType="p" className="mz-text-body-md">{text}</Text>
  </Card>
}

// A choice of one CSS value for an example, such as position: sticky, as a radio group in a DemoArea's
// Properties panel: the options stack in a short list that fits the narrow panel, all visible at once.
export function PanelPicker<Value extends string>({ label, options, value, onChange }: { label: string; options: readonly { label: string; value: Value }[]; value: Value; onChange: (value: Value) => void }) {
  return <RadioGroup value={value} onChange={(next) => { const option = options.find((item) => item.value === next); if (option) onChange(option.value) }}>
    <Label>{label}</Label>
    {options.map((option) => <RadioField key={option.value} value={option.value}>
      <RadioButton><SelectionIndicator />{option.label}</RadioButton>
    </RadioField>)}
  </RadioGroup>
}

