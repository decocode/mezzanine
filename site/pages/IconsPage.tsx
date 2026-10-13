import { PageHeading } from '../templates/ComponentPageTemplate'
import { iconDefinitions } from '../content/iconsContent'

export default function IconsPage() {
  return (
    <>
      <PageHeading
        description="Mezzanine's icon library provides a consistent, brand-agnostic set of interface symbols. New icons will be added as real product needs arise."
        title="Icons"
      />
      <section aria-labelledby="icons-heading" className="component-section">
        <h2 id="icons-heading" className="mz-text-heading-md">Icon set</h2>
        <ul className="icon-grid">
          {iconDefinitions.map(({ componentName, icon, name }) => (
            <li key={componentName}>
              <span aria-hidden="true" className="icon-sample">{icon}</span>
              <strong>{name}</strong>
              <code>{componentName}</code>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
