// The shape VolumeControl and ZoomControl share: an icon button that opens a slim pop-up with one
// row: a control at the start, the slider, a control or icon at the end, and the level. Lab only:
// illustrative and unapproved.
import { useCallback, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useFocusVisible, useLocale } from 'react-aria'
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
  // How far an arrow key moves the slider, when it's more than step: the slider then settles on any
  // multiple of step, such as a zoom stop, while the arrow keys move along a grid of keyStep.
  keyStep?: number
  onChange: (value: number) => void
  // How the slider words its level, such as "60%".
  formatValue: (value: number) => string
  // What sits before and after the slider, such as a mute toggle or zoom buttons.
  start: ReactNode
  end?: ReactNode
  // The level at the end of the row.
  level: ReactNode
  // A value marked with a tick on the track, such as 100% zoom. A drag that comes within a step of it
  // snaps onto it, and a double-press of the thumb returns to it; the arrow keys still move past it a
  // step at a time.
  mark?: number
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

export function LevelControl({ label, icon, value, minValue, maxValue, step, keyStep, onChange, formatValue, start, end, level, mark, orientation = 'horizontal', presentation = 'popover', hoverTrigger, isDisabled, autoCloseAfterMs }: LevelControlProps) {
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
  const cancel = () => { if (hasTimer) timer.cancel() }
  // A mouse resting on the row, or keyboard focus inside it, holds it open; the countdown runs only
  // once neither does. Focus after a press doesn't count, so a mouse can still leave it to close.
  const { isFocusVisible } = useFocusVisible()
  const isPointerInside = useRef(false)
  const rowElement = useRef<HTMLDivElement | null>(null)
  const isHeld = () => isPointerInside.current || (isFocusVisible && Boolean(rowElement.current?.contains(document.activeElement)))
  const restart = () => {
    if (!hasTimer) return
    if (isHeld()) timer.cancel()
    else timer.restart()
  }
  // The row is the pop-up's content, so it mounts each time the pop-up opens: focus goes straight to
  // the slider's handle, between the controls either side of it.
  const stopOnUnmount = timer.stopOnUnmount
  const rowRef = useCallback((element: HTMLDivElement | null) => {
    rowElement.current = element
    if (element == null) return
    if (presentation === 'popover') element.querySelector<HTMLInputElement>('.lab-media-slider input')?.focus({ preventScroll: true })
    return hasTimer && !revealsOnHover ? stopOnUnmount() : undefined
  }, [hasTimer, presentation, revealsOnHover, stopOnUnmount])
  // Set while a pointer is pressed in the row, so only a drag snaps onto the mark, not the arrow keys.
  const isPointerDown = useRef(false)
  const snap = (next: number) => mark != null && isPointerDown.current && Math.abs(next - mark) <= (keyStep ?? step) * 1.01 ? mark : next
  // With keyStep, an arrow key moves to the next multiple of keyStep in its direction. Right means up
  // in left-to-right languages, left in right-to-left ones; up always means up.
  const { direction } = useLocale()
  const moveByKey = (key: string) => {
    if (keyStep == null) return false
    const ups = ['ArrowUp', direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight']
    const downs = ['ArrowDown', direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft']
    const sign = ups.includes(key) ? 1 : downs.includes(key) ? -1 : 0
    if (sign === 0) return false
    const grid = value / keyStep
    let nextIndex = sign === 1 ? Math.floor(grid + 1e-9) + 1 : Math.ceil(grid - 1e-9) - 1
    // A level that's rounded for show, such as 107%, can sit just short of its grid line, so the
    // nearest line may read the same: keep going until the level shown changes, or the end is reached.
    const clamp = (next: number) => Math.min(maxValue, Math.max(minValue, next))
    while (formatValue(clamp(nextIndex * keyStep)) === formatValue(value) && clamp(nextIndex * keyStep) === nextIndex * keyStep) nextIndex += sign
    onChange(clamp(nextIndex * keyStep))
    return true
  }
  const changeOpen = (next: boolean) => {
    setIsOpen(next)
    if (next) restart()
    else timer.cancel()
  }

  const row = (
    <div
      ref={rowRef}
      className="lab-media-row"
      data-orientation={orientation}
      // Any press or key counts as use, and restarts the countdown unless something holds the row open.
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') { isPointerInside.current = true; cancel() } }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') { isPointerInside.current = false; restart() } }}
      onFocusCapture={() => { if (isFocusVisible) cancel() }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) restart() }}
      onPointerDownCapture={() => { isPointerDown.current = true }}
      onPointerUp={() => { isPointerDown.current = false; restart() }}
      onPointerCancel={() => { isPointerDown.current = false }}
      onKeyDownCapture={(event) => {
        restart()
        // Arrow keys on the slider move by keyStep, before React Aria's own handling sees them.
        if (isDisabled || !(event.target instanceof Element) || !event.target.closest('.lab-media-slider') || !moveByKey(event.key)) return
        event.preventDefault()
        event.stopPropagation()
      }}
      onDoubleClick={(event) => {
        if (mark == null || isDisabled || !(event.target instanceof Element) || !event.target.closest('.mz-slider-thumb')) return
        onChange(mark)
        restart()
      }}
    >
      {!revealsOnHover && start}
      <Slider
        aria-label={label}
        className={mark == null ? 'lab-media-slider' : 'lab-media-slider lab-media-slider-marked'}
        style={mark == null ? undefined : { '--_lab-media-mark': `${(mark - minValue) / (maxValue - minValue) * 100}%` } as CSSProperties}
        orientation={orientation}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        formatValue={formatValue}
        isDisabled={isDisabled}
        onChange={(next) => { cancel(); onChange(snap(next)) }}
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
          hierarchy="secondary"
          icon={icon}
          iconPosition="iconOnly"
          // Upright, the row rises above the button, so the tooltip opens below to stay clear of it.
          tooltipPosition={orientation === 'vertical' ? 'bottom' : 'top'}
          aria-expanded={isOpen}
          aria-controls={panelId}
          isDisabled={isDisabled}
          onPress={() => {
            changeOpen(!isOpen)
            // Opening moves focus to the slider's handle once the row is no longer inert.
            if (!isOpen) requestAnimationFrame(() => panelRef.current?.querySelector<HTMLInputElement>('.lab-media-slider input')?.focus({ preventScroll: true }))
          }}
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
      <Button hierarchy="secondary" icon={icon} iconPosition="iconOnly" isDisabled={isDisabled}>{label}</Button>
      <Popover placement="top" className="lab-media-popover">
        <Dialog aria-label={label}>
          {row}
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
