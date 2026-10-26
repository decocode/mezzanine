import { useState } from 'react'
import { CodeBlock, DemoArea } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  codeBlockContent, codeBlockExample, codeBlockExampleCodeView, codeBlockFeatureExamples, codeBlockFlags, codeBlockLanguages, codeBlockStartLines,
} from './codeBlockContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function CodeBlockPage() {
  const [language, setLanguage] = useState<(typeof codeBlockLanguages)[number] | null>(null)
  const [startLine, setStartLine] = useState<(typeof codeBlockStartLines)[number]>('1')
  const [flags, setFlags] = useState<Record<(typeof codeBlockFlags)[number], boolean>>({
    title: false, showLineNumbers: false, highlightedLines: false, addedLines: false, removedLines: false,
  })
  const { code, ...lines } = codeBlockExample(flags, flags.showLineNumbers ? Number(startLine) : 1)
  const flagSwitch = (name: (typeof codeBlockFlags)[number]) => (
    <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  return (
    <ContentPage
      content={codeBlockContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={codeBlockExampleCodeView({ language, startLine: Number(startLine), flags })}
            endPanel={<>
              <PanelSelect label="language" options={codeBlockLanguages} value={language} onChange={setLanguage} />
              {flagSwitch('title')}
              {flagSwitch('showLineNumbers')}
              {flags.showLineNumbers && <PanelSelect label="startLine" options={codeBlockStartLines} value={startLine} onChange={setStartLine} />}
              {flagSwitch('highlightedLines')}
              {flagSwitch('addedLines')}
              {flagSwitch('removedLines')}
            </>}
          >
            <CodeBlock
              language={language ?? undefined}
              title={flags.title ? codeBlockFeatureExamples.title : undefined}
              showLineNumbers={flags.showLineNumbers}
              startLine={flags.showLineNumbers ? Number(startLine) : undefined}
              {...lines}
            >
              {code}
            </CodeBlock>
          </DemoArea>
        ),
      }}
    />
  )
}
