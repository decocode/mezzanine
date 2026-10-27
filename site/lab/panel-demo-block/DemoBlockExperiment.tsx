// The Lab's Demo block page: the candidate demo block, showing a Card, with its properties and its
// optional parts in separate groups. Illustrative and unapproved.
import { useState } from 'react'
import { Button, Card, CardFooter, CardImage, CardTitle, Text } from '@decocode/mezzanine'
import { useExamplePicture } from '../../components/examplePicture'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { RichText } from '../../components/RichText'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoBlock } from './LabDemoBlock'
import { demoBlockAspectRatios, demoBlockCode, demoBlockLabels as labels, demoBlockPage, demoBlockParts } from './panelDemoBlockContent'
import './panelDemoBlock.css'

export function DemoBlockExperiment() {
  const picture = useExamplePicture()
  const [href, setHref] = useState(true)
  const [aspectRatio, setAspectRatio] = useState<(typeof demoBlockAspectRatios)[number]>('16 / 9')
  const [parts, setParts] = useState<Record<(typeof demoBlockParts)[number], boolean>>({ CardImage: true, CardFooter: true })
  return <LabContentPage content={demoBlockPage} parts={{
    example: (
      <LabDemoBlock
        codeView={demoBlockCode({ aspectRatio, href, parts })}
        properties={<>
          <PanelSwitch isSelected={href} onChange={setHref}>href</PanelSwitch>
          {/* aspectRatio belongs to CardImage, so it appears once that part is in. */}
          {parts.CardImage && <PanelSelect label="aspectRatio" options={demoBlockAspectRatios} value={aspectRatio} onChange={setAspectRatio} />}
        </>}
        parts={demoBlockParts.map((name) => (
          <PanelSwitch key={name} isSelected={parts[name]} onChange={(isSelected) => setParts({ ...parts, [name]: isSelected })}>{name}</PanelSwitch>
        ))}
      >
        <Card className="lab-demo-block-card">
          {parts.CardImage && <CardImage src={picture} alt="" aspectRatio={aspectRatio} />}
          <CardTitle href={href ? labels.href : undefined}>{labels.heading}</CardTitle>
          <Text elementType="p"><RichText text={labels.body} /></Text>
          {parts.CardFooter && (
            <CardFooter>
              <Text>{labels.detail}</Text>
              <Button hierarchy="secondary">{labels.action}</Button>
            </CardFooter>
          )}
        </Card>
      </LabDemoBlock>
    ),
  }} />
}
