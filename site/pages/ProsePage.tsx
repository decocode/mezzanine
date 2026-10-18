import type { ReactNode } from 'react'
import { ExampleZone } from '../components/ExampleZone'
import { RichText } from '../components/RichText'
import { useTokenValue } from '../components/tokenValueLogic'
import { proseContent, proseExampleTitle, proseListKinds } from '../content/proseContent'
import { ContentPage } from '../templates/ContentPage'
import { withValues } from '../templates/docsPageContent'

// Puts live values into the {name} placeholders in the section introductions.
function SampleItems({ children }: { children: ReactNode }) {
  return (
    <>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
      <li>Sed do eiusmod tempor incididunt.
        {children}
      </li>
    </>
  )
}

const nestedItems = (
  <>
    <li>Ut enim ad minim veniam.</li>
    <li>Quis nostrud exercitation ullamco laboris.</li>
  </>
)

const listExamples = {
  unordered: <ul className="mz-text-body-md"><SampleItems><ul>{nestedItems}</ul></SampleItems></ul>,
  ordered: <ol className="mz-text-body-md"><SampleItems><ol>{nestedItems}</ol></SampleItems></ol>,
}

export default function ProsePage() {
  const content = withValues(proseContent, {
    listItemSpacing: useTokenValue('--space-2'),
    inlineCodePaddingBlock: useTokenValue('--inline-code-padding-block'),
    inlineCodePaddingInline: useTokenValue('--inline-code-padding-inline'),
    inlineCodeBorderRadius: useTokenValue('--inline-code-border-radius'),
  })
  return (
    <ContentPage
      content={content}
      parts={{
        lists: proseListKinds.map((kind) => (
          <section key={kind.key} aria-labelledby={`prose-${kind.key}-lists`}>
            <h3 id={`prose-${kind.key}-lists`} className="mz-text-heading-sm">{kind.title}</h3>
            <p className="component-section-description mz-text-body-md"><RichText text={kind.intro} /></p>
            <h4 className="mz-text-title-lg">{proseExampleTitle}</h4>
            <ExampleZone>{listExamples[kind.key]}</ExampleZone>
          </section>
        )),
        inlineCode: (
          <>
            <h4 className="mz-text-title-lg">{proseExampleTitle}</h4>
            <ExampleZone>
              <p className="mz-text-body-md">
                The <code>--space-4</code> token stores <code>1rem</code> by default.
              </p>
            </ExampleZone>
          </>
        ),
      }}
    />
  )
}
