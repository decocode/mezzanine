import { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel } from '@decocode/mezzanine'
import type { DocumentationSection } from '../templates/DocsPageTemplate'
import { useDocsDisclosureGroupLogic } from './DocsDisclosureGroupLogic'

interface DocsDisclosureGroupProps {
  labelledBy: string
  sections: readonly DocumentationSection[]
}

export function DocsDisclosureGroup({ labelledBy, sections }: DocsDisclosureGroupProps) {
  const { groupRef, expandedKeys, setExpandedKeys } = useDocsDisclosureGroupLogic()

  return (
    <DisclosureGroup ref={groupRef} aria-labelledby={labelledBy} allowsMultipleExpanded expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
      {sections.map(({ id, title, content }) => (
        <Disclosure key={id} id={id} data-documentation-disclosure={id}>
          <DisclosureHeader id={id} level={3}>{title}</DisclosureHeader>
          <DisclosurePanel>{content}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  )
}
