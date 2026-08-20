import { coachInsights, coachSelf } from '../../../../data'
import { ExternalIcon, InfoIcon } from '../../../../icons'

/** The You screen shows only two of the four partner tools from Home. */
const LINKS = ['MightyNetworks', 'Docebo']

export default function You() {
  const { mpi, attendance } = coachInsights

  return (
    <>
      <header className="c-subbar">
        <span className="c-subbar-label">Your insights</span>
        <span className="spacer" />
        {LINKS.map((l) => (
          <button className="c-extlink dark" key={l}>{l} <ExternalIcon className="ic" /></button>
        ))}
      </header>

      <div className="c-page">
        <article className="c-impact">
          <span className="c-impact-face">{coachSelf.avatar}</span>
          <div>
            <h1>Your coaching impact</h1>
            <p>{coachInsights.greeting}</p>
          </div>
        </article>

        <section>
          <h2 className="c-h2">{mpi.title} <InfoIcon className="ic" /></h2>
          <button className="c-underline">{mpi.link}</button>

          <div className="c-panel">
            <div className="c-empty">
              <span className="c-empty-art">🖥️</span>
              <p className="c-empty-title tight">{mpi.emptyTitle}</p>
              <p className="c-empty-body">{mpi.emptyBody}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="c-h2">{attendance.title} <InfoIcon className="ic" /></h2>
          <p className="c-prose">{attendance.body}</p>
          <button className="c-underline">{attendance.link}</button>

          <div className="c-stats">
            {attendance.stats.map((s) => (
              <div className="c-stat" key={s.label}>
                <p className="c-stat-label">{s.label}</p>
                <p className="c-stat-value">{s.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
