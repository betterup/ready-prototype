import { coachReplay } from '../../../../data'
import { ChevronDown } from '../../../../icons'

/** The one screen with its own canvas — a warm gradient rather than the flat
 *  grey the rest of the coach shell sits on. */
export default function Replay() {
  return (
    <div className="c-replay">
      <div className="c-replay-cols">
        <aside className="c-recap">
          <header><h2>{coachReplay.recapTitle}</h2></header>
          <p>{coachReplay.recapEmpty}</p>
        </aside>

        <section>
          <header className="c-replay-head">
            <h2>{coachReplay.listTitle}</h2>
            {coachReplay.filters.map((f) => (
              <button className="c-select soft" key={f}>{f} <ChevronDown /></button>
            ))}
          </header>

          <p className="c-replay-empty">{coachReplay.empty}</p>
        </section>
      </div>
    </div>
  )
}
