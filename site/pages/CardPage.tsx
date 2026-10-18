import { ExampleZone } from '../components/ExampleZone'
import { Button, Card, Heading } from '@decocode/mezzanine'
import { cardContent, cardExample } from '../content/cardContent'
import { ContentPage } from '../templates/ContentPage'

export default function CardPage() {
  return (
    <ContentPage
      content={cardContent}
      parts={{
        example: (
          <ExampleZone>
            <Card>
              <Heading level={3}>{cardExample.heading}</Heading>
              <p>{cardExample.body}</p>
              <Button variant="secondary">{cardExample.action}</Button>
            </Card>
          </ExampleZone>
        ),
      }}
    />
  )
}
