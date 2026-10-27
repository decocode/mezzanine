// A candidate ZoomControl, built on the shared LevelControl: zoom-out and zoom-in buttons that step
// through the browsers' zoom stops either side of a logarithmic slider, and the level as a percentage. Lab only: illustrative
// and unapproved.
import { useState, type ReactNode } from 'react'
import { Button, ZoomInIcon, ZoomOutIcon } from '@decocode/mezzanine'
import { LevelControl } from './LevelControl'
import { maxZoom, minZoom, nextZoomStop, positionToZoom, zoomFineStep, zoomStep, zoomToPosition } from './zoomScale'

export interface ZoomControlProps {
  // The control's name, such as "Zoom".
  label: string
  // The buttons' names, such as "Zoom out" and "Zoom in".
  stepDownLabel: string
  stepUpLabel: string
  // The zoom as a percentage, from 25 to 400.
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  isDisabled?: boolean
  autoCloseAfterMs?: number
}

export function ZoomControl({ label, stepDownLabel, stepUpLabel, value, defaultValue = 100, onChange, isDisabled, autoCloseAfterMs }: ZoomControlProps) {
  const [ownValue, setOwnValue] = useState(defaultValue)
  const zoom = value ?? ownValue
  const changeZoom = (next: number) => {
    setOwnValue(next)
    onChange?.(next)
  }
  const stepButton = (stepLabel: string, icon: ReactNode, next: number) => (
    <Button hierarchy="tertiary" size="sm" icon={icon} iconPosition="iconOnly" isDisabled={isDisabled} onPress={() => changeZoom(next)}>{stepLabel}</Button>
  )

  return (
    <LevelControl
      label={label}
      icon={<ZoomInIcon />}
      value={zoomToPosition(zoom)}
      minValue={zoomToPosition(minZoom)}
      maxValue={zoomToPosition(maxZoom)}
      step={zoomFineStep}
      keyStep={zoomStep}
      onChange={(position) => changeZoom(positionToZoom(position))}
      formatValue={(position) => `${positionToZoom(position)}%`}
      // 100% is marked on the track; a drag near it snaps onto it, and a double-press of the thumb
      // returns to it.
      mark={zoomToPosition(100)}
      start={stepButton(stepDownLabel, <ZoomOutIcon />, nextZoomStop(zoom, -1))}
      end={stepButton(stepUpLabel, <ZoomInIcon />, nextZoomStop(zoom, 1))}
      // The slider already says its level, so screen readers skip this copy of it.
      level={<span className="lab-media-level mz-text-label-md" aria-hidden="true"><span>{`${zoom}%`}</span></span>}
      isDisabled={isDisabled}
      autoCloseAfterMs={autoCloseAfterMs}
    />
  )
}
