import { Button, ExternalLinkIcon } from '@decocode/mezzanine'
import { accessibilityContent, accessibilityFeedbackButton } from './accessibilityContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function AccessibilityPage() {
  return (
    <ContentPage
      content={accessibilityContent}
      parts={{
        target: (
          <Button
            href={accessibilityFeedbackButton.href}
            hierarchy="secondary"
            iconTrailing={<ExternalLinkIcon />}
          >
            {accessibilityFeedbackButton.label}
          </Button>
        ),
      }}
    />
  )
}
