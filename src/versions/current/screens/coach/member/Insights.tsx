import { band, growthAreas, strengths } from '../../../../../data'
import type { MemberView } from './view'

const ALL = [...strengths, ...growthAreas]

/** The mini gauge on each card: a 0-100 track with the score plotted as a ring.
 *  One reading only, so there's no line to draw — just the point and the axis. */
function Gauge({ score, asOf }: { score: number; asOf: string }) {
  return (
    <div className="c-gauge">
      <svg viewBox="0 0 160 92" className="c-gauge-svg" role="img" aria-label={`Score ${score} of 100`}>
        <line x1="6" y1="10" x2="128" y2="10" stroke="var(--border)" strokeWidth="1.2" />
        <rect x="6" y="30" width="122" height="42" fill="#f1f1f4" />
        <circle
          cx={6 + (score / 100) * 122}
          cy={72 - (score / 100) * 44}
          r="4.6"
          fill="none"
          stroke="#3b4ce0"
          strokeWidth="1.8"
        />
        <text x="136" y="14" fontSize="12" fill="var(--ink2)">100</text>
        <text x="136" y="55" fontSize="12" fill="var(--ink2)">50</text>
        <text x="136" y="76" fontSize="12" fill="var(--ink2)">0</text>
      </svg>
      <p className="c-gauge-date">{asOf}</p>
    </div>
  )
}

export default function Insights({ v }: { v: MemberView }) {
  const d = v.detail

  if (!d) {
    return (
      <div className="c-page">
        <div className="c-panel">
          <div className="c-empty">
            <span className="c-empty-art">🖥️</span>
            <p className="c-empty-title tight">Not enough data</p>
            <p className="c-empty-body">
              {v.firstName} hasn't completed a Whole Person™ assessment yet. Once they do,
              their strengths and growth areas show up here.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const cards = d.insights.picks
    .map((name) => ALL.find((s) => s.name === name))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <div className="c-wp">
      <div className="c-wp-head">
        <h1>{d.insights.title}</h1>
        <p>{d.insights.intro}</p>
      </div>

      <div className="c-wp-grid">
        {cards.map((c) => (
          <article className="c-wp-card" key={c.name}>
            <h3>{c.name}</h3>
            <div className="c-wp-row">
              <div className="c-wp-score">
                <strong>{c.score}</strong>
                <span>{band(c.score)}</span>
              </div>
              <Gauge score={c.score} asOf={d.insights.asOf} />
            </div>
            <p className="c-wp-desc">{c.desc}</p>
            <button className="c-underline">Dive deeper →</button>
          </article>
        ))}
      </div>
    </div>
  )
}
