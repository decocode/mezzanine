import { useTokenValue } from './tokenValueLogic'

// The example picture, a square and a circle, drawn in the Signature palette. The colours come from the
// palette's tokens, so the picture follows them if they change.
export const examplePictureAlt = 'Example picture: a dark teal square and a light teal circle on a pale teal background'

function examplePictureUrl(background: string, square: string, circle: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240"><rect width="480" height="240" fill="${background}"/><rect x="80" y="50" width="150" height="140" rx="12" fill="${square}"/><circle cx="325" cy="120" r="70" fill="${circle}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function useExamplePicture() {
  return examplePictureUrl(
    useTokenValue('--color-signature-100'),
    useTokenValue('--color-signature-500'),
    useTokenValue('--color-signature-300'),
  )
}
