import { useState } from 'react'
import { DemoArea, ListBox, ListBoxItem, ListLayout, Virtualizer } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { virtualizerContent, virtualizerExampleCode, virtualizerExampleItems, virtualizerExampleLabel, virtualizerGaps } from './virtualizerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function VirtualizerPage() {
  const [gap, setGap] = useState<(typeof virtualizerGaps)[number]>('0')
  return (
    <ContentPage
      content={virtualizerContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={virtualizerExampleCode(Number(gap))}
            endPanel={<PanelSelect label="layoutOptions.gap" options={virtualizerGaps} value={gap} onChange={setGap} />}
          >
            <div className="virtualizer-example">
              <Virtualizer layout={ListLayout} layoutOptions={{ estimatedRowHeight: 40, gap: Number(gap) }}>
                <ListBox aria-label={virtualizerExampleLabel} items={virtualizerExampleItems}>
                  {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
                </ListBox>
              </Virtualizer>
            </div>
          </DemoArea>
        ),
      }}
    />
  )
}
