import type { Experience, Tab } from './nav'

/* ------------------------------------------------------------------
   Table of contents for the prototype walkthrough. Reached by clicking
   the BetterUp logo in the top nav.

   PROCESS NOTE: every feature added to the concept gets an entry here.
   Add the item under its persona, tag the pillar, and point `target` at
   the tab where it lives. Items without a `target` render as
   "not built yet" and don't link.
   ------------------------------------------------------------------ */

export type TocPillar = 'Braid' | 'IC-Specific' | 'Scalable' | 'Configurable'

export const PILLARS: TocPillar[] = ['Configurable', 'IC-Specific', 'Braid', 'Scalable']

export type TocItem = {
  pillar: TocPillar
  title: string
  /** Where the feature lives in the concept. Absent = not built yet. */
  target?: { experience: Experience; tab: Tab }
  /** One line shown under the title for presentation context. */
  note?: string
}

export type TocSection = {
  persona: string
  blurb: string
  items: TocItem[]
}

export const tocSections: TocSection[] = [
  {
    persona: 'Member Experience',
    blurb: 'The IC receiving coaching',
    items: [
      {
        pillar: 'IC-Specific',
        title: 'Onboarding experience',
      },
      {
        pillar: 'Braid',
        title: 'AI activities recommended by coach',
        target: { experience: 'member', tab: 'home' },
        note: 'Home leads with a role play Maria authored for this member',
      },
      {
        pillar: 'Braid',
        title: 'Human coaching sessions recommended by partner',
      },
      {
        pillar: 'Braid',
        title: 'AI coaching summaries sent to human coach',
        target: { experience: 'member', tab: 'ai' },
        note: 'An AI session ends by offering to share a summary with Maria',
      },
      {
        pillar: 'Scalable',
        title: 'Session caps',
        target: { experience: 'member', tab: 'schedule' },
        note: '“3 sessions available to book until 12/31/2026”',
      },
    ],
  },
  {
    persona: 'Partner Experience',
    blurb: 'The HR admin running the program',
    items: [
      {
        pillar: 'Scalable',
        title: 'Grow to Ready upgrade flow',
      },
      {
        pillar: 'Configurable',
        title: 'Moments that Matter calendar view',
      },
    ],
  },
  {
    persona: 'Coach Experience',
    blurb: 'The human coach working alongside the AI',
    items: [
      {
        pillar: 'Braid',
        title: 'AI coaching summaries sent to human coach',
      },
      {
        pillar: 'Braid',
        title: 'Shared context with AI coach',
      },
    ],
  },
]
