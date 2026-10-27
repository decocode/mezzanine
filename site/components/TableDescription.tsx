import { RichText } from './RichText'

// A table cell's copy: one paragraph, or several entries one under another, divided by lines, such as
// each job a component does when a larger one uses it more than once.
export function TableDescription({ description }: { description: string | readonly string[] }) {
  if (typeof description === 'string') return <RichText text={description} />
  return <ul className="documentation-table-entries">{description.map((entry) => <li key={entry}><RichText text={entry} /></li>)}</ul>
}
