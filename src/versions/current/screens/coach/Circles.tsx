import { coachCircles } from '../../../../data'
import { ChevronDown } from '../../../../icons'

export default function Circles() {
  return (
    <div className="c-page">
      <header className="c-filters tight">
        <div>
          <button className="c-select">{coachCircles.filter} <ChevronDown /></button>
          <p className="c-subtle">sessions</p>
        </div>
      </header>

      <hr className="c-rule" />

      <div className="c-empty tall">
        <span className="c-empty-art">💬</span>
        <p className="c-empty-title">{coachCircles.emptyTitle}</p>
      </div>
    </div>
  )
}
