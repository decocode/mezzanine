import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import { TokenValue } from '../components/TokenValue'
import {
  elevationColourTokens, elevationDefinitions, elevationDescription, elevationFocusNote,
  elevationLevelsIntro, elevationReferences, elevationRelatedPages, elevationSourcePaths,
  elevationThemeRows, type ElevationDefinition,
} from '../content/elevationContent'

function ElevationLevel({ elevation }: { elevation: ElevationDefinition }) {
  return (
    <li className="elevation-role-card">
      <span aria-hidden="true" className="elevation-role-sample" style={{ boxShadow: `var(${elevation.token})` }} />
      <strong>{elevation.label}</strong>
      <p>Level {elevation.level}</p>
      <p>{elevation.useFor}</p>
    </li>
  )
}

export default function ElevationPage() {
  return (
    <DocsPageTemplate
      title="Elevation"
      description={elevationDescription}
      sections={[
        {
          id: 'elevation-roles-heading',
          title: 'Levels',
          content: (<>
            <p className="component-section-description">{elevationLevelsIntro}</p>
            <ol className="elevation-role-list">
              {elevationDefinitions.map((elevation) => <ElevationLevel elevation={elevation} key={elevation.token} />)}
            </ol>
          </>),
        },
        {
          id: 'elevation-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'elevation-css-properties',
              title: 'CSS properties',
              content: <DocsTable aria-label="Elevation CSS properties" nameColumn="Property" rows={[{ name: 'box-shadow', description: 'Draws each level’s shadow and edge line.' }]} />,
            },
            {
              id: 'elevation-tokens',
              title: 'Tokens',
              content: (<>
              <p className="component-section-description">
                The levels are defined in <code>{elevationSourcePaths.levels}</code>. Values shown are for the theme you are viewing.
              </p>
              <div className="documentation-table">
                <Table aria-label="Elevation tokens">
                  <TableHeader>
                    <Column id="token" isRowHeader>Token</Column>
                    <Column id="level">Level</Column>
                    <Column id="value">Value</Column>
                  </TableHeader>
                  <TableBody>
                    {elevationDefinitions.map(({ token, level }) => (
                      <Row id={token} key={token}>
                        <Cell><code>{token}</code></Cell>
                        <Cell>{level}</Cell>
                        <Cell><TokenValue token={token} /></Cell>
                      </Row>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="component-section-description">
                Every sunken and raised level is built from two colours, set in each theme file in <code>{elevationSourcePaths.themes}</code>.
              </p>
              <div className="documentation-table">
                <Table aria-label="Elevation colour tokens">
                  <TableHeader>
                    <Column id="token" isRowHeader>Token</Column>
                    <Column id="purpose">Purpose</Column>
                    <Column id="value">Value</Column>
                  </TableHeader>
                  <TableBody>
                    {elevationColourTokens.map(({ token, purpose }) => (
                      <Row id={token} key={token}>
                        <Cell><code>{token}</code></Cell>
                        <Cell>{purpose}</Cell>
                        <Cell><TokenValue token={token} /></Cell>
                      </Row>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>),
            },
            {
              id: 'elevation-theming',
              title: 'Theming',
              content: (<>
              <p className="component-section-description">
                The level shapes are shared and come from the Wireframe baseline. Each theme then sets what makes it different:
              </p>
              <DocsTable aria-label="What each theme sets" nameColumn="Theme" descriptionColumn="Sets" namesAreCode={false}
                rows={elevationThemeRows.map(({ theme, sets }) => ({ name: theme, description: sets }))} />
            </>),
            },
            {
              id: 'elevation-accessibility',
              title: 'Accessibility',
              content: <p className="component-section-description">{elevationFocusNote}</p>,
            },
          ],
        },
      ]}
      relatedPages={elevationRelatedPages}
      references={elevationReferences}
    />
  )
}
