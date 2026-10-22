import { Button, Card, DemoArea, Heading } from '@decocode/mezzanine'
import { cardContent, cardExample } from './cardContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CardPage() {
  return (
    <ContentPage
      content={cardContent}
      parts={{
        example: (
          <DemoArea>
            <Card>
              <Heading level={3}>{cardExample.heading}</Heading>
              <p>{cardExample.body}</p>
              <Button variant="secondary">{cardExample.action}</Button>
            </Card>
          </DemoArea>
        ),
      }}
    />
  )
}
