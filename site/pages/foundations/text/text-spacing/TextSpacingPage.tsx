import { DemoArea } from '@decocode/mezzanine'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { withValues } from '../../../../templates/docsPageContent'
import { textSpacingCode, textSpacingContent, textSpacingExample, textSpacingList, textSpacingRoles } from './textSpacingContent'

export default function TextSpacingPage() {
  const content = withValues(textSpacingContent, { listItemSpacing: useTokenValue('--space-2'), listIndent: useTokenValue('--space-6') })
  return (
    <ContentPage
      content={content}
      parts={{
        example: (
          <DemoArea codeView={textSpacingCode}>
            <div className="mz-prose">
              <h2>{textSpacingExample.headingLarge}</h2>
              <p className="mz-text-body-md">{textSpacingExample.intro}</p>
              <p className="mz-text-body-md">{textSpacingExample.second}</p>
              <h3>{textSpacingExample.headingMedium}</h3>
              <p className="mz-text-body-md">{textSpacingExample.third}</p>
              <ul className="mz-text-body-md">{textSpacingExample.list.map((item) => <li key={item}>{item}</li>)}</ul>
              <h4>{textSpacingExample.headingSmall}</h4>
              <p className="mz-text-body-md">{textSpacingExample.fourth}</p>
            </div>
          </DemoArea>
        ),
        lists: (
          <DemoArea>
            <ul className="mz-text-body-md">
              <li>{textSpacingList.items[0]}</li>
              <li>{textSpacingList.items[1]}
                <ul>{textSpacingList.nested.map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            </ul>
          </DemoArea>
        ),
        roles: <TokenScale items={textSpacingRoles} sample="length" />,
      }}
    />
  )
}
