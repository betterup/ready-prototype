import type { Tab, ScreenProps } from '../../../nav'
import Home from './Home'
import Insights from './Insights'
import Coaching from './Coaching'
import AICoaching from './AICoaching'
import Discover from './Discover'
import Schedule from './Schedule'

/** The shipping design for every screen. Also the fallback the `next` version
 *  renders for any screen we haven't reimagined yet. */
export default function CurrentScreen({ tab, onNavigate }: { tab: Tab } & ScreenProps) {
  switch (tab) {
    case 'home': return <Home onNavigate={onNavigate} />
    case 'insights': return <Insights />
    case 'coaching': return <Coaching />
    case 'ai': return <AICoaching />
    case 'discover': return <Discover />
    case 'schedule': return <Schedule />
    default: return null
  }
}
