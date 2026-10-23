import { useId, type ReactNode } from 'react'
import { CodeBlock, Heading, Label, RadioButton, RadioField, RadioGroup, SelectionIndicator, Text, ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { RichText } from './RichText'

// The CSS behind an example: plain-English notes and the rules themselves, quoted from the page's
// stylesheet. A browser test checks that each quote still matches its stylesheet.
export interface CssNote {
  // Copy with `code`, **strong** and [label](href) markers, like the page's content.
  paragraphs: string[]
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
    {note.paragraphs.map((paragraph) => <Text key={paragraph} elementType="p" className="mz-text-body-md">
      <RichText text={paragraph} />
    </Text>)}
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

// Buttons that choose one CSS value for an example, such as position: sticky, with a visible label.
export function ValuePicker<Value extends string>({ label, options, value, onChange }: { label: string; options: readonly { label: string; value: Value }[]; value: Value; onChange: (value: Value) => void }) {
  const labelId = useId()
  return <div className="value-picker">
    <span id={labelId} className="mz-text-label-md">{label}</span>
    <ToggleButtonGroup
      size="sm"
      hierarchy="secondary"
      aria-labelledby={labelId}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={(keys) => { const option = options.find((item) => keys.has(item.value)); if (option) onChange(option.value) }}
    >
      {options.map((option) => <ToggleButton key={option.value} id={option.value}>{option.label}</ToggleButton>)}
    </ToggleButtonGroup>
  </div>
}

// The same choice as a radio group, for a DemoArea's Properties panel: the options stack in a short list
// that fits the narrow panel, all visible at once.
export function PanelPicker<Value extends string>({ label, options, value, onChange }: { label: string; options: readonly { label: string; value: Value }[]; value: Value; onChange: (value: Value) => void }) {
  return <RadioGroup value={value} onChange={(next) => { const option = options.find((item) => item.value === next); if (option) onChange(option.value) }}>
    <Label>{label}</Label>
    {options.map((option) => <RadioField key={option.value} value={option.value}>
      <RadioButton><SelectionIndicator />{option.label}</RadioButton>
    </RadioField>)}
  </RadioGroup>
}

