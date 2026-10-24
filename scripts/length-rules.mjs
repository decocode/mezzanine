// Component CSS takes its lengths from tokens. A raw length such as 12px or 1.5rem belongs in a
// token file. Structural values are allowed: 0, 50% (centring) and 100% (full size), 1lh (exactly
// one line of text), the whole viewport (100vw and friends), and literals inside @media and @container conditions, which
// CSS can't read custom properties in.

const rawLength = /(?<![\w-])(\d*\.?\d+)(px|rem|em|ch|ex|lh|cqi|cqw|cqh|cqb|vw|vh|vi|vb|dvh|svh|lvh|dvw|svw|lvw|%)(?![\w-])/g
const structural = new Set(['0%', '50%', '100%', '1lh', '100vw', '100vh', '100dvh', '100svh', '100lvh', '100dvw'])

// Raw lengths kept on purpose, each with its reason.
export const allowedRawLengths = [
  // TopBar's padding shrinks with its container on narrow screens: a fluid unit, capped by a token.
  { file: 'src/components/TopBar/TopBar.css', value: '4cqi' },
  // Card's padding shrinks with its container in very narrow space, such as a phone with enlarged text: capped by a token.
  { file: 'src/components/Card/Card.css', value: '8cqi' },
  // ProgressBar's indeterminate segment covers a share of its track, not a design size.
  { file: 'src/components/ProgressBar/ProgressBar.css', value: '40%' },
  // The scroll fade's keyframe positions, just in from each end of the scroll range, not sizes.
  { file: 'src/styles/scroll.css', value: '1%' },
  { file: 'src/styles/scroll.css', value: '99%' },
]

function masked(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, value => value.replace(/[^\n]/g, ' '))
    // Query conditions may hold literals.
    .replace(/@(media|container)[^{]*/g, value => value.replace(/[^\n]/g, ' '))
}

export function checkRawLengths(file, text) {
  const problems = []
  for (const match of masked(text).matchAll(rawLength)) {
    const value = `${match[1]}${match[2]}`
    if (Number(match[1]) === 0 || structural.has(value)) continue
    if (allowedRawLengths.some(item => item.file === file && item.value === value)) continue
    problems.push({ position: match.index, message: `${value} is a raw length; take it from a token, or list it in allowedRawLengths with a reason.` })
  }
  return problems
}
