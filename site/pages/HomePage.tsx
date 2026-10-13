import { Button } from '@decocode/mezzanine'
import { homeContent } from '../content/homeContent'

export default function HomePage() {
  return (
    <section className="landing-hero" aria-labelledby="landing-heading">
      <p className="mz-text-label-lg section-label">{homeContent.attribution}</p>
      <h1 id="landing-heading" className="landing-wordmark mz-text-display-md mz-text-emphasis">
        <span aria-hidden="true" className="site-logo landing-hero-logo" />
        <span className="landing-wordmark-name">{homeContent.title}</span>
      </h1>
      <p className="mz-text-body-lg landing-hero-description">{homeContent.description}</p>
      <Button href={homeContent.docsLink.href}>{homeContent.docsLink.label}</Button>
    </section>
  )
}
