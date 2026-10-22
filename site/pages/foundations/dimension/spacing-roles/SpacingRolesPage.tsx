import { spacingRoleLevels, spacingRolesContent } from './spacingRolesContent'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SpacingRolesPage() {
  return <ContentPage content={spacingRolesContent} parts={{ spacingRoles: <TokenScale items={spacingRoleLevels} sample="length" /> }} />
}
