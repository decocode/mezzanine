import { Card, Heading } from '@decocode/mezzanine'

export interface PageCardItem {
  label: string
  href: string
  description: string
}

// An index page's cards: one linked Card for each child page, in navigation order.
export function PageCards({ items }: { items: readonly PageCardItem[] }) {
  return (
    <ul className="page-cards">
      {items.map(({ label, href, description }) => (
        <li key={href}>
          <Card href={href}>
            <Heading level={3}>{label}</Heading>
            <p>{description}</p>
          </Card>
        </li>
      ))}
    </ul>
  )
}
