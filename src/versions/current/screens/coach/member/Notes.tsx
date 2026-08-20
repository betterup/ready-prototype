import { PlusIcon, SearchIcon } from '../../../../../icons'

export default function Notes() {
  return (
    <div className="c-md-split notes">
      <aside className="c-md-side">
        <label className="c-search">
          <SearchIcon />
          <input placeholder="Search notes" />
        </label>
      </aside>

      <section className="c-md-main center">
        <div className="c-empty">
          <span className="c-empty-art">📋</span>
          <p className="c-empty-title">Get started with notes!</p>
          <button className="c-textlink strong">New note <PlusIcon /></button>
        </div>
      </section>
    </div>
  )
}
