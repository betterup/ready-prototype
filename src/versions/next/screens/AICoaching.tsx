import { Fragment, useEffect, useRef, useState } from 'react'
import { member, coach, aiSessions, aiExperiences, quickOptions } from '../../../data'
import { getReply } from '../../../coach/provider'
import { updateHighlights } from '../../../coach/engine'
import { breakthroughThread, freshGreeting, breakthroughHighlights } from '../../../coach/seed'
import Scheduler from '../../../coach/Scheduler'
import { emptyHighlights, type Highlights, type Message } from '../../../coach/types'
import {
  PlusBare, ChevronUp, ChevronDown, ChevronRight, PanelIcon,
  AttachIcon, MuteIcon, MicIcon, WaveIcon, EnvelopeIcon,
} from '../../../icons'

/* Concept AI Coaching. Forked from versions/current/screens/AICoaching.tsx as an
 * identical starting point, so changes here never touch the baseline. The coach
 * itself lives in src/coach/ and is shared — only presentation is duplicated. */

/** A brand-new session: just the greeting, then the live scripted engine. */
const freshThread = (): Message[] => [{ id: 0, role: 'coach', text: freshGreeting }]

function Group({
  title, open, onToggle, children,
}: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="side-group">
      <button className="side-group-head" onClick={onToggle} aria-expanded={open}>
        {title}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && <div className="side-rows">{children}</div>}
    </div>
  )
}

function HighlightGroup({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div className="hl-group">
      <h5>{title}</h5>
      <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
    </div>
  )
}

