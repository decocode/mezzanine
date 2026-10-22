import { GridList, GridListItem } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { gridListContent, gridListExampleLabels } from './gridListContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GridListPage() {
  return (
    <ContentPage
      content={gridListContent}
      parts={{
        example: <ExampleZone>
          <GridList aria-label={gridListExampleLabels.stack} selectionMode="multiple" defaultSelectedKeys={[gridListExampleLabels.items[0]]}>
            {gridListExampleLabels.items.map((item) => <GridListItem key={item} id={item}>{item}</GridListItem>)}
          </GridList>
        </ExampleZone>,
        variants: <ExampleZone>
          <GridList aria-label={gridListExampleLabels.grid} layout="grid" selectionMode="single">
            {gridListExampleLabels.items.map((item) => <GridListItem key={item} id={item}>{item}</GridListItem>)}
          </GridList>
        </ExampleZone>,
      }}
    />
  )
}
