import type { MemberView } from './view'

export default function Programs({ v }: { v: MemberView }) {
  const p = v.detail?.program

  if (!p) {
    return (
      <div className="c-page">
        <p className="c-md-eyebrow">Program made for</p>
        <h1 className="c-md-h1">{v.company}</h1>
        <hr className="c-rule" />
        <p className="c-replay-empty">This program doesn't have a description yet.</p>
      </div>
    )
  }

  return (
    <div className="c-page">
      <p className="c-md-eyebrow">Program made for</p>
      <h1 className="c-md-h1">{p.madeFor}</h1>

      <hr className="c-rule" />

      <div className="c-md-doc">
        <aside>
          <dl className="c-md-meta">
            <dt>Program name</dt>
            <dd>{p.name}</dd>
          </dl>
        </aside>

        <article className="c-doc">
          <h2>{p.name}</h2>
          {p.sections.map((s) => (
            <section key={s.heading}>
              <h3>{s.heading}</h3>
              <ul>
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
