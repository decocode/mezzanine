import { useState } from 'react'
import { DemoArea, Tag, TagGroup } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { tagGroupContent, tagGroupExampleCode, tagGroupExampleLabels, tagGroupExampleText, tagGroupSelectionModes } from './tagGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TagGroupPage() {
  const [tags, setTags] = useState<string[]>([...tagGroupExampleLabels.tags])
  const [selectionMode, setSelectionMode] = useState<(typeof tagGroupSelectionModes)[number]>('multiple')
  const [removable, setRemovable] = useState(false)
  const [description, setDescription] = useState(false)
  return (
    <ContentPage
      content={tagGroupContent}
      parts={{
        example: (
          <DemoArea
            codeView={tagGroupExampleCode({ selectionMode, removable, description })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={tagGroupSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              <PanelSwitch isSelected={removable} onChange={(isSelected) => { setRemovable(isSelected); setTags([...tagGroupExampleLabels.tags]) }}>onRemove</PanelSwitch>
              <PanelSwitch isSelected={description} onChange={setDescription}>description</PanelSwitch>
            </>}
          >
            {/* A new key starts the group again, so a change of selection mode clears its choices. */}
            <TagGroup
              key={selectionMode}
              label={tagGroupExampleLabels.label}
              selectionMode={selectionMode}
              description={description ? tagGroupExampleText.description : undefined}
              onRemove={removable ? (keys) => setTags((current) => current.filter((tag) => !keys.has(tag))) : undefined}
            >
              {tags.map((tag) => <Tag key={tag} id={tag}>{tag}</Tag>)}
            </TagGroup>
          </DemoArea>
        ),
      }}
    />
  )
}
