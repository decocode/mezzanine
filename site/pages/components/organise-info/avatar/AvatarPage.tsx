import { useState } from 'react'
import { Avatar, DemoBlock, Switch } from '@decocode/mezzanine'
import { useExamplePicture } from '../../../../components/examplePicture'
import { PanelSelect } from '../../../../components/PanelSelect'
import { avatarContent, avatarExample, avatarExampleCode, avatarSizes } from './avatarContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './avatar.css'

export default function AvatarPage() {
  const examplePicture = useExamplePicture()
  const [size, setSize] = useState<(typeof avatarSizes)[number]>('md')
  const [src, setSrc] = useState(true)
  const [named, setNamed] = useState(true)
  const picture = src ? examplePicture : undefined
  return (
    <ContentPage
      content={avatarContent}
      parts={{
        example: (
          <DemoBlock
            codeView={avatarExampleCode({ size, src, named })}
            endPanel={<>
              <PanelSelect label="size" options={avatarSizes} value={size} onChange={setSize} />
              <Switch isSelected={src} onChange={setSrc}>src</Switch>
              <Switch isSelected={named} onChange={setNamed}>children</Switch>
            </>}
          >
            {named
              ? <Avatar size={size} src={picture}>{avatarExample.named}</Avatar>
              : <Avatar size={size} src={picture} alt={avatarExample.unnamed} />}
          </DemoBlock>
        ),
      }}
    />
  )
}
