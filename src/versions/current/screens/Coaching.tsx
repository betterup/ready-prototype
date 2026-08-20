import { coach, specialistTracks } from '../../../data'
import { ChevronLeft, ChevronRight, PlusIcon, InfoIcon, RefreshIcon, ClockIcon } from '../../../icons'

export default function Coaching() {
  return (
    <div className="page">
      <div className="section-head">
        <h2>Your coaching team</h2>
        <span className="spacer" />
        <div className="carousel-arrows">
          <button className="arrow" disabled aria-label="Previous"><ChevronLeft /></button>
          <button className="arrow" aria-label="Next"><ChevronRight /></button>
        </div>
      </div>

      <article className="card coach-card">
        <div className="coach-photo">
          <span className="ring">👩🏼‍💼</span>
          <span className="badge">💐</span>
        </div>
        <h3>{coach.name}</h3>
        <p>{coach.practice}</p>
        <p>{coach.sessions}</p>
      </article>

      <div className="switch-coach">
        Looking for a better fit?
        <button className="textlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <RefreshIcon className="ic" /> <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>Switch your coach</span>
        </button>
      </div>

      <div className="working-head">
        <h2>What you're working on</h2>
        <p>
          Track what you're working toward, whether a goal, outcome, or intention.
          <InfoIcon className="ic" />
        </p>
      </div>

      <div className="two-col">
        <section>
          <div className="col-head">
            <h3>Goals</h3>
            <button className="add-btn"><PlusIcon /> Add goal</button>
          </div>
          <div className="card empty-row">
            <span className="blob" style={{ background: '#fdeedb', fontSize: 26 }}>🔭</span>
            <div>
              <h4>No goals added</h4>
              <p>What will you work towards next?</p>
            </div>
          </div>
        </section>

        <section>
          <div className="col-head">
            <h3>Actions</h3>
            <button className="add-btn"><PlusIcon /> Add action</button>
          </div>
          <div className="card empty-row">
            <span className="blob" style={{ background: '#dff0e6', fontSize: 26 }}>📱</span>
            <div>
              <h4>No actions added</h4>
              <p>What's one step you can take to make progress today?</p>
            </div>
          </div>
        </section>
      </div>

      <div className="rule" />

      <h2 style={{ fontSize: 25 }}>Coaches for specialized support</h2>
      <div className="spec-note">
        <ClockIcon style={{ width: 16, height: 16 }} />
        As often as needed • Unlimited access to one or many specialists
      </div>

      <div className="spec-grid">
        {specialistTracks.map((t) => (
          <article className="card spec-card" key={t.title}>
            <h3>{t.title}</h3>
            <span className="blob" style={{ background: t.bg }}>{t.emoji}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
