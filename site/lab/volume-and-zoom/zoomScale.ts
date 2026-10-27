// The zoom scale: the slider moves in powers of two, so each step multiplies the zoom, and 100%
// sits in the middle of 25% to 400%. Lab only: illustrative and unapproved.

export const minZoom = 25
export const maxZoom = 400
// Each arrow press moves a tenth of a doubling, about 7%. The slider itself settles on any thousandth of
// a doubling, so it can sit exactly on a stop such as 110%.
export const zoomStep = 0.1
export const zoomFineStep = 0.001

// The zoom-out and zoom-in buttons step through the stops browsers use for their own zoom.
export const zoomStops = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400] as const

export const zoomToPosition = (zoom: number) => Math.log2(zoom / 100)
export const positionToZoom = (position: number) => Math.round(100 * 2 ** position)

// The next stop above (+1) or below (−1) the zoom, or the zoom itself at either end. From a zoom
// between two stops, such as 104% after the arrow keys, it goes to the nearer stop in that direction.
export function nextZoomStop(zoom: number, direction: 1 | -1) {
  const next = direction === 1 ? zoomStops.find((stop) => stop > zoom) : [...zoomStops].reverse().find((stop) => stop < zoom)
  return next ?? zoom
}
