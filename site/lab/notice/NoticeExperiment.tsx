// The Lab's Notice page: one note with an icon and actions. It uses the library's Notice; the page
// itself is illustrative.
import { Button, DemoArea, Link, Notice, PlaceholderIcon } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { noticeExample, noticePage } from './noticeContent'

export function NoticeExperiment() {
  return <LabContentPage content={noticePage} parts={{
    example: (
      <DemoArea align="stretch">
        <Notice
          purpose="info"
          title={noticeExample.title}
          icon={<PlaceholderIcon />}
          actions={<>
            <Button size="sm" hierarchy="secondary">{noticeExample.button}</Button>
            <Link href={noticePage.href}>{noticeExample.link}</Link>
          </>}
        >
          {noticeExample.content}
        </Notice>
      </DemoArea>
    ),
  }} />
}
