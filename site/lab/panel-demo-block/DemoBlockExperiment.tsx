// The Lab's Demo block page: the candidate demo block, showing a Card. Card has no settings of its own, so
// its demo panel has only a Parts group, where each part lists its own settings beneath it.
// Illustrative and unapproved.
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
        parts={<>
          {/* CardImage's own setting appears beneath it once the part is in. */}
          <div className="lab-demo-block-part" role="group" aria-label="CardImage">
            <PanelSwitch isSelected={parts.CardImage} onChange={(isSelected) => setParts({ ...parts, CardImage: isSelected })}>CardImage</PanelSwitch>
            {parts.CardImage && <div className="lab-demo-block-part-settings">
              <PanelSelect label="aspectRatio" options={demoBlockAspectRatios} value={aspectRatio} onChange={setAspectRatio} />
            </div>}
          </div>
          {/* CardTitle is always there, so it has no switch, only its own setting. */}
          <div className="lab-demo-block-part" role="group" aria-label="CardTitle">
            <span className="lab-demo-block-part-name" aria-hidden="true">CardTitle</span>
            <div className="lab-demo-block-part-settings">
              <PanelSwitch isSelected={href} onChange={setHref}>href</PanelSwitch>
            </div>
          </div>
          <PanelSwitch isSelected={parts.CardFooter} onChange={(isSelected) => setParts({ ...parts, CardFooter: isSelected })}>CardFooter</PanelSwitch>
        </>}
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
