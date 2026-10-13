import { useRef } from 'react'
import { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel } from '@decocode/mezzanine'
import type { DocumentationSection } from '../templates/ComponentPageTemplate'
import { useDocsDisclosureGroupLogic } from './DocsDisclosureGroupLogic'

interface DocsDisclosureGroupProps {
  labelledBy: string
  sections: readonly DocumentationSection[]
}

export function DocsDisclosureGroup({ labelledBy, sections }: DocsDisclosureGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null)
  const { expandedKeys, setExpandedKeys } = useDocsDisclosureGroupLogic(groupRef)

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
