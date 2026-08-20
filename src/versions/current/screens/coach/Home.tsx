import { coachHome, coachLinks, coachSelf } from '../../../../data'
import { ChevronRight, ClockIcon, ExternalIcon } from '../../../../icons'

/** The day column beside the next-session card. Hour rows are fixed height, so
 *  the now-marker can be placed as a percentage of the whole stack. */
function DayColumn() {
  const { label, hours, now } = coachHome.day
  return (
    <section className="c-day">
      <header className="c-day-head">
        <h2>{label}</h2>
        <button className="c-textlink">View full calendar <ChevronRight className="ic" /></button>
      </header>

      <div className="c-day-grid">
        {hours.map((h) => (
          <div className="c-hour" key={h}><span>{h}</span></div>
        ))}
        <div className="c-now" style={{ top: `${now * 100}%` }} aria-label="Current time" />
      </div>
    </section>
  )
}

export default function CoachHome() {
  const { nextSession: s } = coachHome

  return (
    <div className="c-page">
      <header className="c-greet">
        <h1>Hello, {coachSelf.name}!</h1>
        <div className="c-links">
          {coachLinks.map((l) => (
            <button className="c-extlink" key={l}>{l} <ExternalIcon className="ic" /></button>
          ))}
        </div>
      </header>

      <div className="c-home-cols">
        <section>
          <h2 className="c-section">Your next session</h2>
          <article className="c-next">
            <div className="c-next-hero" style={{ background: s.hero }}>
              <span className="c-next-orb" />
            </div>
            <div className="c-next-body">
              <span className="c-pill">{s.badge}</span>
              <p className="c-next-meta"><ClockIcon className="ic" /> {s.kind} • {s.duration}</p>
              <h3>{s.title}</h3>
              <div className="c-next-actions">
                <button className="c-btn ghost">{s.cta}</button>
                <span>{s.when}</span>
              </div>
            </div>
          </article>
        </section>

        <DayColumn />
      </div>

      <section className="c-checklist">
        <h2 className="c-section">This week's checklist</h2>
        <div className="c-check-grid">
          {coachHome.checklist.map((c) => (
            <button className="c-check" key={c.title}>
              <span className="c-check-art" style={{ background: c.bg }}>{c.emoji}</span>
              <span className="c-check-title">{c.title}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
