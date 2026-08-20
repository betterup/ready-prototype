import { useState } from 'react'
import { focusAreas, articles } from '../../../data'
import { SearchIcon, ChevronLeft, ChevronRight, BookmarkIcon, DocIcon } from '../../../icons'

const VISIBLE = 5

export default function Discover() {
  const [offset, setOffset] = useState(0)
  const [saved, setSaved] = useState<string[]>([])

  const maxOffset = Math.max(0, focusAreas.length - VISIBLE)
  const toggleSave = (title: string) =>
    setSaved((s) => (s.includes(title) ? s.filter((t) => t !== title) : [...s, title]))

  return (
    <div className="page">
      <div className="search">
        <SearchIcon />
        <input placeholder="Search Resources" />
      </div>

      <div className="section-head">
        <h2>Browse focus areas</h2>
        <span className="spacer" />
        <div className="carousel-arrows">
          <button
            className="arrow" aria-label="Previous focus areas"
            disabled={offset === 0} onClick={() => setOffset((o) => Math.max(0, o - 1))}
          >
            <ChevronLeft />
          </button>
          <button
            className="arrow" aria-label="Next focus areas"
            disabled={offset >= maxOffset} onClick={() => setOffset((o) => Math.min(maxOffset, o + 1))}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="focus-strip">
        {focusAreas.slice(offset, offset + VISIBLE + 1).map((f) => (
          <button className="focus-card" key={f.title}>
            <span className="blob" style={{ background: f.bg }}>{f.emoji}</span>
            <h3>{f.title}</h3>
          </button>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 56 }}>
        <h2>Because you're focusing on Productivity and Planning</h2>
        <span className="spacer" />
        <div className="carousel-arrows">
          <button className="arrow" disabled aria-label="Previous articles"><ChevronLeft /></button>
          <button className="arrow" aria-label="Next articles"><ChevronRight /></button>
        </div>
      </div>

      <div className="article-strip">
        {articles.map((a) => (
          <article className="article" key={a.title}>
            <div className="hero" style={{ background: a.hero }} />
            <div className="body">
              <h3>{a.title}</h3>
              <div className="meta"><DocIcon /> Article • {a.mins} min read</div>
              <p>{a.desc}</p>
            </div>
            <div className="foot">
              <button
                className={`bookmark${saved.includes(a.title) ? ' on' : ''}`}
                aria-label={saved.includes(a.title) ? `Remove ${a.title} from saved` : `Save ${a.title}`}
                aria-pressed={saved.includes(a.title)}
                onClick={() => toggleSave(a.title)}
              >
                <BookmarkIcon filled={saved.includes(a.title)} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
