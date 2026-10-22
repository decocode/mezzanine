import { ListBox, ListBoxItem, ListLayout, Virtualizer } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { virtualizerContent, virtualizerExampleItems, virtualizerExampleLabel } from './virtualizerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function VirtualizerPage() {
  return (
    <ContentPage
      content={virtualizerContent}
      parts={{
        example: <ExampleZone>
          <div className="virtualizer-example">
            <Virtualizer layout={ListLayout} layoutOptions={{ estimatedRowHeight: 40 }}>
              <ListBox aria-label={virtualizerExampleLabel} items={virtualizerExampleItems}>
                {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
              </ListBox>
            </Virtualizer>
          </div>
        </ExampleZone>,
      }}
    />
  )
}
