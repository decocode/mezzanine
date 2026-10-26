import { useState } from 'react'
import { DemoArea, Input, Label, SearchField } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { searchFieldContent, searchFieldExampleCode, searchFieldExampleLabel, searchFieldFlags } from './searchFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchFieldPage() {
  const [flags, setFlags] = useState<Record<(typeof searchFieldFlags)[number], boolean>>({ isDisabled: false, isReadOnly: false, isInvalid: false })
  return (
    <ContentPage
      content={searchFieldContent}
      parts={{
        example: (
          <DemoArea
            codeView={searchFieldExampleCode(flags)}
            endPanel={searchFieldFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <SearchField {...flags}><Label>{searchFieldExampleLabel}</Label><Input /></SearchField>
          </DemoArea>
        ),
      }}
    />
  )
}
