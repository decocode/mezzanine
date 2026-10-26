import { useState } from 'react'
import { DemoArea, GridList, GridListItem } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { gridListContent, gridListExampleCode, gridListExampleLabels, gridListLayouts, gridListSelectionModes } from './gridListContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GridListPage() {
  const [layout, setLayout] = useState<(typeof gridListLayouts)[number]>('stack')
  const [selectionMode, setSelectionMode] = useState<(typeof gridListSelectionModes)[number]>('multiple')
  const [disabledKeys, setDisabledKeys] = useState(false)
  return (
    <ContentPage
      content={gridListContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={gridListExampleCode({ layout, selectionMode, disabledKeys })}
            endPanel={<>
              <PanelSelect label="layout" options={gridListLayouts} value={layout} onChange={setLayout} />
              <PanelSelect label="selectionMode" options={gridListSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              <PanelSwitch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</PanelSwitch>
            </>}
          >
            {/* A new key starts the list again, so a change of selection mode clears its choices. */}
            <GridList
              key={selectionMode}
              aria-label={gridListExampleLabels.label}
              layout={layout}
              selectionMode={selectionMode}
              disabledKeys={disabledKeys ? [gridListExampleLabels.items[2]] : undefined}
            >
              {gridListExampleLabels.items.map((item) => <GridListItem key={item} id={item}>{item}</GridListItem>)}
            </GridList>
          </DemoArea>
        ),
      }}
    />
  )
}
