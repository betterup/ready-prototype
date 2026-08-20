import { useEffect, useRef, useState } from 'react'
import { EXPERIENCE_LABELS, EXPERIENCE_ORDER, type Experience } from '../../nav'
import {
  PersonIcon, ShieldIcon, InfoIcon, InsightsIcon, MapIcon, LogOutIcon,
  HomeIcon, CoachingIcon,
} from '../../icons'

const SWITCH_ICONS: Record<Experience, (p: { className?: string }) => JSX.Element> = {
  member: HomeIcon,
  partner: InsightsIcon,
  coach: CoachingIcon,
}

/** Avatar button + dropdown. Shared by all three shells. The switch items are
 *  derived from the current experience, so the menu always offers the other two
 *  and you can never get stranded in a shell you can't leave. */
export default function AccountMenu({
  experience, onSwitchExperience,
}: {
  experience: Experience
  onSwitchExperience: (e: Experience) => void
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

  const switches = EXPERIENCE_ORDER.filter((e) => e !== experience).map((e) => ({
    label: `Switch to ${EXPERIENCE_LABELS[e]}`,
    Icon: SWITCH_ICONS[e],
    action: () => onSwitchExperience(e),
  }))

  const items = [
    { label: 'Account', Icon: PersonIcon, action: () => {} },
    { label: 'Privacy policy', Icon: ShieldIcon, action: () => {} },
    { label: 'About BetterUp', Icon: InfoIcon, action: () => {} },
    ...switches,
    { label: 'Sitemap', Icon: MapIcon, action: () => {} },
    { label: 'Log out', Icon: LogOutIcon, action: () => {} },
  ]

  return (
    <div className="avatar-wrap" ref={ref}>
      <button
        className="avatar-btn"
        aria-label="Your account"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <div className="account-menu" role="menu">
          {items.map(({ label, Icon, action }) => (
            <button
              key={label}
              className="account-item"
              role="menuitem"
              onClick={() => { setOpen(false); action() }}
            >
              {label}
              <Icon />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
