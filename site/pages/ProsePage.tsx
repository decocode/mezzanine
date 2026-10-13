import { PageHeading } from '../templates/ComponentPageTemplate'
import { ExampleZone } from '../components/ExampleZone'
import { TableOfContents } from '@decocode/mezzanine'
import { useTokenValue } from '../components/tokenValueLogic'

export default function ProsePage({ refreshKey }: { refreshKey: string }) {
  const listItemSpacing = useTokenValue('--space-2', refreshKey)
  return (
    <>
      <PageHeading title="Prose" description="Mezzanine’s styling for longer-form content. Lists share the body text styles and spacing tokens; inline code has a distinct treatment within the surrounding text." />
      <p className="component-section-description mz-text-body-md">The library includes body-styled lists and inline code, but does not yet provide a complete prose container. The section spacing and reading widths on this documentation site are site layout styles, not part of the library.</p>
      <TableOfContents sections={[
        { id: 'lists-heading', label: 'Lists', children: [
          { id: 'unordered-list-heading', label: 'Unordered lists' },
          { id: 'ordered-list-heading', label: 'Ordered lists' },
        ] },
        { id: 'inline-code-heading', label: 'Inline code' },
      ]} />
      <section aria-labelledby="lists-heading" className="component-section">
        <h2 id="lists-heading" className="mz-text-heading-md">Lists</h2>
        <p className="component-section-description mz-text-body-md">Unordered lists use bullet points; ordered lists use numbers. Both share the chosen body style’s line height, with <code>--space-2</code> between items (currently <code>{listItemSpacing}</code>) and <code>--space-6</code> indentation at each level. Wrapped lines align with the item text.</p>
        <p className="component-section-description mz-text-body-md">Apply a body text class, such as <code>mz-text-body-md</code>, to the list to use these styles. Nested lists inherit the same styling.</p>
        <section aria-labelledby="unordered-list-heading">
          <h3 id="unordered-list-heading" className="mz-text-heading-sm">Unordered lists</h3>
          <p className="component-section-description mz-text-body-md">An unordered list uses <code>&lt;ul&gt;</code> to group related items whose order is not significant. Filled bullet points mark the first level; nested items use hollow bullet points and an additional indent.</p>
          <h4 className="mz-text-title-lg">Example</h4>
          <ExampleZone>
            <ul className="mz-text-body-md">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Sed do eiusmod tempor incididunt.
                <ul>
                  <li>Ut enim ad minim veniam.</li>
                  <li>Quis nostrud exercitation ullamco laboris.</li>
                </ul>
              </li>
            </ul>
          </ExampleZone>
        </section>
        <section aria-labelledby="ordered-list-heading">
          <h3 id="ordered-list-heading" className="mz-text-heading-sm">Ordered lists</h3>
          <p className="component-section-description mz-text-body-md">An ordered list uses <code>&lt;ol&gt;</code> to group items in a meaningful sequence, such as steps or rankings. Numbered markers use the same body style as the list text. Nested lists are indented and restart numbering at 1.</p>
          <h4 className="mz-text-title-lg">Example</h4>
          <ExampleZone>
            <ol className="mz-text-body-md">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Sed do eiusmod tempor incididunt.
                <ol>
                  <li>Ut enim ad minim veniam.</li>
                  <li>Quis nostrud exercitation ullamco laboris.</li>
                </ol>
              </li>
            </ol>
          </ExampleZone>
        </section>
      </section>
      <section aria-labelledby="inline-code-heading" className="component-section">
        <h2 id="inline-code-heading" className="mz-text-heading-md">
          Inline code
        </h2>
        <p className="component-section-description">
          Inline code uses <code>&lt;code&gt;</code> to identify tokens, property names, values and
          other technical text within a sentence. A monospace font and contrasting background
          distinguish it from the surrounding text.
        </p>
        <p className="component-section-description">Code inside <code>&lt;pre&gt;</code> retains the monospace font without the inline background or padding. Code-block layout is supplied by the consuming app.</p>
        <h4 className="mz-text-title-lg">Example</h4>
        <ExampleZone>
          <p className="mz-text-body-md">
            The <code>--space-4</code> token stores <code>1rem</code> by default.
          </p>
        </ExampleZone>
      </section>
    </>
  )
}
