import { partnerHome } from '../../../../data'
import { ChevronRight } from '../../../../icons'

/** 0% ring from the reference: a white track with a small gap, no progress arc. */
function Ring({ pct }: { pct: number }) {
  const r = 58
  const circumference = 2 * Math.PI * r
  return (
    <svg className="p-ring" viewBox="0 0 140 140" role="img" aria-label={`${pct}% engaged`}>
      <circle
        cx="70" cy="70" r={r}
        fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="4"
        strokeDasharray={`${circumference * 0.97} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-86 70 70)"
      />
      <text x="70" y="70" textAnchor="middle" dominantBaseline="central"
        fontSize="30" fill="#fff">{pct}%</text>
    </svg>
  )
}

export default function PartnerHomeScreen() {
  return (
    <>
      <h1 className="p-greeting serif">{partnerHome.greeting}</h1>
      <hr className="p-rule" />

      <h2 className="p-section">{partnerHome.sectionTitle}</h2>

      <div className="p-cards">
        {partnerHome.cards.map((c) => (
          <article className="p-card" key={c.title}>
            <div className="p-card-hero" style={{ background: c.hero }}>
              {'ring' in c && typeof c.ring === 'number' && <Ring pct={c.ring} />}
            </div>
            <div className="p-card-body">
              <h3 className="serif">{c.title}</h3>
              {'body' in c && c.body && <p>{c.body}</p>}
            </div>
            {'link' in c && c.link && (
              <div className="p-card-foot">
                <button className="p-card-link">{c.link} <ChevronRight className="ic" /></button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
