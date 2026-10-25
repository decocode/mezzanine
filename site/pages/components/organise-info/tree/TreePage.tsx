import { DemoArea, Tree, TreeItem } from '@decocode/mezzanine'
import { treeContent, treeExampleLabels } from './treeContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TreePage() {
  return (
    <ContentPage
      content={treeContent}
      parts={{
        example: <DemoArea align="stretch">
          <Tree aria-label={treeExampleLabels.label} selectionMode="single" selectionBehavior="replace" defaultExpandedKeys={[treeExampleLabels.branches[0].title]}>
            {treeExampleLabels.branches.map((branch) => (
              <TreeItem key={branch.title} id={branch.title} title={branch.title}>
                {branch.leaves.map((leaf) => <TreeItem key={leaf} id={leaf} title={leaf} />)}
              </TreeItem>
            ))}
            <TreeItem id={treeExampleLabels.leaf} title={treeExampleLabels.leaf} />
          </Tree>
        </DemoArea>,
      }}
    />
  )
}
