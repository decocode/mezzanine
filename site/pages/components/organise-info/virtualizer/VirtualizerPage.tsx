import { DemoArea, ListBox, ListBoxItem, ListLayout, Virtualizer } from '@decocode/mezzanine'
import { virtualizerContent, virtualizerExampleItems, virtualizerExampleLabel } from './virtualizerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function VirtualizerPage() {
  return (
    <ContentPage
      content={virtualizerContent}
      parts={{
        example: <DemoArea align="stretch">
          <div className="virtualizer-example">
            <Virtualizer layout={ListLayout} layoutOptions={{ estimatedRowHeight: 40 }}>
              <ListBox aria-label={virtualizerExampleLabel} items={virtualizerExampleItems}>
                {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
              </ListBox>
            </Virtualizer>
          </div>
        </DemoArea>,
      }}
    />
  )
}
