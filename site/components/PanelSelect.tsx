import { ListBoxItem, Select } from '@decocode/mezzanine'

// A choice in a DemoArea's Properties panel: a Select named after the prop, listing its values.
export function PanelSelect<T extends string>({ label, options, value, onChange, className }: {
  label: string
  options: readonly T[]
  value: T | null
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <Select size="sm" className={className} label={label} selectedKey={value} onSelectionChange={(key) => { if (key != null) onChange(key as T) }}>
      {options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
    </Select>
  )
}
