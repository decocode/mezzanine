import { DemoArea, GridList, GridListItem } from '@decocode/mezzanine'
import { gridListContent, gridListExampleLabels } from './gridListContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GridListPage() {
  return (
    <ContentPage
      content={gridListContent}
      parts={{
        example: <DemoArea align="stretch">
          <GridList aria-label={gridListExampleLabels.stack} selectionMode="multiple" defaultSelectedKeys={[gridListExampleLabels.items[0]]}>
            {gridListExampleLabels.items.map((item) => <GridListItem key={item} id={item}>{item}</GridListItem>)}
          </GridList>
        </DemoArea>,
        variants: <DemoArea align="stretch">
          <GridList aria-label={gridListExampleLabels.grid} layout="grid" selectionMode="single">
            {gridListExampleLabels.items.map((item) => <GridListItem key={item} id={item}>{item}</GridListItem>)}
          </GridList>
        </DemoArea>,
      }}
    />
  )
}
