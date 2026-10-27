// The examples for the Container queries page, in Foundations › Layout.
import { Card, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { containerQueriesCssNotes } from './containerQueriesContent'

// The same item adapts to whichever container it is placed in. Its title can name the container.
function QueryItem({ title = 'Item' }: { title?: string }) {
  return <div className="example-container">
    <Card>
      <div className="example-item-layout">
        <div className="example-item example-card-image mz-text-body-sm">Image</div>
        <div className="example-item-text">
          <Heading level={4}>{title}</Heading>
          <Text elementType="p" className="mz-text-body-md">Stacks in narrow space and sits side by side when its container is at least 26rem.</Text>
        </div>
      </div>
    </Card>
  </div>
}

export function TwoContainersExample() {
  return <>
    <ExampleText>The same item twice, side by side. Each one looks at its own container, so the narrow one stacks its image above the text and the wide one puts them side by side. In a narrower frame, the wide container drops underneath and changes too.</ExampleText>
    <WidthDemo label="A narrow container and a wide container" code={containerQueriesCssNotes.twoContainers.code}>
      <div className="example-two-containers">
        <QueryItem title="Narrow container" />
        <QueryItem title="Wide container" />
      </div>
    </WidthDemo>
    <CssNotes name="the two containers" note={containerQueriesCssNotes.twoContainers} level={3} showCode={false} />
  </>
}

export function OneContainerExample() {
  return <>
    <ExampleText>Above about 26rem, the item changes layout, while the window stays the same size.</ExampleText>
    <WidthDemo label="One container" width="20rem" code={containerQueriesCssNotes.oneContainer.code}>
      <QueryItem />
    </WidthDemo>
    <CssNotes name="the item" note={containerQueriesCssNotes.oneContainer} level={3} showCode={false} />
  </>
}
