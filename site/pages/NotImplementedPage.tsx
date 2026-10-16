import { PageHeading } from '../templates/DocsPageTemplate'
import { siteContent } from '../content/siteContent'

export default function NotImplementedPage({ title }: { title: string }) {
  return (
    <>
      <PageHeading title={title} />
      <p className="mz-text-body-md empty-page-status">{siteContent.notImplemented}</p>
    </>
  )
}
