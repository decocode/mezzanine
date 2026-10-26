// A candidate ZoomControl, built on the shared LevelControl: zoom-out and zoom-in buttons that halve
// and double either side of a logarithmic slider, and the percentage resets to 100% when pressed. Lab only: illustrative and
// unapproved.
import { useState, type ReactNode } from 'react'
import { Button, ZoomInIcon, ZoomOutIcon } from '@decocode/mezzanine'
import { LevelControl } from './LevelControl'
import { doubleZoom, maxZoom, minZoom, positionToZoom, zoomStep, zoomToPosition } from './zoomScale'

export interface ZoomControlProps {
  // The control's name, such as "Zoom".
  label: string
  // The buttons' names, such as "Zoom out", "Zoom in" and "Reset to 100%".
  stepDownLabel: string
  stepUpLabel: string
  resetLabel: string
  // The zoom as a percentage, from 25 to 400.
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  isDisabled?: boolean
  autoCloseAfterMs?: number
}

export function ZoomControl({ label, stepDownLabel, stepUpLabel, resetLabel, value, defaultValue = 100, onChange, isDisabled, autoCloseAfterMs }: ZoomControlProps) {
  const [ownValue, setOwnValue] = useState(defaultValue)
  const zoom = value ?? ownValue
  const changeZoom = (next: number) => {
    setOwnValue(next)
    onChange?.(next)
  }
  const stepButton = (stepLabel: string, icon: ReactNode, next: number) => (
    <Button hierarchy="tertiary" size="sm" icon={icon} iconPosition="only" isDisabled={isDisabled} onPress={() => changeZoom(next)}>{stepLabel}</Button>
  )

  return (
    <LevelControl
      label={label}
      icon={<ZoomInIcon />}
      value={zoomToPosition(zoom)}
      minValue={zoomToPosition(minZoom)}
      maxValue={zoomToPosition(maxZoom)}
      step={zoomStep}
      onChange={(position) => changeZoom(positionToZoom(position))}
      formatValue={(position) => `${positionToZoom(position)}%`}
      start={stepButton(stepDownLabel, <ZoomOutIcon />, doubleZoom(zoom, -1))}
      end={stepButton(stepUpLabel, <ZoomInIcon />, doubleZoom(zoom, 1))}
      // The percentage is the reset button; its name keeps the visible percentage, so voice control
      // users can say what they see.
      level={
        <Button hierarchy="tertiary" size="sm" aria-label={`${resetLabel}, ${zoom}%`} isDisabled={isDisabled} onPress={() => changeZoom(100)}>
          {`${zoom}%`}
        </Button>
      }
      isDisabled={isDisabled}
      autoCloseAfterMs={autoCloseAfterMs}
    />
  )
}
