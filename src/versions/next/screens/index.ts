import type { ComponentType } from 'react'
import type { Tab, ScreenProps } from '../../../nav'
import AICoaching from './AICoaching'
import Home from './Home'
import Schedule from './Schedule'

/** Screens we've reimagined. Anything absent falls back to the current design
 *  with a "not yet reimagined" marker, so we can redesign one screen at a time
 *  instead of maintaining six throwaway copies. */
export const nextScreens: Partial<Record<Tab, ComponentType<ScreenProps>>> = {
  home: Home,
  ai: AICoaching,
  schedule: Schedule,
}
