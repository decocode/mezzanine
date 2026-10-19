import { PageHeading } from '../../templates/DocsPageTemplate'
import { Link } from '@decocode/mezzanine'
import { siteContent } from '../../siteContent'

export default function NotFoundPage() {
  return (
    <>
      <PageHeading title={siteContent.notFound.title} />
      <Link href={siteContent.notFound.homeLink.href}>{siteContent.notFound.homeLink.label}</Link>
    </>
  )
}
