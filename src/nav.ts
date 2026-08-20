/** The screen set is shared across versions so the comparison slider always
 *  shows the same screen on both sides. Each version renders its own nav
 *  chrome, so the nav itself is fair game for redesign. */
export type Tab = 'home' | 'insights' | 'coaching' | 'ai' | 'discover' | 'schedule'

export const TAB_LABELS: Record<Tab, string> = {
  home: 'Home',
  insights: 'Insights',
  coaching: 'Coaching',
  ai: 'AI Coaching',
  discover: 'Discover',
  schedule: 'Schedule',
}

export const TAB_ORDER: Tab[] = ['home', 'insights', 'coaching', 'ai', 'discover', 'schedule']

export type ScreenProps = { onNavigate: (t: Tab) => void }

/** The three products. Shared across panes so the comparison never ends up
 *  showing two different experiences. */
export type Experience = 'member' | 'partner' | 'coach'

export const EXPERIENCE_LABELS: Record<Experience, string> = {
  member: 'member experience',
  partner: 'partner experience',
  coach: 'coach experience',
}

/** Fixed order, so the account menu lists the two you're NOT in consistently:
 *  member → partner, coach · partner → member, coach · coach → member, partner. */
export const EXPERIENCE_ORDER: Experience[] = ['member', 'partner', 'coach']
