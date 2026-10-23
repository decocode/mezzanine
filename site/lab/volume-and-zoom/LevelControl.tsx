// The shape VolumeControl and ZoomControl share: an icon button that opens a slim pop-up with one
// row: a control at the start, the slider, a control or icon at the end, and the level. Lab only:
// illustrative and unapproved.
import { useId, useRef, useState, type ReactNode } from 'react'
import { Button, Dialog, DialogTrigger, Popover, Slider } from '@decocode/mezzanine'
import { useAutoCloseTimer } from './autoCloseTimer'
import { useCanHover } from './hoverCapability'
import './volumeAndZoom.css'

export interface LevelControlProps {
  // The control's name: the trigger's tooltip, the slider's name and the pop-up's name.
  label: string
  // The trigger's icon, which can show the current level.
  icon: ReactNode
  // The slider's own value, in whatever units suit it.
  value: number
  minValue: number
  maxValue: number
  step: number
  onChange: (value: number) => void
  // How the slider words its level, such as "60%".
  formatValue: (value: number) => string
  // What sits before and after the slider, such as a mute toggle or zoom buttons.
  start: ReactNode
  end?: ReactNode
  // The level at the end of the row; a button when it does something, such as resetting.
  level: ReactNode
  orientation?: 'horizontal' | 'vertical'
  // How the row appears: in a pop-up above the button, or sliding out of it: beside it when
  // horizontal, pushing what follows along, or rising above it when vertical, floating over the page.
  presentation?: 'popover' | 'expand'
  // With presentation="expand" and a mouse: a button that replaces the trigger, such as a mute
  // toggle, while hovering or focusing reveals the row. On touch, the trigger and start are used.
  hoverTrigger?: ReactNode
  isDisabled?: boolean
  // How long the pop-up stays open after its last use. Omit to keep it open until dismissed.
  autoCloseAfterMs?: number
}

export function LevelControl({ label, icon, value, minValue, maxValue, step, onChange, formatValue, start, end, level, orientation = 'horizontal', presentation = 'popover', hoverTrigger, isDisabled, autoCloseAfterMs }: LevelControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const canHover = useCanHover()
  const revealsOnHover = presentation === 'expand' && hoverTrigger != null && canHover
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  // Closing the expanding row hides it from the keyboard, so focus inside it goes back to its button.
  const close = () => {
    if (panelRef.current?.contains(document.activeElement)) buttonRef.current?.focus()
    setIsOpen(false)
  }
  const hasTimer = autoCloseAfterMs !== undefined
  const timer = useAutoCloseTimer(autoCloseAfterMs ?? 0, close)
  const restart = () => { if (hasTimer) timer.restart() }
  const cancel = () => { if (hasTimer) timer.cancel() }
  const changeOpen = (next: boolean) => {
    setIsOpen(next)
    if (next) restart()
    else timer.cancel()
  }

  const row = (
    <div
      ref={hasTimer && !revealsOnHover ? timer.stopOnUnmount : undefined}
      className="lab-media-row"
      data-orientation={orientation}
      // A mouse resting on the row holds it open; any press or key counts as use.
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') cancel() }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') restart() }}
      onPointerUp={restart}
      onKeyDownCapture={restart}
    >
      {!revealsOnHover && start}
      <Slider
        aria-label={label}
        className="react-aria-Slider lab-media-slider"
        orientation={orientation}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        formatValue={formatValue}
        isDisabled={isDisabled}
        onChange={(next) => { cancel(); onChange(next) }}
        onChangeEnd={restart}
      />
      {end}
      {level}
    </div>
  )

  if (revealsOnHover) {
    // With a mouse, as on YouTube: the hover trigger, such as mute, stays one press away, and hovering
    // or focusing the control reveals the row beside it. Hidden rows can't be reached, so the row
    // shows whenever focus moves into the control.
    return (
      <div className="lab-media-expand" data-reveal="hover" data-orientation={orientation}>
        {hoverTrigger}
        <div role="group" aria-label={label} className="lab-media-expand-panel">
          <div className="lab-media-expand-content">{row}</div>
        </div>
      </div>
    )
  }

  if (presentation === 'expand') {
    // A disclosure: the button says whether the row beside it is showing, and the row slides out.
    return (
      <div className="lab-media-expand" data-expanded={isOpen || undefined} data-orientation={orientation}>
        <Button
          ref={buttonRef}
          variant="secondary"
          iconLeading={icon}
          labelPlacement="tooltip"
          // Upright, the row rises above the button, so the tooltip opens below to stay clear of it.
          tooltipPlacement={orientation === 'vertical' ? 'bottom' : 'top'}
          aria-expanded={isOpen}
          aria-controls={panelId}
          isDisabled={isDisabled}
          onPress={() => changeOpen(!isOpen)}
        >
          {label}
        </Button>
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label={label}
          className="lab-media-expand-panel"
          inert={!isOpen}
          onKeyDown={(event) => { if (event.key === 'Escape') { event.stopPropagation(); close(); timer.cancel() } }}
        >
          <div className="lab-media-expand-content">{row}</div>
        </div>
      </div>
    )
  }

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={changeOpen}>
      <Button variant="secondary" iconLeading={icon} labelPlacement="tooltip" isDisabled={isDisabled}>{label}</Button>
      <Popover placement="top" className="react-aria-Popover lab-media-popover">
        <Dialog aria-label={label}>
          {row}
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
