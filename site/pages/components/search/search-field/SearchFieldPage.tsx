import { useState } from 'react'
import { DemoBlock, SearchField, Switch } from '@decocode/mezzanine'
import { searchFieldContent, searchFieldExampleCode, searchFieldExampleProps, searchFieldFlags } from './searchFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchFieldPage() {
  const [flags, setFlags] = useState<Record<(typeof searchFieldFlags)[number], boolean>>({ description: false, isInvalid: false, isReadOnly: false, isDisabled: false })
  const panelSwitch = (name: (typeof searchFieldFlags)[number]) => (
    <Switch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
  )
  return (
    <ContentPage
      content={searchFieldContent}
      parts={{
        example: (
          <DemoBlock
            codeView={searchFieldExampleCode(flags)}
            endPanel={<>
              {/* The field's parts in their own order, then the states that affect the whole field. A
                  field is either disabled or invalid, so each of those switches hides while the other is on. */}
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
            </>}
          >
            <SearchField {...searchFieldExampleProps(flags)} />
          </DemoBlock>
        ),
      }}
    />
  )
}
