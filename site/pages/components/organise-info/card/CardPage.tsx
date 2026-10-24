import { Avatar, Badge, Button, Card, CardFooter, CardImage, CardTitle, DemoArea, HeartIcon, Text, ToggleButton } from '@decocode/mezzanine'
import { useExamplePicture } from '../../../../components/examplePicture'
import { cardContent, cardExample } from './cardContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './card.css'

export default function CardPage() {
  const examplePicture = useExamplePicture()
  return (
    <ContentPage
      content={cardContent}
      parts={{
        example: (
          <DemoArea>
            <Card className="card-example">
              <CardImage src={examplePicture} alt="">
                <Badge>{cardExample.badge}</Badge>
                <ToggleButton hierarchy="secondary" size="sm" iconLeading={<HeartIcon />} labelPlacement="tooltip">{cardExample.toggle}</ToggleButton>
              </CardImage>
              <Avatar size="sm">{cardExample.avatar}</Avatar>
              <CardTitle href={cardExample.href}>{cardExample.heading}</CardTitle>
              <Text elementType="p">{cardExample.body}</Text>
              <CardFooter>
                <Text>{cardExample.detail}</Text>
                <Button hierarchy="secondary">{cardExample.action}</Button>
              </CardFooter>
            </Card>
          </DemoArea>
        ),
      }}
    />
  )
}
