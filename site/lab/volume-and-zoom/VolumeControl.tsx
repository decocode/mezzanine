// A candidate VolumeControl, built on the shared LevelControl: the trigger's speaker shows the level,
// a crossed-out speaker at the start mutes, and it can lie flat or stand upright. Lab only:
// illustrative and unapproved.
import { useState, type ReactNode } from 'react'
import { ToggleButton, VolumeHighIcon, VolumeLowIcon, VolumeMutedIcon, VolumeOffIcon } from '@decocode/mezzanine'
import { LevelControl } from './LevelControl'

export interface VolumeControlProps {
  // The control's name, such as "Volume".
  label: string
  // The speaker button's name, such as "Mute".
  muteLabel: string
  // The level, from 0 to 100.
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  isMuted?: boolean
  defaultMuted?: boolean
  onMutedChange?: (isMuted: boolean) => void
  orientation?: 'horizontal' | 'vertical'
  presentation?: 'popover' | 'expand'
  isDisabled?: boolean
  autoCloseAfterMs?: number
}

// The trigger's icon follows the level, so it shows the volume before it's opened.
function volumeIcon(value: number, isMuted: boolean): ReactNode {
  if (isMuted || value === 0) return <VolumeMutedIcon />
  if (value < 33) return <VolumeOffIcon />
  if (value < 66) return <VolumeLowIcon />
  return <VolumeHighIcon />
}

const percent = (value: number) => `${Math.round(value)}%`

export function VolumeControl({ label, muteLabel, value, defaultValue = 100, onChange, isMuted, defaultMuted = false, onMutedChange, orientation, presentation, isDisabled, autoCloseAfterMs }: VolumeControlProps) {
  const [ownValue, setOwnValue] = useState(defaultValue)
  const [ownMuted, setOwnMuted] = useState(defaultMuted)
  const level = value ?? ownValue
  const muted = isMuted ?? ownMuted
  const changeMuted = (next: boolean) => {
    setOwnMuted(next)
    onMutedChange?.(next)
  }
  // Moving the level unmutes, as on most players.
  const changeLevel = (next: number) => {
    setOwnValue(next)
    onChange?.(next)
    if (muted) changeMuted(false)
  }
  const shown = muted ? 0 : level
  // Upright, the row rises above the speaker, so tooltips keep clear of it: the speaker's opens
  // below, and the mute button inside the row opens to the side.
  const isUpright = orientation === 'vertical'
  const muteButton = (icon: ReactNode, tooltipPosition: 'top' | 'bottom' | 'end') => (
    <ToggleButton hierarchy="tertiary" size="sm" icon={icon} iconPosition="only" tooltipPosition={tooltipPosition} isSelected={muted} isDisabled={isDisabled} onChange={changeMuted}>
      {muteLabel}
    </ToggleButton>
  )

  return (
    <LevelControl
      label={label}
      icon={volumeIcon(level, muted)}
      value={shown}
      minValue={0}
      maxValue={100}
      // Each arrow press moves 5%, as on most players.
      step={5}
      onChange={changeLevel}
      formatValue={percent}
      start={muteButton(<VolumeMutedIcon />, isUpright ? 'end' : 'top')}
      // Expanding with a mouse, as on YouTube, the speaker itself mutes and shows the level.
      hoverTrigger={presentation === 'expand' ? muteButton(volumeIcon(level, muted), isUpright ? 'bottom' : 'top') : undefined}
      // The slider already says its level, so screen readers skip this copy of it.
      level={<span className="lab-media-level mz-text-label-md" aria-hidden="true">{percent(shown)}</span>}
      orientation={orientation}
      presentation={presentation}
      isDisabled={isDisabled}
      autoCloseAfterMs={autoCloseAfterMs}
    />
  )
}
