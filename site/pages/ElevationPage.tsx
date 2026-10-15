import { DocsTableOfContents } from '../components/DocsTableOfContents'
import { PageHeading } from '../templates/ComponentPageTemplate'
import { elevationDefinitions, type ElevationDefinition } from '../content/elevationContent'
import { useTokenValue } from '../components/tokenValueLogic'

function ElevationLevel({ elevation, refreshKey }: { elevation: ElevationDefinition; refreshKey: string }) {
  const value = useTokenValue(elevation.token, refreshKey)

  return (
    <li className="elevation-role-card">
      <span
        aria-hidden="true"
        className="elevation-role-sample"
        style={{ boxShadow: `var(${elevation.token})` }}
      />
      <strong>{elevation.label}</strong>
      <code>{elevation.token}</code>
      <code>{value}</code>
      <p>Level {elevation.level}</p>
      <p>Use for: {elevation.useFor}</p>
    </li>
  )
}

export default function ElevationPage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <PageHeading
        description="Elevation communicates whether a surface is sunken into, level with or raised above the surface around it. Mezzanine uses neutral shadows that product themes can replace without changing these token names."
        title="Elevation"
      />
      <DocsTableOfContents sections={[
        { id: 'elevation-roles-heading', label: 'Elevation levels' },
        { id: 'elevation-theming-heading', label: 'Theming elevation' },
        { id: 'elevation-focus-heading', label: 'Focus is not elevation' },
      ]} />
      <section aria-labelledby="elevation-roles-heading" className="component-section">
        <h2 id="elevation-roles-heading" className="mz-text-heading-md">
          Elevation levels
        </h2>
        <p className="component-section-description">
          The levels form a ladder around <code>--elevation-flat</code>, which is level 0.
          Numbers count away from flat in each direction: <code>sunken-1</code> sits one step into
          the surface, and <code>raised-1</code> to <code>raised-3</code> sit one, two and three
          steps above it. A higher number means more separation from flat.
          Values below come from the active CSS tokens.
        </p>
        <ol className="elevation-role-list">
          {elevationDefinitions.map((elevation) => (
            <ElevationLevel elevation={elevation} key={elevation.token} refreshKey={refreshKey} />
          ))}
        </ol>
      </section>
      <section aria-labelledby="elevation-theming-heading" className="component-section">
        <h2 id="elevation-theming-heading" className="mz-text-heading-md">
          Theming elevation
        </h2>
        <p className="component-section-description">
          Light, Dark, and Wireframe use the same elevation levels with theme-specific shadows
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
