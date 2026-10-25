import { DocsTable } from '../../../../components/DocsTable'
import { TokenValue } from '../../../../components/TokenValue'
import { ContentPage } from '../../../../templates/ContentPage'
import { fontTokens } from '../typographyContent'
import { typefaceAndFontsContent } from './typefaceAndFontsContent'

// The three font family tokens; their values are read from the token source.
const fontFamilyTokens = fontTokens.filter(({ token }) => token.startsWith('--font-family-'))

export default function TypefaceAndFontsPage() {
  return (
    <ContentPage
      content={typefaceAndFontsContent}
      parts={{
        fontFamilies: (
          <DocsTable
            aria-label="Font family tokens"
            nameColumn="Token"
            rows={fontFamilyTokens.map(({ token, purpose }) => ({ name: token, description: <>{purpose} Currently <TokenValue token={token} />.</> }))}
          />
        ),
      }}
    />
  )
}
