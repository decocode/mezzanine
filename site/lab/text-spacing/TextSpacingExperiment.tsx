// The Lab's Text spacing page: the same Card with today's spacing and with the candidate text gap,
// side by side. Illustrative and unapproved.
import { Avatar, Button, Card, CardFooter, CardTitle, DemoArea, Text } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { textSpacingCard, textSpacingExamples, textSpacingPage } from './textSpacingContent'
import './textSpacing.css'

export function TextSpacingExperiment() {
  return <LabContentPage content={textSpacingPage} parts={{
    example: (
      <DemoArea>
        <div className="lab-text-spacing-pair">
          {textSpacingExamples.map(({ key, label, title }) => (
            <div key={key} className={`lab-text-spacing-${key}`}>
              <Text elementType="p" className="mz-text-label-md">{label}</Text>
              <Card>
                <Avatar size="sm">{textSpacingCard.avatar}</Avatar>
                <CardTitle>{title}</CardTitle>
                <Text elementType="p">{textSpacingCard.body}</Text>
                <CardFooter>
                  <Text>{textSpacingCard.detail}</Text>
                  <Button hierarchy="secondary">{textSpacingCard.action}</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </DemoArea>
    ),
  }} />
}