export default function AICoaching() {
  const [active, setActive] = useState(aiSessions[0].title)
  const [open, setOpen] = useState({ upcoming: true, sessions: true, experiences: true })
  const [quickOpen, setQuickOpen] = useState(true)
  const [sideOpen, setSideOpen] = useState(false)

  const [messages, setMessages] = useState<Message[]>(breakthroughThread)
  const [highlights, setHighlights] = useState<Highlights>(breakthroughHighlights)
  const [booking, setBooking] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)

  const threadEnd = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  // The opening thread is pre-loaded, so the first paint must NOT jump to the
  // bottom — you should land at the top of the conversation and read down.
  const firstPaint = useRef(true)

  const toggle = (k: keyof typeof open) => setOpen((o) => ({ ...o, [k]: !o[k] }))
  const started = messages.some((m) => m.role === 'you')

  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false
      return
    }
    threadEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, thinking])

  // Don't let a pending reply land after the thread has been reset.
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = (text: string) => {
    const body = text.trim()
    if (!body || thinking) return

    const history = messages
    const coachStage = history.filter((m) => m.role === 'coach').length
    setMessages([...history, { id: Date.now(), role: 'you', text: body }])
    setHighlights((h) => updateHighlights(h, body, coachStage))
    setDraft('')
    setThinking(true)

    // A beat of latency: instant replies read as canned.
    const t = window.setTimeout(async () => {
      const reply = await getReply(history, body)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'coach', text: reply }])
      setThinking(false)
    }, 850)
    timers.current.push(t)
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMessages(freshThread())
    setHighlights(emptyHighlights())
    setBooking(null)
    setThinking(false)
    setDraft('')
  }

  const confirmBooking = (label: string) => {
    setBooking(label)
    setMessages((prev) => [...prev, {
      id: Date.now(),
      role: 'coach',
      text: `Done — ${label} is booked with ${coach.name}. It's on your Schedule, and I've sent you both a calendar invite.`,
    }])
    setHighlights((h) => ({
      ...h,
      actions: [...h.actions, `Session with ${coach.name} — ${label}`],
    }))
  }

  const hasHighlights =
    highlights.challenges.length || highlights.goals.length || highlights.actions.length

  return (
    <div className={`ai-shell${sideOpen ? '' : ' side-collapsed'}`}>
      <aside className="ai-side" hidden={!sideOpen}>
        <button className="btn ghost" onClick={reset}><PlusBare className="ic" /> Start a new session</button>

        <Group title="Upcoming sessions" open={open.upcoming} onToggle={() => toggle('upcoming')}>
          <button className="side-row">
            <span className="label">Add weekly check-in</span>
            <span className="spacer" />
            <PlusBare className="ic" />
          </button>
        </Group>

        <Group title="Your sessions" open={open.sessions} onToggle={() => toggle('sessions')}>
          {aiSessions.map((s) => (
            <button
              key={s.title}
              className={`side-row${active === s.title ? ' on' : ''}${s.dim ? ' dim' : ''}`}
              onClick={() => setActive(s.title)}
            >
              <span className="label">{s.emoji ? `${s.emoji} ` : ''}{s.title}</span>
            </button>
          ))}
        </Group>

        <Group title="AI experiences" open={open.experiences} onToggle={() => toggle('experiences')}>
          {aiExperiences.map((e) => (
            <button className="exp-row" key={e.title}>
              <span className="exp-thumb"><i style={{ background: e.grad }} /></span>
              {e.title}
            </button>
          ))}
        </Group>
      </aside>

      <section className="ai-main">
        <button
          className="collapse-btn"
          aria-expanded={sideOpen}
          aria-label={sideOpen ? 'Collapse session list' : 'Expand session list'}
          onClick={() => setSideOpen((v) => !v)}
        >
          <PanelIcon />
        </button>

        <div className="ai-thread">
          <span className="orb" style={{ width: 128, height: 128, display: 'block' }} />
          <h1 className="serif">👋 Welcome back, {member.firstName}</h1>

          {messages.map((m) => (
            <Fragment key={m.id}>
              {m.role === 'coach'
                ? (
                  <p className={`ai-msg${m.icon ? ' with-icon' : ''}`}>
                    {m.icon === 'envelope' && <EnvelopeIcon className="ai-msg-icon" />}
                    {m.text}
                  </p>
                )
                : <p className="you-msg">{m.text}</p>}
              {m.widget === 'scheduler' && (
                <Scheduler booked={booking} onBook={confirmBooking} />
              )}
            </Fragment>
          ))}

          {thinking && (
            <p className="ai-typing" aria-live="polite" aria-label="Coach is typing">
              <i /><i /><i />
            </p>
          )}
          <div ref={threadEnd} />
        </div>

        <div className="composer">
          {!started && (
            <div className="quick">
              <button className="quick-head" onClick={() => setQuickOpen((v) => !v)} aria-expanded={quickOpen}>
                Quick options
                {quickOpen ? <ChevronDown /> : <ChevronUp />}
              </button>
              {quickOpen && quickOptions.map((q) => (
                <button className="quick-opt" key={q} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          <form
            className={`composer-box${started ? ' standalone' : ''}`}
            onSubmit={(e) => { e.preventDefault(); send(draft) }}
          >
            <input
              placeholder={started ? 'Reply to your coach…' : 'Type anything else...'}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="Message your AI coach"
            />
            <div className="composer-tools">
              <button type="button" className="icon-btn" aria-label="Attach a file"><AttachIcon /></button>
              <button type="button" className="icon-btn" aria-label="Mute audio"><MuteIcon /></button>
              <span className="spacer" />
              <button type="button" className="icon-btn" aria-label="Dictate"><MicIcon /></button>
              <button
                type="submit"
                className="icon-btn filled"
                aria-label="Send message"
                disabled={!draft.trim() || thinking}
              >
                <WaveIcon />
              </button>
            </div>
          </form>

          <p className="privacy">
            <strong>Your AI coaching chats are private and we don't share them with your employer.</strong>
            <br />
            AI isn't perfect, so please use your best judgment. <a href="#privacy">Learn about your privacy.</a>
          </p>
        </div>
      </section>

      <aside className="ai-aside">
        <div className="aside-head">
          <button className="arrow" aria-label="Collapse highlights"><ChevronRight /></button>
          <h3>Session highlights</h3>
        </div>

        {hasHighlights ? (
          <>
            <HighlightGroup title="Challenges" items={highlights.challenges} />
            <HighlightGroup title="Goals" items={highlights.goals} />
            <HighlightGroup title="Action items" items={highlights.actions} />
          </>
        ) : (
          <>
            <h4>No insights available</h4>
            <p>Keep chatting to generate goals, challenges, and action items that will show up here.</p>
          </>
        )}
        <hr />
      </aside>
    </div>
  )
}
