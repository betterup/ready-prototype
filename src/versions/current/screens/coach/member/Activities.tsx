import { ChevronDown, ChevronRight, PlusIcon } from '../../../../../icons'

export default function Activities() {
  return (
    <div className="c-page">
      <header className="c-filters">
        <button className="c-select">Completed activities <ChevronDown /></button>
        <span className="spacer" />
        <button className="c-addlink"><PlusIcon /> Action item</button>
        <button className="c-textlink strong">Share resource <ChevronRight /></button>
      </header>

      <hr className="c-rule" />

      <p className="c-replay-empty">No completed activities</p>
    </div>
  )
}
