import { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel } from '@decocode/mezzanine'
import type { DocumentationSection } from '../templates/DocsPageTemplate'
import { useDocsDisclosureGroupLogic } from './DocsDisclosureGroupLogic'

interface DocsDisclosureGroupProps {
  labelledBy: string
  sections: readonly DocumentationSection[]
  // 3 inside a section group; 2 when a collapsible section stands at the top level of the page.
  headingLevel?: 2 | 3
}

export function DocsDisclosureGroup({ labelledBy, sections, headingLevel = 3 }: DocsDisclosureGroupProps) {
  const { groupRef, expandedKeys, setExpandedKeys } = useDocsDisclosureGroupLogic()

  return (
    <DisclosureGroup ref={groupRef} className="docs-disclosure-group" aria-labelledby={labelledBy} allowsMultipleExpanded expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
      {sections.map(({ id, title, content }) => (
        <Disclosure key={id} id={id} data-documentation-disclosure={id}>
          <DisclosureHeader id={id} level={headingLevel}>{title}</DisclosureHeader>
          <DisclosurePanel>{content}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  )
}
