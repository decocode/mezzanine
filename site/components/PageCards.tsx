import { Card, CardTitle } from '@decocode/mezzanine'

export interface PageCardItem {
  label: string
  href: string
  description: string
}

// An index page's cards: one Card for each child page, in navigation order. Each card is a link: its
// title is the link, and its pressable area covers the whole card.
export function PageCards({ items }: { items: readonly PageCardItem[] }) {
  return (
    <ul className="page-cards">
      {items.map(({ label, href, description }) => (
        <li key={href}>
          <Card href={href}>
            <CardTitle>{label}</CardTitle>
            <p>{description}</p>
          </Card>
        </li>
      ))}
    </ul>
  )
}
