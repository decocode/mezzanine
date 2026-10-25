// The Lab's Text spacing page: running content, a Card and a Dialog, each with today's spacing and
// with the candidate rules, side by side. Illustrative and unapproved.
import type { ReactNode } from 'react'
import { Avatar, Button, Card, CardFooter, CardTitle, DemoArea, Dialog, Heading, Text } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { textSpacingCard, textSpacingDialog, textSpacingPage, textSpacingProse, textSpacingVersions } from './textSpacingContent'
import './textSpacing.css'

type Version = (typeof textSpacingVersions)[number]['key']

// Today's version and the candidate, side by side, each labelled.
function Pair({ children }: { children: (version: Version) => ReactNode }) {
  return <DemoArea>
    <div className="lab-text-spacing-pair">
      {textSpacingVersions.map(({ key, label }) => (
        <div key={key} className={`lab-text-spacing-${key}`}>
          <Text elementType="p" className="mz-text-label-md">{label}</Text>
          {children(key)}
        </div>
      ))}
    </div>
  </DemoArea>
}

export function TextSpacingExperiment() {
  return <LabContentPage content={textSpacingPage} parts={{
    runningContent: (
      <Pair>{(version) => (
        <div className={version === 'candidate' ? 'lab-prose' : undefined}>
          <h2>{textSpacingProse.headingLarge}</h2>
          <p>{textSpacingProse.intro}</p>
          <p>{textSpacingProse.second}</p>
          <h3>{textSpacingProse.headingMedium}</h3>
          <p>{textSpacingProse.third}</p>
          <ul>{textSpacingProse.list.map((item) => <li key={item}>{item}</li>)}</ul>
          <h4>{textSpacingProse.headingSmall}</h4>
          <p>{textSpacingProse.fourth}</p>
        </div>
      )}</Pair>
    ),
    card: (
      <Pair>{(version) => (
        <Card>
          <Avatar size="sm">{textSpacingCard.avatar}</Avatar>
          <CardTitle>{textSpacingCard.titles[version]}</CardTitle>
          <Text elementType="p">{textSpacingCard.body}</Text>
          <CardFooter>
            <Text>{textSpacingCard.detail}</Text>
            <Button hierarchy="secondary">{textSpacingCard.action}</Button>
          </CardFooter>
        </Card>
      )}</Pair>
    ),
    dialog: (
      // The Dialog is shown in place, on a surface, rather than opening over the page.
      <Pair>{(version) => (
        <div className="lab-text-spacing-surface">
          <Dialog>
            <Heading slot="title">{textSpacingDialog.titles[version]}</Heading>
            <p>{textSpacingDialog.body}</p>
            <footer className="mz-dialog-actions">
              <Button hierarchy="secondary">{textSpacingDialog.action}</Button>
            </footer>
          </Dialog>
        </div>
      )}</Pair>
    ),
  }} />
}
