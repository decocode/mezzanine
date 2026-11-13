import { Button, DemoBlock, Link, TopBar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { PanelSwitch } from '../../../components/PanelSwitch'
import { topBarContent, topBarExampleCode, topBarFlags } from './topBarContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function TopBarPage() {
  const [destination, setDestination] = useState('Home link')
  const [isSaved, setIsSaved] = useState(false)
  const [flags, setFlags] = useState<Record<(typeof topBarFlags)[number], boolean>>({ brand: true, actions: true })
  return (
    <ContentPage
      content={topBarContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            className="top-bar-example"
            codeView={topBarExampleCode(flags)}
            endPanel={topBarFlags.map((name) => (
              <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
            ))}
          >
            <RouterProvider navigate={(href) => setDestination(decodeURIComponent(href.slice(1)))}>
              <TopBar aria-label="Example navigation"
                brand={flags.brand ? <Link href="#Home%20link" aria-label="Example home"><span aria-hidden="true" className="site-logo" /></Link> : undefined}
                actions={flags.actions ? <Button onPress={() => setIsSaved(true)} isDisabled={isSaved}>{isSaved ? 'Saved' : 'Button'}</Button> : undefined}>
                {({ closeMenu }) => <>
                  {['Home link', 'Link A', 'Link B'].map((label) => <Link key={label} href={`#${encodeURIComponent(label)}`} aria-current={destination === label ? 'page' : undefined} onPress={closeMenu}>{label}</Link>)}
                  <Link href="#Disabled%20link" isDisabled>Disabled link</Link>
                </>}
              </TopBar>
            </RouterProvider>
            <p role="status">{isSaved ? 'Changes saved.' : ''}</p>
          </DemoBlock>
        ),
      }}
    />
  )
}
