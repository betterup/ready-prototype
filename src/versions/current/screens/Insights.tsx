import { useState } from 'react'
import { strengths, growthAreas, wellbeing, type Strength } from '../../../data'
import { InfoIcon } from '../../../icons'

/* ---------- well-being line chart ---------- */

const W = 940
const H = 470
const PAD = { l: 62, r: 26, t: 18, b: 66 }
const PLOT = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b }

const X_TICKS = ['02/1', '03/1', '04/1', '05/1', '06/1', '07/1', '08/1']

const BANDS = [
  { from: 0, to: 50, fill: 'var(--band-low)' },
  { from: 50, to: 70, fill: 'var(--band-mod)' },
  { from: 70, to: 90, fill: 'var(--band-good)' },
  { from: 90, to: 100, fill: 'var(--band-thriving)' },
]

const LEGEND = [
  { label: 'Low (0-48)', color: 'var(--dot-low)' },
  { label: 'Moderate (52-68)', color: 'var(--dot-mod)' },
  { label: 'Good (72-88)', color: 'var(--dot-good)' },
  { label: 'Thriving (92-100)', color: 'var(--dot-thriving)' },
]

const sx = (x: number) => PAD.l + (x / (X_TICKS.length - 1)) * PLOT.w
const sy = (y: number) => PAD.t + (1 - y / 100) * PLOT.h

const dotColor = (y: number) =>
  y >= 92 ? 'var(--dot-thriving)' : y >= 72 ? 'var(--dot-good)' : y >= 52 ? 'var(--dot-mod)' : 'var(--dot-low)'

/** Catmull-Rom through the check-ins, converted to cubic beziers. */
function smoothPath(pts: { x: number; y: number }[]) {
  const p = pts.map((d) => ({ x: sx(d.x), y: sy(d.y) }))
  if (p.length < 2) return ''
  let d = `M ${p[0].x} ${p[0].y}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6},`
    d += ` ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6},`
    d += ` ${p2.x} ${p2.y}`
  }
  return d
}

function WellbeingChart() {
  return (
    <svg className="wb-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Well-being score over time">
      {BANDS.map((b) => (
        <rect
          key={b.from}
          x={PAD.l} y={sy(b.to)} width={PLOT.w} height={sy(b.from) - sy(b.to)}
          fill={b.fill}
        />
      ))}

      {Array.from({ length: 11 }, (_, i) => i * 10).map((v) => (
        <g key={v}>
          <line x1={PAD.l} x2={PAD.l + PLOT.w} y1={sy(v)} y2={sy(v)} stroke="#fff" strokeWidth={0.8} opacity={0.75} />
          <text x={PAD.l - 14} y={sy(v) + 5} textAnchor="end" fontSize={15} fill="var(--ink2)">{v}</text>
        </g>
      ))}

      {X_TICKS.map((t, i) => (
        <text key={t} x={sx(i)} y={PAD.t + PLOT.h + 30} textAnchor="middle" fontSize={15} fill="var(--ink2)">{t}</text>
      ))}

      <text
        transform={`translate(22 ${PAD.t + PLOT.h / 2}) rotate(-90)`}
        textAnchor="middle" fontSize={14} fill="var(--ink2)"
      >
        Well-being score
      </text>
      <text x={PAD.l + PLOT.w / 2} y={H - 12} textAnchor="middle" fontSize={14} fill="var(--ink2)">Check-in</text>

      <path d={smoothPath(wellbeing.points)} fill="none" stroke="var(--line)" strokeWidth={2.6} strokeLinecap="round" />

      {wellbeing.points.map((p) => (
        <circle
          key={p.date}
          cx={sx(p.x)} cy={sy(p.y)} r={9}
          fill={dotColor(p.y)} stroke="#fff" strokeWidth={2}
        />
      ))}
    </svg>
  )
}

/* ---------- whole person cards ---------- */

