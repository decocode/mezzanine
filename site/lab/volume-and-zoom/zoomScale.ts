// The zoom scale: the slider moves in powers of two, so each step multiplies the zoom, and 100%
// sits in the middle of 25% to 400%. Lab only: illustrative and unapproved.

export const minZoom = 25
export const maxZoom = 400
// Each arrow press moves a tenth of a doubling, about 7%; the buttons move a whole doubling.
export const zoomStep = 0.1

export const zoomToPosition = (zoom: number) => Math.log2(zoom / 100)
export const positionToZoom = (position: number) => Math.round(100 * 2 ** position)

// Doubles (+1) or halves (−1) the zoom, landing on the slider's steps and staying within its range.
export function doubleZoom(zoom: number, doublings: number) {
  const position = Math.round((zoomToPosition(zoom) + doublings) / zoomStep) * zoomStep
  return positionToZoom(Math.min(zoomToPosition(maxZoom), Math.max(zoomToPosition(minZoom), position)))
}
