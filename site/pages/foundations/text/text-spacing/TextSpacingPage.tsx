import { DemoArea } from '@decocode/mezzanine'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'
import { textSpacingCode, textSpacingContent, textSpacingExample, textSpacingRoles } from './textSpacingContent'

export default function TextSpacingPage() {
  return (
    <ContentPage
      content={textSpacingContent}
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
        roles: <TokenScale items={textSpacingRoles} sample="length" />,
      }}
    />
  )
}
