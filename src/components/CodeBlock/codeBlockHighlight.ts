import type { HighlighterCore } from 'shiki/core'

// The languages CodeBlock can highlight. Each loads only when a page first shows code in it.
const languageLoaders = {
  bash: () => import('shiki/langs/bash.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
}

export type CodeBlockLanguage = keyof typeof languageLoaders

// The kinds of code the syntax colour roles cover. Anything else, such as a parameter, is plain text.
export type SyntaxKind = 'keyword' | 'string' | 'comment' | 'function' | 'constant' | 'punctuation'
const kinds: Record<string, SyntaxKind> = {
  keyword: 'keyword', string: 'string', 'string-expression': 'string', link: 'string',
  comment: 'comment', function: 'function', constant: 'constant', punctuation: 'punctuation',
}

export interface SyntaxToken {
  text: string
  kind?: SyntaxKind
}

let highlighter: Promise<HighlighterCore> | undefined
const highlighted = new Map<string, Promise<SyntaxToken[][] | undefined>>()

// Shiki and its JavaScript engine load on first use. Its theme is made of private CSS variables, so
// every colour comes from Mezzanine's syntax roles and follows the theme.
function loadHighlighter() {
  highlighter ??= Promise.all([import('shiki/core'), import('shiki/engine/javascript')])
    .then(([{ createHighlighterCore, createCssVariablesTheme }, { createJavaScriptRegexEngine }]) => createHighlighterCore({
      themes: [createCssVariablesTheme({ name: 'mezzanine', variablePrefix: '--_syntax-', variableDefaults: {}, fontStyle: false })],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    }))
  return highlighter
}

// The code's lines, each split into tokens with their kind. The same code and language always return the
// same promise, so a component can read it with React's use() while rendering. If highlighting fails, the
// promise gives undefined and the code shows as plain text.
export function highlightCode(code: string, language: CodeBlockLanguage): Promise<SyntaxToken[][] | undefined> {
  const key = `${language}\n${code}`
  let result = highlighted.get(key)
  if (!result) {
    result = loadHighlighter().then(async core => {
      if (!core.getLoadedLanguages().includes(language)) await core.loadLanguage(languageLoaders[language]())
      return core.codeToTokens(code.replace(/\n$/, ''), { lang: language, theme: 'mezzanine' }).tokens.map(line => line.map(token => ({
        text: token.content,
        kind: kinds[token.color?.match(/--_syntax-token-([a-z-]+)/)?.[1] ?? ''],
      })))
    }).catch(() => undefined)
    highlighted.set(key, result)
  }
  return result
}
