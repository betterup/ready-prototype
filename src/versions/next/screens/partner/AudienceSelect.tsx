import { useEffect, useRef, useState } from 'react'
import { upgradeFlow } from '../../../../data'
import { ChevronDown, ChevronUp, SparkleIcon } from '../../../../icons'

const { audience } = upgradeFlow

/** How many picks are spelled out in the closed field before it summarises. */
const NAMED = 2

const summarise = (picked: string[]) => {
  if (!picked.length) return audience.placeholder
  if (picked.length <= NAMED) return picked.join(', ')
  return `${picked.slice(0, NAMED).join(', ')} +${picked.length - NAMED} more`
}

/** Multi-select audience picker. Stays open while you tick boxes — closing on
 *  every pick is the classic way to make a multi-select feel broken — and
 *  closes on outside click or Escape, same as the account menu. */
export default function AudienceSelect({ picked, onChange }: {
  picked: string[]
  onChange: (next: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = (opt: string) =>
    onChange(picked.includes(opt) ? picked.filter((p) => p !== opt) : [...picked, opt])

  return (
    <div className="nudge-select-wrap" ref={ref}>
      {/* No visible field label: the step header already says "Select your
          audience" and the helper line sits right above the control, so a third
          "Audience" would just be noise. It survives as the accessible name. */}
      <p className="nudge-help">{audience.help}</p>

      <button
        className={`nudge-select${open ? ' open' : ''}${picked.length ? '' : ' empty'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={audience.label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nudge-select-value">{summarise(picked)}</span>
        {picked.length > NAMED && <span className="nudge-count-pill">{picked.length}</span>}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="nudge-menu" role="listbox" aria-multiselectable="true">
          {audience.options.map(({ label, ai, tip, count }) => {
            const on = picked.includes(label)
            return (
              <label
                key={label}
                className={`nudge-menu-item${on ? ' on' : ''}${ai ? ' ai' : ''}`}
                role="option"
                aria-selected={on}
              >
                <input type="checkbox" checked={on} onChange={() => toggle(label)} />
                {ai && (
                  /* A button, so the explanation is reachable by keyboard too.
                     preventDefault stops the wrapping label from forwarding the
                     click on to the checkbox. */
                  <button
                    type="button"
                    className="nudge-tip"
                    aria-label={`How BetterUp builds ${label}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <SparkleIcon className="ic" />
                    {tip && <span className="nudge-tip-bubble" role="tooltip">{tip}</span>}
                  </button>
                )}
                <span className="nudge-menu-label">
                  {label}
                  {count != null && <span className="nudge-menu-count"> ({count})</span>}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