function Sparkline({ series }: { series: [number, number] }) {
  const w = 128, h = 104, top = 10, bot = 84
  const y = (v: number) => top + (1 - v / 100) * (bot - top)
  const x1 = 14, x2 = 86

  return (
    <svg className="wp-spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <rect x={x1 - 8} y={top} width={x2 - x1 + 20} height={bot - top} fill="#f1f1f3" />
      {[100, 50, 0].map((v) => (
        <text key={v} x={x2 + 20} y={y(v) + 5} fontSize={11} fill="var(--ink2)">{v}</text>
      ))}
      <line x1={x1 - 8} x2={x2 + 12} y1={y(50)} y2={y(50)} stroke="#e2e2e5" strokeWidth={1} />
      <line x1={x1} x2={x2} y1={y(series[0])} y2={y(series[1])} stroke="#3b4ce0" strokeWidth={2} />
      <circle cx={x1} cy={y(series[0])} r={4.2} fill="#fff" stroke="#3b4ce0" strokeWidth={2} />
      <circle cx={x2} cy={y(series[1])} r={4.2} fill="#fff" stroke="#3b4ce0" strokeWidth={2} />
      <text x={x1} y={h - 4} textAnchor="middle" fontSize={11} fill="var(--ink2)">Jul</text>
      <text x={x2} y={h - 4} textAnchor="middle" fontSize={11} fill="var(--ink2)">Jul</text>
    </svg>
  )
}

function WholePersonCard({ item, kind }: { item: Strength; kind: 'Strength' | 'Growth area' }) {
  return (
    <article className="wp-card">
      <h4>{item.name}</h4>
      <div className="wp-mid">
        <div>
          <div className="wp-score">{item.score}</div>
          <div className="wp-label">{kind}</div>
        </div>
        <Sparkline series={item.series} />
      </div>
      <p className="wp-desc">{item.desc}</p>
      <button className="textlink">Dive deeper →</button>
    </article>
  )
}

/* ---------- screen ---------- */

export default function Insights() {
  const [view, setView] = useState<'strengths' | 'growth'>('strengths')
  const items = view === 'strengths' ? strengths : growthAreas

  return (
    <div className="page">
      <h2 style={{ fontSize: 25, marginBottom: 8 }}>Your well-being journey</h2>
      <p className="muted" style={{ margin: '0 0 26px', fontSize: 15.5 }}>
        Track your state of well-being over time and explore trends.
      </p>

      <div className="insights-grid">
        <section className="card chart-card">
          <h3>Your progress so far</h3>
          <p className="sub">Your well-being is steady since your last check-in.</p>
          <WellbeingChart />
          <div className="chart-legend">
            {LEGEND.map((l) => (
              <span key={l.label}><i style={{ background: l.color }} />{l.label}</span>
            ))}
          </div>
        </section>

        <section className="card breakdown">
          <h3>Score breakdown</h3>
          <p className="sub">Based on your most recent check-in on {wellbeing.lastCheckIn}.</p>
          {wellbeing.breakdown.map((row) => (
            <div className="bd-row" key={row.label}>
              <span>{row.label}</span>
              <span className="spacer" />
              <span className="delta">— {row.delta}</span>
              <span className="bd-chip">{row.score}</span>
            </div>
          ))}
          <button className="bd-foot textlink" style={{ textDecoration: 'none' }}>
            <InfoIcon /> <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>How is this score calculated?</span>
          </button>
        </section>
      </div>

      <section className="whole">
        <div className="whole-head">
          <div>
            <h2 className="serif">You as a whole person</h2>
            <p>
              This report, built on BetterUp's Whole Person™ model, highlights your strengths and
              growth areas, empowering you to thrive personally and inspire professionally.
            </p>
          </div>
          <button className="btn primary" style={{ marginLeft: 'auto', flex: 'none' }}>
            Reflect on your growth
          </button>
        </div>

        <div className="toggle-row">
          <button className={`toggle${view === 'strengths' ? ' on' : ''}`} onClick={() => setView('strengths')}>
            Strengths
          </button>
          <button className={`toggle${view === 'growth' ? ' on' : ''}`} onClick={() => setView('growth')}>
            Growth Areas
          </button>
        </div>

        <div className="wp-grid">
          {items.map((item) => (
            <WholePersonCard
              key={item.name}
              item={item}
              kind={view === 'strengths' ? 'Strength' : 'Growth area'}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
