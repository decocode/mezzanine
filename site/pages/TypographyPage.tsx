import { PageHeading, Link } from '@decocode/mezzanine'

export default function TypographyPage() {
  return (
    <>
      <PageHeading
        description={[
          'Typography helps people understand what matters, scan a page and read its content. Mezzanine provides consistent text styles for everything from prominent headings to body copy and compact interface labels.',
          'Each style combines a font family, size, weight and line height. Use these styles together to create a clear hierarchy; product themes can customise their appearance without changing how they are applied.',
        ]}
        title="Typography"
      />
      <section className="component-section" aria-labelledby="typography-text-styles-heading">
        <h2 id="typography-text-styles-heading" className="mz-text-heading-md">Text styles</h2>
        <p className="component-section-description">The individual styles for display text, headings, titles, body copy and labels, with their paired line heights.</p>
        <Link href="/typography/text-styles">Explore text styles</Link>
      </section>
      <section className="component-section" aria-labelledby="typography-prose-heading">
        <h2 id="typography-prose-heading" className="mz-text-heading-md">Prose</h2>
        <p className="component-section-description">How typography works within longer-form content, including list spacing and inline code.</p>
        <Link href="/typography/prose">Explore prose</Link>
      </section>
    </>
  )
}
