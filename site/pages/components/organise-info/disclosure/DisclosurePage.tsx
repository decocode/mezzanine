import { useState } from 'react'
import {
  DemoBlock, Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel, ExternalLinkIcon, Link,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  disclosureContent, disclosureExampleCode, disclosureFlags, disclosureGroupExampleCode, disclosureGroupFlags, disclosureGroupItems, disclosureGroupReactAriaLink,
} from './disclosureContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function DisclosurePage() {
  const [flags, setFlags] = useState<Record<(typeof disclosureFlags)[number], boolean>>({ defaultExpanded: true, isDisabled: false })
  const [groupFlags, setGroupFlags] = useState<Record<(typeof disclosureGroupFlags)[number], boolean>>({ allowsMultipleExpanded: false, isDisabled: false })
  return (
    <ContentPage
      content={disclosureContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={disclosureExampleCode(flags)}
            endPanel={disclosureFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            {/* A new key starts the disclosure again, because a default only applies when it first appears. */}
            <Disclosure key={String(flags.defaultExpanded)} {...flags}>
              <DisclosureHeader>Disclosure</DisclosureHeader>
              <DisclosurePanel>
                DisclosurePanel content.
              </DisclosurePanel>
            </Disclosure>
          </DemoBlock>
        ),
        disclosureGroup: (<>
          <Link
            className="react-aria-documentation-link"
            href={disclosureGroupReactAriaLink.href}
          >
            <span>{disclosureGroupReactAriaLink.label}</span>
            <ExternalLinkIcon />
          </Link>
          <DemoBlock
            align="stretch"
            codeView={disclosureGroupExampleCode(groupFlags)}
            endPanel={disclosureGroupFlags.map((name) => (
              <PanelSwitch key={name} isSelected={groupFlags[name]} onChange={(isSelected) => setGroupFlags({ ...groupFlags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <DisclosureGroup defaultExpandedKeys={['disclosure-a']} {...groupFlags}>
              {disclosureGroupItems.map((item) => (
                <Disclosure key={item} id={`disclosure-${item.toLowerCase()}`}>
                  <DisclosureHeader>Disclosure {item}</DisclosureHeader>
                  <DisclosurePanel>DisclosurePanel {item} content.</DisclosurePanel>
                </Disclosure>
              ))}
            </DisclosureGroup>
          </DemoBlock>
        </>),
      }}
    />
  )
}
