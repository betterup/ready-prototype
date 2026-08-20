import { PlusIcon } from '../../../../../icons'
import type { MemberView } from './view'

/** Mirrors the member's own Coaching screen, which shows the same two empty
 *  columns — the coach sees exactly what the member sees. */
export default function Goals({ v }: { v: MemberView }) {
  const cols = [
    { label: 'Goals', add: 'Add goal', emoji: '🔭', bg: '#fdeedb', empty: 'No goals added', hint: `What will ${v.firstName} work towards next?` },
    { label: 'Actions', add: 'Add action', emoji: '📱', bg: '#dff0e6', empty: 'No actions added', hint: "What's one step to take before the next session?" },
  ]

  return (
    <div className="c-page">
      <div className="c-md-cols">
        {cols.map((c) => (
          <section key={c.label}>
            <header className="c-md-colhead">
              <h3>{c.label}</h3>
              <button className="c-addlink"><PlusIcon /> {c.add}</button>
            </header>
            <div className="c-md-empty-row">
              <span className="c-md-blob" style={{ background: c.bg }}>{c.emoji}</span>
              <div>
                <h4>{c.empty}</h4>
                <p>{c.hint}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
