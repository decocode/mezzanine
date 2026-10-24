import { Card, CardTitle } from '@decocode/mezzanine'

export interface PageCardItem {
  label: string
  href: string
  description: string
}

// An index page's cards: one Card for each child page, in navigation order. The title is the card's
// link, and its pressable area covers the whole card.
export function PageCards({ items }: { items: readonly PageCardItem[] }) {
  return (
    <ul className="page-cards">
      {items.map(({ label, href, description }) => (
        <li key={href}>
          <Card>
            <CardTitle href={href}>{label}</CardTitle>
            <p>{description}</p>
          </Card>
        </li>
      ))}
    </ul>
  )
}
