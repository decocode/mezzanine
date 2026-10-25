import { DemoArea } from '@decocode/mezzanine'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'
import { listItems, listsContent } from './listsContent'

const nestedItems = listItems.nested.map((item) => <li key={String(item)}>{item}</li>)

export default function ListsPage() {
  const content = withValues(listsContent, { listItemSpacing: useTokenValue('--space-2') })
  return (
    <ContentPage
      content={content}
      parts={{
        unordered: <DemoArea><ul className="mz-text-body-md"><li>{listItems.first}</li><li>{listItems.second}<ul>{nestedItems}</ul></li></ul></DemoArea>,
        ordered: <DemoArea><ol className="mz-text-body-md"><li>{listItems.first}</li><li>{listItems.second}<ol>{nestedItems}</ol></li></ol></DemoArea>,
      }}
    />
  )
}
