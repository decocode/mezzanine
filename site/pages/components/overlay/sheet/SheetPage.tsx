import { useState } from 'react'
import { Button, DemoBlock, Heading, Sheet, SheetTrigger, Switch, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { sheetContent, sheetExampleCode, sheetExampleLabels, sheetPositions } from './sheetContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SheetPage() {
  const [position, setPosition] = useState<(typeof sheetPositions)[number]>('bottom')
  const [preventDismissal, setPreventDismissal] = useState(false)
  const [overscrollPadding, setOverscrollPadding] = useState(true)
  return (
    <ContentPage
      content={sheetContent}
      parts={{
        example: (
          <DemoBlock
            codeView={sheetExampleCode({ position, preventDismissal, overscrollPadding })}
            endPanel={<>
              <PanelSelect label="position" options={sheetPositions} value={position} onChange={setPosition} />
              <Switch isSelected={preventDismissal} onChange={setPreventDismissal}>preventDismissal</Switch>
              <Switch isSelected={overscrollPadding} onChange={setOverscrollPadding}>overscrollPadding</Switch>
            </>}
          >
            <SheetTrigger>
              <Button hierarchy="secondary">{sheetExampleLabels.trigger}</Button>
              <Sheet position={position} preventDismissal={preventDismissal} overscrollPadding={overscrollPadding}>
                <Heading slot="title">{sheetExampleLabels.title}</Heading>
                <Text elementType="p" className="mz-text-body-md">{sheetExampleLabels.body}</Text>
                <Button slot="close" hierarchy="secondary">{sheetExampleLabels.close}</Button>
              </Sheet>
            </SheetTrigger>
          </DemoBlock>
        ),
      }}
    />
  )
}
