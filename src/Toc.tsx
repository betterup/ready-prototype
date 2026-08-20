import { PILLARS, tocSections, type TocItem } from './tocData'
import { ChevronRight } from './icons'

/** The walkthrough's table of contents. Presentation chrome — belongs to the
 *  prototype, not to either product version, so it lives at the harness level
 *  and overlays the comparison (which stays mounted, preserving chat state). */
export default function Toc({
  onOpenFeature, onClose,
}: {
  onOpenFeature: (item: TocItem) => void
  onClose: () => void
}) {
  return (
    <div className="toc" role="dialog" aria-label="Prototype table of contents">
      <header className="toc-top">
        <button className="logo" onClick={onClose}>BetterUp</button>
        <span className="spacer" />
        <button className="toc-close" onClick={onClose}>Back to prototype</button>
      </header>

      <div className="toc-body">
        <p className="toc-eyebrow">Ready · concept walkthrough</p>
        <h1 className="toc-title serif">What we're proposing</h1>
        <p className="toc-sub">
          Each feature links to where it lives in the concept. Tags mark the strategic pillar.
        </p>

        <div className="toc-legend">
          {PILLARS.map((p) => (
            <span key={p} className={`pillar pillar-${p.toLowerCase().replace(/[^a-z]/g, '')}`}>{p}</span>
          ))}
        </div>

        <div className="toc-sections">
          {tocSections.map((section) => (
            <section className="toc-card" key={section.persona}>
              <h2 className="serif">{section.persona}</h2>
              <p className="toc-blurb">{section.blurb}</p>

              <ol className="toc-list">
                {section.items.map((item) => {
                  const pillarClass = `pillar pillar-${item.pillar.toLowerCase().replace(/[^a-z]/g, '')}`
                  return (
                    <li key={item.title + item.pillar}>
                      {item.target ? (
                        <button className="toc-item linked" onClick={() => onOpenFeature(item)}>
                          <span className={pillarClass}>{item.pillar}</span>
                          <span className="toc-item-main">
                            <span className="toc-item-title">{item.title}</span>
                            {item.note && <span className="toc-item-note">{item.note}</span>}
                          </span>
                          <ChevronRight className="toc-go" />
                        </button>
                      ) : (
                        <div className="toc-item unbuilt">
                          <span className={pillarClass}>{item.pillar}</span>
                          <span className="toc-item-main">
                            <span className="toc-item-title">{item.title}</span>
                          </span>
                          <span className="toc-soon">Not built yet</span>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
