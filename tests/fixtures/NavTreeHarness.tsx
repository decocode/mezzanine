import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Badge, NavTree, type NavTreeProps } from '../../src/index'
import '../../src/themes/light.css'
import '../../src/themes/dark.css'
import '../../src/themes/wireframe.css'

const initialItems: NavTreeProps['items'] = [
  { type: 'section', id: 'section', label: 'Section', children: [
    { id: 'a', label: 'Branch A', children: [
      { id: 'nested', label: 'Nested', children: [{ id: 'leaf-a', label: 'Leaf A', href: '#a', content: <Badge>WIP</Badge> }] },
    ] },
    { id: 'b', label: 'Branch B', href: '#branch-b', children: [{ id: 'leaf-b', label: 'Leaf B', href: '#b' }] },
    { id: 'empty', label: 'Empty', children: [] },
    { id: 'disabled', label: 'Disabled', href: '#disabled', isDisabled: true },
  ] },
]
function Harness() {
  const [items, setItems] = useState(initialItems)
  const [route, setRoute] = useState<string | null>('#a')
  const [keys, setKeys] = useState<Set<string | number>>(new Set())
  const [controlled, setControlled] = useState(false)
  const [accept, setAccept] = useState(true)
  const [requests, setRequests] = useState<(string | number)[][]>([])
  const [version, setVersion] = useState(0)
  Object.assign(window, { navTreeHarness: {
    setItems, setRoute, setKeys, setControlled, setAccept, setVersion,
    initialItems, requests,
  } })
  return <><NavTree aria-label="Isolated navigation" items={items} selectedRoute={route}
    className={() => `consumer-tree version-${version}`} style={() => ({ maxWidth: '100%' })}
    expandedKeys={controlled ? keys : undefined}
    onExpandedChange={next => { setRequests(current => [...current, [...next]]); if (accept) setKeys(next) }}
  /><button>After tree</button></>
}
createRoot(document.getElementById('root')!).render(<StrictMode><Harness /></StrictMode>)
