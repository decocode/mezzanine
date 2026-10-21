import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { colorRolesContent, colorTokenGroups } from './colorRolesContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ColorRolesPage() {
  return (
    <ContentPage
      content={colorRolesContent}
      parts={{
        colorRoles: (
          <div className="documentation-table">
            <Table aria-label="Color roles">
              <TableHeader>
                <Column id="role" isRowHeader>Role</Column>
                <Column id="token">CSS token</Column>
                <Column id="meaning">Purpose</Column>
              </TableHeader>
              <TableBody>
                {colorTokenGroups.flatMap((group) => group.tokens).map((colorToken) => (
                  <Row id={colorToken.token} key={colorToken.token}>
                    <Cell><strong>{colorToken.label}</strong></Cell>
                    <Cell><code>{colorToken.token}</code></Cell>
                    <Cell>{colorToken.description}</Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
