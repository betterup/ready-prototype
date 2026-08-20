import { useEffect } from 'react'

/** Selectors (relative to a pane) whose Nth element must stay the same height on
 *  both sides of the comparison. */
const SYNCED_ROWS = ['.home-cards > .home-card']

/**
 * Equalise the heights of matched rows across the two panes.
 *
 * The versions are independent React trees, so nothing naturally ties card N on
 * one side to card N on the other. A hard-coded height can't do it either: each
 * card's natural height depends on how its own copy wraps, so two cards that
 * match at 1440px diverge at 1060px as soon as one wraps an extra line. This
 * measures both sides at the current width and pins each pair to the taller,
 * which holds for any content at any width.
 *
 * Alignment is a property of the comparison, not of either design — so it lives
 * in the harness rather than in one version's CSS.
 */
export function useRowSync(screen: unknown) {
  useEffect(() => {
    let raf = 0

    const apply = () => {
      for (const sel of SYNCED_ROWS) {
        const left = [...document.querySelectorAll<HTMLElement>(`.pane-current ${sel}`)]
        const right = [...document.querySelectorAll<HTMLElement>(`.pane-next ${sel}`)]
        const pairs = Math.min(left.length, right.length)
        if (!pairs) continue

        // Clear first, so we measure natural heights rather than last pass's.
        for (let i = 0; i < pairs; i++) {
          left[i].style.minHeight = ''
          right[i].style.minHeight = ''
        }
        for (let i = 0; i < pairs; i++) {
          const tallest = Math.max(
            left[i].getBoundingClientRect().height,
            right[i].getBoundingClientRect().height,
          )
          left[i].style.minHeight = `${tallest}px`
          right[i].style.minHeight = `${tallest}px`
        }
      }
    }

    // Coalesce to one pass per frame. Deliberately a resize listener rather than
    // a ResizeObserver on the panes: writing min-height changes their size, which
    // an observer would see as a new resize and loop forever.
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }

    schedule()
    window.addEventListener('resize', schedule)
    // Web fonts land after first paint and change line counts.
    document.fonts?.ready.then(schedule)

    return () => {
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [screen])
}
