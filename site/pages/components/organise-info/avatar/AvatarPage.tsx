import { Avatar, DemoArea } from '@decocode/mezzanine'
import { useExamplePicture } from '../../../../components/examplePicture'
import { avatarContent, avatarExample } from './avatarContent'
import { ContentPage } from '../../../../templates/ContentPage'
import './avatar.css'

export default function AvatarPage() {
  const examplePicture = useExamplePicture()
  return (
    <ContentPage
      content={avatarContent}
      parts={{
        example: (
          <DemoArea>
            <div className="avatar-example">
              <Avatar src={examplePicture}>{avatarExample.named}</Avatar>
              <Avatar>{avatarExample.initials}</Avatar>
              <Avatar size="sm" src={examplePicture}>{avatarExample.small}</Avatar>
              <Avatar src={examplePicture} alt={avatarExample.unnamed} />
            </div>
          </DemoArea>
        ),
      }}
    />
  )
}
