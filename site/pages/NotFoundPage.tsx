import { PageHeading } from '../templates/ComponentPageTemplate'
import { Link } from '@decocode/mezzanine'
import { siteContent } from '../content/siteContent'

export default function NotFoundPage() {
  return (
    <>
      <PageHeading title={siteContent.notFound.title} />
      <Link href={siteContent.notFound.homeLink.href}>{siteContent.notFound.homeLink.label}</Link>
    </>
  )
}
