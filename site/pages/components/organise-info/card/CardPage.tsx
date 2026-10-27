import { useState } from 'react'
import { Avatar, Badge, Button, Card, CardFooter, CardImage, CardTitle, DemoBlock, HeartIcon, Text, ToggleButton } from '@decocode/mezzanine'
import { useExamplePicture } from '../../../../components/examplePicture'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { cardAspectRatios, cardContent, cardExample, cardExampleCode, cardFlags } from './cardContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './card.css'

export default function CardPage() {
  const examplePicture = useExamplePicture()
  const [aspectRatio, setAspectRatio] = useState<(typeof cardAspectRatios)[number]>('16 / 9')
  const [flags, setFlags] = useState<Record<(typeof cardFlags)[number], boolean>>({ CardImage: true, href: true, CardFooter: true })
  return (
    <ContentPage
      content={cardContent}
      parts={{
        example: (
          <DemoBlock
            codeView={cardExampleCode({ aspectRatio, flags })}
            endPanel={<>
              {cardFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.CardImage && <PanelSelect label="aspectRatio" options={cardAspectRatios} value={aspectRatio} onChange={setAspectRatio} />}
            </>}
          >
            <Card className="card-example">
              {flags.CardImage && (
                <CardImage src={examplePicture} alt="" aspectRatio={aspectRatio}>
                  <Badge>{cardExample.badge}</Badge>
                  <ToggleButton hierarchy="secondary" size="sm" icon={<HeartIcon />} iconPosition="iconOnly">{cardExample.toggle}</ToggleButton>
                </CardImage>
              )}
              <Avatar size="sm">{cardExample.avatar}</Avatar>
              <CardTitle href={flags.href ? cardExample.href : undefined}>{cardExample.heading}</CardTitle>
              <Text elementType="p">{cardExample.body}</Text>
              {flags.CardFooter && (
                <CardFooter>
                  <Text>{cardExample.detail}</Text>
                  <Button hierarchy="secondary">{cardExample.action}</Button>
                </CardFooter>
              )}
            </Card>
          </DemoBlock>
        ),
      }}
    />
  )
}
