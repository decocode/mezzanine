// The Lab's Notice page: every tone in a demo area, then one note with an icon and actions. Illustrative and unapproved.
import { Button, DemoArea, Link, PlaceholderIcon } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { Notice } from './Notice'
import { noticeActionsExample, noticeExamples, noticePage } from './noticeContent'

export function NoticeExperiment() {
  return <LabContentPage content={noticePage} parts={{
    example: (
      <DemoArea>
        <div className="example-stack">
          {noticeExamples.map(({ variant, title, content }) => <Notice key={variant} variant={variant} title={title}>{content}</Notice>)}
        </div>
      </DemoArea>
    ),
    iconAndActions: (
      <DemoArea>
        <Notice
          variant="info"
          title={noticeActionsExample.title}
          icon={<PlaceholderIcon />}
          actions={<>
            <Button size="sm" variant="secondary">{noticeActionsExample.button}</Button>
            <Link href={noticePage.href}>{noticeActionsExample.link}</Link>
          </>}
        >
          {noticeActionsExample.content}
        </Notice>
      </DemoArea>
    ),
  }} />
}
