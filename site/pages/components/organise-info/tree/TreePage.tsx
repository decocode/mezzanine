import { useState } from 'react'
import { DemoBlock, Tree, TreeItem } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { treeContent, treeExampleCode, treeExampleLabels, treeSelectionBehaviors, treeSelectionModes } from './treeContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TreePage() {
  const [selectionMode, setSelectionMode] = useState<(typeof treeSelectionModes)[number]>('single')
  const [selectionBehavior, setSelectionBehavior] = useState<(typeof treeSelectionBehaviors)[number]>('replace')
  const [isExpanded, setIsExpanded] = useState(true)
  const [disabledKeys, setDisabledKeys] = useState(false)
  const canSelect = selectionMode !== 'none'
  return (
    <ContentPage
      content={treeContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={treeExampleCode({ selectionMode, selectionBehavior, isExpanded, disabledKeys })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={treeSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              {canSelect && <PanelSelect label="selectionBehavior" options={treeSelectionBehaviors} value={selectionBehavior} onChange={setSelectionBehavior} />}
              <PanelSwitch isSelected={isExpanded} onChange={setIsExpanded}>defaultExpandedKeys</PanelSwitch>
              <PanelSwitch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</PanelSwitch>
            </>}
          >
            {/* A new key starts the tree again, because its defaults only apply when it first appears. */}
            <Tree
              key={`${selectionMode}-${isExpanded}`}
              aria-label={treeExampleLabels.label}
              selectionMode={selectionMode}
              selectionBehavior={selectionBehavior}
              defaultExpandedKeys={isExpanded ? [treeExampleLabels.branches[0].title] : undefined}
              disabledKeys={disabledKeys ? [treeExampleLabels.leaf] : undefined}
            >
              {treeExampleLabels.branches.map((branch) => (
                <TreeItem key={branch.title} id={branch.title} title={branch.title}>
                  {branch.leaves.map((leaf) => <TreeItem key={leaf} id={leaf} title={leaf} />)}
                </TreeItem>
              ))}
              <TreeItem id={treeExampleLabels.leaf} title={treeExampleLabels.leaf} />
            </Tree>
          </DemoBlock>
        ),
      }}
    />
  )
}
