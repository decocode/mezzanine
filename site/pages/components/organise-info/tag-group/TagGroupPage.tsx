import { useState } from 'react'
import { DemoBlock, Switch, Tag, TagGroup } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { tagGroupContent, tagGroupExampleCode, tagGroupExampleLabels, tagGroupExampleText, tagGroupSelectionModes } from './tagGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TagGroupPage() {
  const [tags, setTags] = useState<string[]>([...tagGroupExampleLabels.tags])
  const [selectionMode, setSelectionMode] = useState<(typeof tagGroupSelectionModes)[number]>('multiple')
  const [removable, setRemovable] = useState(false)
  const [description, setDescription] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  return (
    <ContentPage
      content={tagGroupContent}
      parts={{
        example: (
          <DemoBlock
            codeView={tagGroupExampleCode({ selectionMode, description, errorMessage, removable })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={tagGroupSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              {/* The group's parts in their own order: help text, error, then the tags. React Aria's TagGroup
                  has no invalid state, so the error message has its own switch. */}
              <Switch isSelected={description} onChange={setDescription}>description</Switch>
              <Switch isSelected={errorMessage} onChange={setErrorMessage}>errorMessage</Switch>
              <Switch isSelected={removable} onChange={(isSelected) => { setRemovable(isSelected); setTags([...tagGroupExampleLabels.tags]) }}>onRemove</Switch>
            </>}
          >
            {/* A new key starts the group again, so a change of selection mode clears its choices. */}
            <TagGroup
              key={selectionMode}
              label={tagGroupExampleLabels.label}
              selectionMode={selectionMode}
              description={description ? tagGroupExampleText.description : undefined}
              errorMessage={errorMessage ? tagGroupExampleText.errorMessage : undefined}
              onRemove={removable ? (keys) => setTags((current) => current.filter((tag) => !keys.has(tag))) : undefined}
            >
              {tags.map((tag) => <Tag key={tag} id={tag}>{tag}</Tag>)}
            </TagGroup>
          </DemoBlock>
        ),
      }}
    />
  )
}
