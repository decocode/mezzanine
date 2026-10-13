import { PageHeading } from '../templates/ComponentPageTemplate'
import { TableOfContents } from '@decocode/mezzanine'
import { elevationDefinitions } from '../content/elevationContent'

export default function ElevationPage() {
  return (
    <>
      <PageHeading
        description="Elevation communicates whether a surface is inset, flat, raised, floating, or overlaying other content. Mezzanine uses neutral shadows that product themes can replace without changing these role names."
        title="Elevation"
      />
      <TableOfContents sections={[
        { id: 'elevation-roles-heading', label: 'Elevation roles' },
        { id: 'elevation-theming-heading', label: 'Theming elevation' },
        { id: 'elevation-focus-heading', label: 'Focus is not elevation' },
      ]} />
      <section aria-labelledby="elevation-roles-heading" className="component-section">
        <h2 id="elevation-roles-heading" className="mz-text-heading-md">
          Elevation roles
        </h2>
        <p className="component-section-description">
          The names describe the relationship between surfaces rather than a numbered strength.
        </p>
        <ol className="elevation-role-list">
          {elevationDefinitions.map((elevation) => (
            <li className="elevation-role-card" key={elevation.token}>
              <span
                aria-hidden="true"
                className="elevation-role-sample"
                data-elevation={elevation.label.toLowerCase()}
                style={{ boxShadow: `var(${elevation.token})` }}
              />
              <strong>{elevation.label}</strong>
              <code>{elevation.token}</code>
              <p>{elevation.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="elevation-theming-heading" className="component-section">
        <h2 id="elevation-theming-heading" className="mz-text-heading-md">
          Theming elevation
        </h2>
        <p className="component-section-description">
          Light, Dark, and Wireframe use the same elevation roles with theme-specific shadows
          and edge highlights.
          A product theme can replace the shadow values while components continue to request the
          same spatial relationship.
        </p>
      </section>
      <section aria-labelledby="elevation-focus-heading" className="component-section">
        <h2 id="elevation-focus-heading" className="mz-text-heading-md">
          Focus is not elevation
        </h2>
        <p className="component-section-description">
          Keyboard focus remains a separate interaction state using <code>--color-focus</code>.
          Elevation must not be used as the only way to show which control has focus.
        </p>
      </section>
    </>
  )
}
