import { useState } from 'react'
import { DemoArea, Tag, TagGroup } from '@decocode/mezzanine'
import { tagGroupContent, tagGroupExampleLabels } from './tagGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'

function RemovableTags() {
  const [tags, setTags] = useState<string[]>([...tagGroupExampleLabels.tags])
  return (
    <TagGroup label={tagGroupExampleLabels.removable} onRemove={(keys) => setTags((current) => current.filter((tag) => !keys.has(tag)))}>
      {tags.map((tag) => <Tag key={tag} id={tag}>{tag}</Tag>)}
    </TagGroup>
  )
}

export default function TagGroupPage() {
  return (
    <ContentPage
      content={tagGroupContent}
      parts={{
        example: <DemoArea>
          <TagGroup label={tagGroupExampleLabels.selectable} selectionMode="multiple" defaultSelectedKeys={[tagGroupExampleLabels.tags[0]]}>
            {tagGroupExampleLabels.tags.map((tag) => <Tag key={tag} id={tag}>{tag}</Tag>)}
          </TagGroup>
        </DemoArea>,
        variants: <DemoArea><RemovableTags /></DemoArea>,
      }}
    />
  )
}
