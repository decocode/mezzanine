// The Lab's Demo block page: the candidate demo block, showing a Card. Its demo panel lists the Card's own
// href first, then its parts in the order of its anatomy, each with its own settings and the parts placed
// inside it beneath it. Every switch starts off, so the demo opens as the bare Card.
// Illustrative and unapproved.
import { useState } from 'react'
import { Avatar, Badge, Button, Card, CodeBlock, CardFooter, CardImage, CardTitle, HeartIcon, Text, ToggleButton } from '@decocode/mezzanine'
import { useExamplePicture } from '../../components/examplePicture'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { RichText } from '../../components/RichText'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoBlock } from './LabDemoBlock'
import { demoBlockAspectRatios, demoBlockCode, demoBlockLabels as labels, demoBlockPage, demoBlockParts, isDemoBlockPartShown, type DemoBlockParts } from './panelDemoBlockContent'
import './panelDemoBlock.css'

const allOff = Object.fromEntries(demoBlockParts.map((name) => [name, false])) as DemoBlockParts

export function DemoBlockExperiment() {
  const picture = useExamplePicture()
  const [href, setHref] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<(typeof demoBlockAspectRatios)[number]>('16 / 9')
  const [parts, setParts] = useState<DemoBlockParts>(allOff)
  const shown = (name: (typeof demoBlockParts)[number]) => parts[name] && isDemoBlockPartShown(name, parts, href)
  // A part's switch, shown once it applies.
  const partSwitch = (name: (typeof demoBlockParts)[number]) => isDemoBlockPartShown(name, parts, href) && (
    <PanelSwitch isSelected={parts[name]} onChange={(isSelected) => setParts({ ...parts, [name]: isSelected })}>{name}</PanelSwitch>
  )
  return <LabContentPage content={demoBlockPage} parts={{
    example: (
      <LabDemoBlock
        properties={<PanelSwitch isSelected={href} onChange={setHref}>href</PanelSwitch>}
        parts={<>
          {/* CardImage's own setting and the parts placed on it appear beneath it once it's in. */}
          <div className="lab-demo-block-part" role="group" aria-label="CardImage">
            {partSwitch('CardImage')}
            {parts.CardImage && <div className="lab-demo-block-part-settings">
              <PanelSelect label="aspectRatio" options={demoBlockAspectRatios} value={aspectRatio} onChange={setAspectRatio} />
              {partSwitch('Badge')}
              {partSwitch('ToggleButton')}
            </div>}
          </div>
          {partSwitch('Avatar')}
          {/* The footer's Detail, and its Button in a card without href, appear beneath it once it's in. */}
          <div className="lab-demo-block-part" role="group" aria-label="CardFooter">
            {partSwitch('CardFooter')}
            {parts.CardFooter && <div className="lab-demo-block-part-settings">
              {partSwitch('Detail')}
              {partSwitch('Button')}
            </div>}
          </div>
        </>}
      >
        <Card className="lab-demo-block-card" href={href ? labels.href : undefined}>
          {parts.CardImage && (
            <CardImage src={picture} alt="" aspectRatio={aspectRatio}>
              {shown('Badge') && <Badge>{labels.badge}</Badge>}
              {shown('ToggleButton') && <ToggleButton hierarchy="secondary" size="sm" icon={<HeartIcon />} iconPosition="iconOnly">{labels.toggle}</ToggleButton>}
            </CardImage>
          )}
          {shown('Avatar') && <Avatar size="sm">{labels.avatar}</Avatar>}
          <CardTitle>{labels.heading}</CardTitle>
          <Text elementType="p"><RichText text={labels.body} /></Text>
          {parts.CardFooter && (
            <CardFooter>
              {shown('Detail') && <Text>{labels.detail}</Text>}
              {shown('Button') && <Button hierarchy="secondary">{labels.action}</Button>}
            </CardFooter>
          )}
        </Card>
      </LabDemoBlock>
    ),
    // The code shows in its own section under the example, and follows the demo settings.
    code: <CodeBlock language="tsx">{demoBlockCode({ aspectRatio, href, parts })}</CodeBlock>,
  }} />
}
