import { Link } from '@decocode/mezzanine'
import { DocsTableOfContents } from '../components/DocsTableOfContents'
import { PageHeading } from '../templates/DocsPageTemplate'

export default function ShapePage() {
  return (
    <>
      <PageHeading title="Shape" description="Shape is how a surface's outline looks: how rounded its corners are, and how heavy its border is. Each has a shared scale that products can reference from their component tokens." />
      <DocsTableOfContents sections={[
        { id: 'shape-corners-heading', label: 'Corners' },
        { id: 'shape-borders-heading', label: 'Borders' },
      ]} />
      <section className="component-section" aria-labelledby="shape-corners-heading">
        <h2 id="shape-corners-heading" className="mz-text-heading-md">Corners</h2>
        <p className="component-section-description">The corner-radius scale, from square to pill ends, and how to round all corners or just one.</p>
        <Link href="/shape/corners">Explore corners</Link>
      </section>
      <section className="component-section" aria-labelledby="shape-borders-heading">
        <h2 id="shape-borders-heading" className="mz-text-heading-md">Borders</h2>
        <p className="component-section-description">The border-width scale, from a hairline to a heavy outline, and when a hairline is suitable.</p>
        <Link href="/shape/borders">Explore borders</Link>
      </section>
    </>
  )
}
