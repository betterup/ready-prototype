import { useEffect, useState } from 'react'
import './tokens.css'
import './styles/base.css'
import './styles/primitives.css'
import './versions/current/styles/member.css'
import './versions/current/styles/partner.css'
import './versions/current/styles/coach.css'
import './versions/next/next.css'
import './compare.css'
import type { Experience, Tab } from './nav'
import Compare, { SPLIT_MAX, SPLIT_MIN, type Mode } from './Compare'
import Toc from './Toc'
import type { TocItem } from './tocData'
import './toc.css'
import { useRowSync } from './useRowSync'
import CurrentRoot from './versions/current/Root'
import NextRoot from './versions/next/Root'

const MODES: { id: Mode; label: string }[] = [
  { id: 'current', label: 'Current' },
  { id: 'split', label: 'Split' },
  { id: 'next', label: 'Concept' },
]

export default function App() {
  // Tab state is shared, so sliding always compares the same screen.
  const [tab, setTab] = useState<Tab>('home')
  // Which product you're in. Shared, so both panes never diverge.
  const [experience, setExperience] = useState<Experience>('member')
  // A TOC link into the partner shell, which runs its own rail instead of the
  // member tabs. A fresh object per click, so clicking the same entry twice
  // still lands you back on the screen.
  const [partnerDest, setPartnerDest] = useState<{ dest: string } | null>(null)
  const [mode, setMode] = useState<Mode>('split')
  // Starts at the far right: the current version fills the pane and you drag
  // left to reveal the concept.
  const [split, setSplit] = useState(SPLIT_MAX)
  // The walkthrough's table of contents, reached via the BetterUp logo. An
  // overlay rather than a route so the comparison stays mounted underneath
  // and chat state survives opening it.
  const [tocOpen, setTocOpen] = useState(false)

  // TOC links land on the concept side of the feature's screen.
  const openFeature = (item: TocItem) => {
    if (!item.target) return
    setExperience(item.target.experience)
    if (item.target.tab) setTab(item.target.tab)
    setPartnerDest(item.target.dest ? { dest: item.target.dest } : null)
    setMode('next')
    setTocOpen(false)
  }

  // Keep matched rows the same height on both sides of the seam.
  useRowSync(tab)

  // 1 / 2 / 3 switch modes; brackets nudge the divider from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && /^(INPUT|TEXTAREA)$/.test(el.tagName)) return
      if (document.querySelector('.toc')) return
      if (e.key === '1') setMode('current')
      else if (e.key === '2') setMode('split')
      else if (e.key === '3') setMode('next')
      else if (e.key === '[') { setMode('split'); setSplit((s) => Math.max(SPLIT_MIN, s - 5)) }
      else if (e.key === ']') { setMode('split'); setSplit((s) => Math.min(SPLIT_MAX, s + 5)) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Compare
        mode={mode}
        split={split}
        onSplit={setSplit}
        current={<CurrentRoot experience={experience} tab={tab} onNavigate={setTab} onSwitchExperience={setExperience} onShowToc={() => setTocOpen(true)} />}
        next={<NextRoot experience={experience} tab={tab} partnerDest={partnerDest} onNavigate={setTab} onSwitchExperience={setExperience} onShowToc={() => setTocOpen(true)} />}
      />

      {tocOpen && <Toc onOpenFeature={openFeature} onClose={() => setTocOpen(false)} />}

      {!tocOpen && <div className="modebar" role="group" aria-label="Comparison mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>}
    </>
  )
}
