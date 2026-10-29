import { Fragment, useState } from 'react'
import { Avatar, Badge, Button, Card, CardFooter, CardImage, CardTitle, DemoBlock, HeartIcon, Text, ToggleButton } from '@decocode/mezzanine'
import { useExamplePicture } from '../../../../components/examplePicture'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { cardAspectRatios, cardContent, cardExample, cardExampleCode, cardFlags, isCardFlagShown } from './cardContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './card.css'

export default function CardPage() {
  const examplePicture = useExamplePicture()
  const [aspectRatio, setAspectRatio] = useState<(typeof cardAspectRatios)[number]>('16 / 9')
  const [flags, setFlags] = useState<Record<(typeof cardFlags)[number], boolean>>({ CardImage: false, Badge: false, ToggleButton: false, Avatar: false, href: false, CardFooter: false, Detail: false, Button: false })
  const shown = (name: (typeof cardFlags)[number]) => flags[name] && isCardFlagShown(name, flags)
  return (
    <ContentPage
      content={cardContent}
      parts={{
        example: (
          <DemoBlock
            codeView={cardExampleCode({ aspectRatio, flags })}
            endPanel={<>
              {/* Each switch appears once it applies; aspectRatio follows CardImage. */}
              {cardFlags.filter((name) => isCardFlagShown(name, flags)).map((name) => <Fragment key={name}>
                <PanelSwitch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
                {name === 'CardImage' && flags.CardImage && <PanelSelect label="aspectRatio" options={cardAspectRatios} value={aspectRatio} onChange={setAspectRatio} />}
              </Fragment>)}
            </>}
          >
            <Card className="card-example">
              {flags.CardImage && (
                <CardImage src={examplePicture} alt="" aspectRatio={aspectRatio}>
                  {shown('Badge') && <Badge>{cardExample.badge}</Badge>}
                  {shown('ToggleButton') && <ToggleButton hierarchy="secondary" size="sm" icon={<HeartIcon />} iconPosition="iconOnly">{cardExample.toggle}</ToggleButton>}
                </CardImage>
              )}
              {shown('Avatar') && <Avatar size="sm">{cardExample.avatar}</Avatar>}
              <CardTitle href={flags.href ? cardExample.href : undefined}>{cardExample.heading}</CardTitle>
              <Text elementType="p">{cardExample.body}</Text>
              {flags.CardFooter && (
                <CardFooter>
                  {shown('Detail') && <Text>{cardExample.detail}</Text>}
                  {shown('Button') && <Button hierarchy="secondary">{cardExample.action}</Button>}
                </CardFooter>
              )}
            </Card>
          </DemoBlock>
        ),
      }}
    />
  )
}
