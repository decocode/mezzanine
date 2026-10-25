import { useState } from 'react'
import { DemoArea, ListBoxItem, Select, type SelectHierarchy } from '@decocode/mezzanine'
import {
  selectContent, selectDefaultKeyLabel, selectExampleCode, selectExampleLabels, selectHierarchies, selectHierarchyLabel,
} from './selectContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SelectPage() {
  const [hierarchy, setHierarchy] = useState<SelectHierarchy>('primary')
  const [defaultKey, setDefaultKey] = useState<string | null>(null)
  return (
    <ContentPage
      content={selectContent}
      parts={{
        example: (
          <DemoArea
            codeView={selectExampleCode(hierarchy, defaultKey)}
            endPanel={<>
              <Select label={selectHierarchyLabel} selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as SelectHierarchy) }}>
                {selectHierarchies.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label={selectDefaultKeyLabel} selectedKey={defaultKey} onSelectionChange={(key) => { if (key != null) setDefaultKey(String(key)) }}>
                {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Select
              key={defaultKey ?? ''}
              label={selectExampleLabels.label}
              hierarchy={hierarchy}
              defaultSelectedKey={defaultKey ?? undefined}
            >
              {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
            </Select>
          </DemoArea>
        ),
      }}
    />
  )
}
