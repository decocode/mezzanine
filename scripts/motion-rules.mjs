import ts from 'typescript'

export const motionTokens = [
  '--motion-duration-interface', '--motion-duration-loading',
  '--motion-easing-enter', '--motion-easing-exit', '--motion-easing-loading',
  '--motion-scale-enter', '--motion-rotation-expanded', '--motion-rotation-cycle',
  '--motion-distance-reveal', '--motion-distance-offscreen',
]
const internalControls = ['--_motion-enabled', '--_motion-animation', '--_motion-loading-animation', '--_motion-scroll-behavior']
const oldToken = /--(?:[\w-]+-motion-(?:duration|offset)|modal-enter-scale|sidebar-enter-offset)\b/g

// Split declarations only outside parentheses/strings; retain offsets for errors.
function declarations(text) {
  const masked = text.replace(/\/\*[\s\S]*?\*\//g, value => value.replace(/[^\n]/g, ' '))
  const result = []
  const contexts = []
  let start = 0
  let depth = 0
  let quote = ''
  for (let index = 0; index < masked.length; index++) {
    const character = masked[index]
    if (quote) {
      if (character === quote && masked[index - 1] !== '\\') quote = ''
      continue
    }
    if (character === '"' || character === "'") { quote = character; continue }
    if (character === '(') depth++
    if (character === ')') depth--
    if (depth || !'{};'.includes(character)) continue
    const segment = masked.slice(start, index).trim()
    if (character === '{') contexts.push(segment)
    else {
      const colon = segment.indexOf(':')
      if (colon >= 0) result.push({ property: segment.slice(0, colon).trim(), value: segment.slice(colon + 1).trim(), position: start, contexts: [...contexts] })
      if (character === '}') contexts.pop()
    }
    start = index + 1
  }
  return { masked, declarations: result }
}

export function checkMotionCss(file, text) {
  const problems = []
  const report = (position, message) => problems.push({ position, message })
  const parsed = declarations(text)
  const tokenSource = file === 'src/tokens/motion.css'
  const policy = file === 'src/motion.css'
  for (const match of parsed.masked.matchAll(oldToken)) report(match.index, `Removed component motion token ${match[0]}.`)
  if (!policy && /prefers-reduced-motion/.test(parsed.masked)) report(0, 'Reduced-motion conditions belong only in src/motion.css.')
  for (const declaration of parsed.declarations) {
    const { property, value, position, contexts } = declaration
    const timing = /^(animation|transition)(?:$|-(?:duration|delay|timing-function)$)/.test(property)
    const animation = property === 'animation'
    const movement = /^(transform|translate|rotate|scale)$/.test(property)
    const variables = [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map(match => match[1])
    if (property.startsWith('--motion-') && !motionTokens.includes(property)) report(position, `Unapproved shared motion token ${property}.`)
    if (property.startsWith('--') && !tokenSource && !policy && (variables.some(name => motionTokens.includes(name) || internalControls.includes(name)) || /(?:motion|duration|easing)/.test(property))) {
      report(position, 'Do not create component or site motion aliases.')
    }
    if (tokenSource || policy) continue
    if ((timing || movement || property === 'animation-name' || property === 'scroll-behavior') && contexts.some(context => /data-theme.*wireframe/.test(context))) report(position, 'Wireframe motion conditions belong in the central policy.')
    if (timing) {
      if (/(?:\d|\.)\d*(?:ms|s)\b|\b(?:ease(?:-in-out|-in|-out)?|linear|step-start|step-end)\b|(?:cubic-bezier|steps)\(/.test(value)) report(position, 'Use shared duration and easing tokens, including in fallbacks.')
      if (variables.some(name => !motionTokens.includes(name) && !internalControls.includes(name))) report(position, 'Timing must consume shared motion tokens directly, not aliases.')
      if ((property.endsWith('duration') || property.endsWith('delay') || animation || property === 'transition') && !variables.some(name => name.startsWith('--motion-duration-'))) report(position, 'Motion duration must be explicit and shared.')
      if ((property.endsWith('timing-function') || animation || property === 'transition') && !variables.some(name => name.startsWith('--motion-easing-'))) report(position, 'Motion easing must be explicit and shared.')
      if (animation && variables.some(name => ['--_motion-animation', '--_motion-loading-animation'].includes(name))) report(position, 'Put the policy switch in animation-name; none is ambiguous in shorthand.')
      if (animation && !parsed.declarations.some(other => other.contexts.join() === contexts.join() && other.property === 'animation-name' && /var\(--_motion-(?:loading-)?animation,/.test(other.value))) report(position, 'Animation must consume the central policy through animation-name.')
      if (/\breverse\b/.test(value)) report(position, 'Use forward exit keyframes so the shared exit easing accelerates.')
      if (property === 'transition-duration' && !parsed.declarations.some(other => other.contexts.join() === contexts.join() && other.property === 'transition-timing-function')) report(position, 'Declare shared easing alongside transition duration.')
    }
    if (movement) {
      const keyframe = contexts.some(context => context.startsWith('@keyframes'))
      // Plain endpoints and static centring are the explicitly approved constants.
      let remaining = value.replace(/var\(\s*--[\w-]+\s*\)/g, '')
      if (!keyframe && property === 'translate' && /^(?:0|-50%)(?:\s+(?:0|-50%))?$/.test(value)) continue
      if (variables.some(name => !motionTokens.includes(name))) report(position, 'Movement must consume shared motion roles directly.')
      remaining = remaining.replace(/\b(?:calc|translate[XYZ]?|scale[XYZ]?|rotate[XYZ]?)\(/g, '(')
      const numbers = [...remaining.matchAll(/-?(?:\d*\.)?\d+(?:deg|turn|rad|px|rem|em|%)?/g)].map(match => match[0])
      if (numbers.some(number => !['0', '0deg', '1', '-1', '2'].includes(number))) report(position, 'Non-zero travel, entry scale and angles require shared motion tokens.')
      if (!variables.length && /^(scale|transform)$/.test(property) && numbers.some(number => !['0', '1'].includes(number))) report(position, 'Only neutral scale/transform endpoints may be literal.')
    }
    if (property === 'scroll-behavior' && value !== 'var(--_motion-scroll-behavior)') report(position, 'Scrolling must use the central motion policy.')
    if (property === 'animation-name' && !variables.some(name => internalControls.includes(name))) report(position, 'Animation names must use the central policy switch.')
  }
  return problems
}

export function checkMotionSource(file, text) {
  const problems = []
  const report = (position, message) => problems.push({ position, message })
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  function visit(node) {
    if (ts.isStringLiteralLike(node)) {
      // A query such as (prefers-reduced-motion: reduce); copy may still name the setting.
      if (file !== 'src/motionPolicy.ts' && /prefers-reduced-motion\s*[:)]/.test(node.text)) report(node.pos, 'Only the internal motion reader may query the system preference.')
      for (const match of node.text.matchAll(oldToken)) report(node.pos, `Removed motion token ${match[0]}.`)
    }
    if (ts.isPropertyAssignment(node)) {
      const name = node.name.getText(source).replace(/['"]/g, '')
      if (/^(animation|transition)(Duration|Delay|TimingFunction)?$/.test(name) || ['duration', 'easing', 'delay'].includes(name) && node.parent.parent.getText(source).includes('.animate(')) {
        const value = node.initializer.getText(source)
        if (!/--motion-(?:duration|easing)-/.test(value)) report(node.pos, 'Inline/Web Animations timing must use shared motion tokens.')
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return problems
}
