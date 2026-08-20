import { coachLibrary, coachLists } from '../../../../data'
import { ChevronDown, ChevronRight, PlusIcon, SearchIcon, SparkleIcon, ComposeIcon } from '../../../../icons'

export default function Resources() {
  return (
    <div className="c-split">
      <aside className="c-lists">
        <header className="c-lists-head">
          <h2>Your lists</h2>
          <button className="c-addlink"><PlusIcon /> Create new list</button>
        </header>

        <button className="c-select full">{coachLibrary.sort} <ChevronDown /></button>

        <div className="c-list-rows">
          {coachLists.map((l) => (
            <button className="c-list-row" key={l.name}>
              <span>
                <strong>{l.name}</strong>
                <em>{l.count} {l.count === 1 ? 'resource' : 'resources'}</em>
              </span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </aside>

      <section className="c-library">
        <header className="c-lib-head">
          <h2>Resources library</h2>
          <button className="c-addlink"><PlusIcon /> Add new resource</button>
        </header>

        <label className="c-search wide">
          <SearchIcon />
          <input placeholder={coachLibrary.searchPlaceholder} />
        </label>

        <hr className="c-rule" />

        <div className="c-lib-filters">
          <span>Filters:</span>
          {coachLibrary.filters.map((f) => (
            <button className="c-chip" key={f}>{f} <ChevronDown /></button>
          ))}
        </div>

        <div className="c-lib-grid">
          {coachLibrary.cards.map((c) => (
            <article className="c-res" key={c.title}>
              <div className="c-res-hero" style={{ background: c.hero }} />
              <div className="c-res-body">
                <h3>{c.title}</h3>
                <p className="c-res-meta">
                  {c.kind === 'AI Experience' ? <SparkleIcon className="ic" /> : <ComposeIcon className="ic" />}
                  {c.kind} • {c.meta}
                </p>
              </div>
              <footer className="c-res-foot">
                <button className="c-addlink"><PlusIcon /> Add to list</button>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
