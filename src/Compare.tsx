import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

export type Mode = 'current' | 'split' | 'next'

export const SPLIT_MIN = 2
/** Not 100: the handle has to stay grabbable at the edge. */
export const SPLIT_MAX = 98

const MIN = SPLIT_MIN
const MAX = SPLIT_MAX
const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n))

/** Before/after comparison.
 *
 *  Both versions render stacked in one grid cell at FULL width and the
 *  `current` layer is clipped horizontally. Clipping rather than resizing is
 *  the whole trick: each side keeps laying out as it would at full viewport
 *  width, so you compare designs instead of comparing reflow. Clipped-away
 *  regions aren't hit-tested either, so both sides stay interactive. */
export default function Compare({
  mode, split, onSplit, current, next,
}: {
  mode: Mode
  split: number
  onSplit: (n: number) => void
  current: ReactNode
  next: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  // In current/next mode the clip is pinned fully open or fully closed, which
  // also disables the top layer's hit-testing for free.
  const reveal = mode === 'split' ? split : mode === 'current' ? 100 : 0

  const setFromClientX = useCallback((clientX: number) => {
    const box = hostRef.current?.getBoundingClientRect()
    if (!box || box.width === 0) return
    onSplit(clamp(((clientX - box.left) / box.width) * 100))
  }, [onSplit])

  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => { e.preventDefault(); setFromClientX(e.clientX) }
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, setFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { e.preventDefault(); onSplit(clamp(split - step)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); onSplit(clamp(split + step)) }
    else if (e.key === 'Home') { e.preventDefault(); onSplit(MIN) }
    else if (e.key === 'End') { e.preventDefault(); onSplit(MAX) }
  }

  return (
    <div
      className="compare"
      ref={hostRef}
      data-mode={mode}
      data-dragging={dragging || undefined}
      style={{ ['--reveal' as string]: `${reveal}%` }}
    >
      <div className="pane pane-next">{next}</div>
      <div className="pane pane-current">{current}</div>

      {mode === 'split' && (
        <div className="compare-ui" aria-hidden={false}>
          <div className="divider" />
          <div
            className="handle-row"
            data-hide-left={split < 14 || undefined}
            data-hide-right={split > 86 || undefined}
          >
            <span className="edge-label left">Current</span>
            <button
              className="handle"
              role="slider"
              aria-label="Reveal the concept version"
              aria-valuemin={MIN}
              aria-valuemax={MAX}
              aria-valuenow={Math.round(split)}
              aria-valuetext={`${Math.round(split)}% current, ${100 - Math.round(split)}% concept`}
              onPointerDown={(e) => { e.preventDefault(); e.currentTarget.focus(); setDragging(true) }}
              onKeyDown={onKeyDown}
              onDoubleClick={() => onSplit(SPLIT_MAX)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m10 8-4 4 4 4M14 8l4 4-4 4" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="edge-label right">Concept</span>
          </div>
        </div>
      )}
    </div>
  )
}
