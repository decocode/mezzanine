import { DemoArea } from '@decocode/mezzanine'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'
import { inlineCodeContent } from './inlineCodeContent'

export default function InlineCodePage() {
  const content = withValues(inlineCodeContent, {
    inlineCodePaddingBlock: useTokenValue('--inline-code-padding-block'),
    inlineCodePaddingInline: useTokenValue('--inline-code-padding-inline'),
    inlineCodeBorderRadius: useTokenValue('--inline-code-border-radius'),
  })
  return (
    <ContentPage
      content={content}
      parts={{
        example: (
          <DemoArea>
            <p className="mz-text-body-md">The <code>--space-4</code> token stores <code>1rem</code> by default.</p>
          </DemoArea>
        ),
      }}
    />
  )
}
