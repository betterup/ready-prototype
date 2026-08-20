/** Mock content for the prototype. Values transcribed from the screenshots
 *  so the shell can be swapped onto real APIs later without layout churn. */

export const member = {
  firstName: 'Doran',
}

export type Strength = {
  name: string
  score: number
  desc: string
  /** two-point sparkline, matching the Jul → Jul mini charts */
  series: [number, number]
}

export const strengths: Strength[] = [
  {
    name: 'Recovery',
    score: 100,
    series: [100, 100],
    desc: "Recovery is the practice of consciously balancing one's physical, emotional, and mental exertion with deliberate rest.",
  },
  {
    name: 'Focus',
    score: 93,
    series: [93, 93],
    desc: 'Focus is the extent to which we are able to cultivate a state of deep concentration on a single task.',
  },
  {
    name: 'Cognitive Agility',
    score: 92,
    series: [92, 92],
    desc: 'Cognitive agility is the extent to which we can quickly adapt and adjust our thinking to new information.',
  },
  {
    name: 'Emotional Regulation',
    score: 91,
    series: [91, 91],
    desc: 'Emotional regulation is the extent to which we can quickly adapt, control, and recover from strong emotions.',
  },
  {
    name: 'Decision-making',
    score: 89,
    series: [89, 89],
    desc: 'Decision-making refers to the process of evaluating and choosing among alternatives with clear judgment.',
  },
  {
    name: 'Coaching',
    score: 89,
    series: [89, 89],
    desc: "Coaching is the extent to which we actively engage with team members' development and growth.",
  },
  {
    name: 'Problem Solving',
    score: 88,
    series: [88, 88],
    desc: 'Problem solving is characterized by embracing contradictions and working through them systematically.',
  },
  {
    name: 'Growth Mindset',
    score: 87,
    series: [87, 87],
    desc: 'Growth mindset is the extent to which we desire to learn and grow through new and difficult challenges.',
  },
]

export const growthAreas: Strength[] = [
  {
    name: 'Delegation',
    score: 54,
    series: [49, 54],
    desc: 'Delegation is the extent to which we entrust meaningful work to others and resist doing it ourselves.',
  },
  {
    name: 'Setting Boundaries',
    score: 58,
    series: [62, 58],
    desc: 'Setting boundaries is the practice of protecting the time and energy your priorities actually require.',
  },
  {
    name: 'Strategic Planning',
    score: 61,
    series: [55, 61],
    desc: 'Strategic planning is the extent to which we translate long-range intent into sequenced, concrete steps.',
  },
  {
    name: 'Influence',
    score: 64,
    series: [60, 64],
    desc: 'Influence is the extent to which we build alignment and move decisions without relying on authority.',
  },
  {
    name: 'Feedback',
    score: 66,
    series: [66, 66],
    desc: 'Feedback is the extent to which we seek, receive, and act on input about our own performance.',
  },
  {
    name: 'Physical Activity',
    score: 68,
    series: [72, 68],
    desc: 'Physical activity is the extent to which regular movement is built into the rhythm of your week.',
  },
  {
    name: 'Self-Compassion',
    score: 71,
    series: [67, 71],
    desc: 'Self-compassion is the extent to which we treat our own setbacks with the kindness we extend to others.',
  },
  {
    name: 'Purpose',
    score: 74,
    series: [70, 74],
    desc: 'Purpose is the extent to which daily work connects to something you find personally meaningful.',
  },
]

/** Well-being check-ins. x = month position on a Feb→Aug axis, y = score. */
export const wellbeing = {
  lastCheckIn: 'July 15, 2026',
  points: [
    { date: '02/13', x: 0.42, y: 80 },
    { date: '02/20', x: 0.64, y: 97 },
    { date: '02/24', x: 0.76, y: 84 },
    { date: '07/15', x: 5.42, y: 100 },
  ],
  breakdown: [
    { label: 'Mood', delta: 0, score: 20 },
    { label: 'Engagement', delta: 0, score: 20 },
    { label: 'Vigor', delta: 0, score: 20 },
    { label: 'Rest', delta: 0, score: 20 },
    { label: 'Calm', delta: 0, score: 20 },
  ],
}

export const coach = {
  name: 'Maria DH Lee',
  practice: 'Ready Coaching',
  sessions: 'No sessions',
}

export const specialistTracks = [
  { title: 'Working Parents Coaching', emoji: '🧸', bg: '#fde8d9' },
  { title: 'Well-Being Habits', emoji: '🥤', bg: '#fdf0d6' },
  { title: 'Navigating Grief', emoji: '💗', bg: '#fbe0ea' },
]

export const aiSessions = [
  { title: 'Welcome back, Doran', emoji: '👋' },
  { title: 'Acknowledging Incomplete Exercise' },
  { title: 'Preparing for Mid Year Review' },
  { title: 'Role Play', dim: true },
]

export const aiExperiences = [
  { title: 'Role play practice', grad: 'linear-gradient(140deg,#3ee0c0,#1f8fd8 70%)' },
  { title: 'Core values exercise', grad: 'linear-gradient(140deg,#4f7bf0,#c23ce0 75%)' },
  { title: 'Gratitude practice', grad: 'linear-gradient(140deg,#f04ba8,#7b3ce0 75%)' },
  { title: 'Scenario simulator', grad: 'linear-gradient(140deg,#f0679b,#8a6ae8 72%)' },
]

export const quickOptions = [
  'I want to improve my communication',
  "I'm working on work-life balance",
  'I need help with collaboration',
]

/** Concept-only: a coach-authored role play recommendation, surfaced on Home.
 *  Ties to `coach` above — the recommender is the member's own coach. */
export const roleplayRec = {
  eyebrow: 'AI Coaching',
  title: 'Practice your performance review conversation',
  recommender: 'Maria',
  quote:
    "This role play was designed to help you practice saying the thing you've been avoiding: what do I need to get promoted?",
  cta: 'Role Play',
}

export const focusAreas = [
  { title: 'Productivity and Planning', emoji: '⏱️', bg: '#fdefdb' },
  { title: 'Connection and Support', emoji: '🗣️', bg: '#e0f0e4' },
  { title: 'Purpose and Impact', emoji: '🔭', bg: '#fdeedb' },
  { title: 'Career Planning', emoji: '🚪', bg: '#efe2fb' },
  { title: 'Emotional Well-Being', emoji: '💗', bg: '#fbe0ea' },
  { title: 'Physical Vitality', emoji: '🏃', bg: '#f3e2fb' },
  { title: 'Leading Others', emoji: '🧭', bg: '#e2ecfb' },
]

export const articles = [
  {
    title: 'Symptoms of Misalignment',
    mins: 10,
    desc: 'Symptoms of misalignment include indecisiveness, ineffective communication, lack of direction, and stalled decisions.',
    hero: 'linear-gradient(150deg,#0f4c6e,#1c7fa8 55%,#8ecfe6)',
  },
  {
    title: 'Seven Types of Rest',
    mins: 5,
    desc: 'Rest is crucial for wellbeing, involving various forms that support different aspects of our health.',
    hero: 'linear-gradient(150deg,#12b58a,#8fd9c0 45%,#d8c4a8)',
  },
  {
    title: 'Getting Great Sleep',
    mins: 7,
    desc: 'Research shows that sufficient sleep improves mental health, reducing depression and anxiety, and sharpens focus.',
    hero: 'linear-gradient(150deg,#0a2a4a,#12a887 60%,#4fe0c0)',
  },
]

/** Partner/admin left rail. Icons are mapped in PartnerRoot — this is just
 *  the tree. `to` marks the destinations that have a screen. */
type PartnerNavGroup = { label?: string; items: string[] }
type PartnerNavEntry = { id: string; label: string; to?: 'home'; groups?: PartnerNavGroup[] }

export const partnerNav: PartnerNavEntry[] = [
  { id: 'home', label: 'Home', to: 'home' as const },
  {
    id: 'analytics',
    label: 'Analytics',
    groups: [
      {
        label: 'Platform analytics',
        items: ['Activation & Onboarding', 'Platform Usage', 'Business Impact', 'Talent Capabilities', 'Competencies'],
      },
      { label: 'Product analytics', items: ['Lead Insights Snapshot'] },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    groups: [
      { items: ['Members', 'Invite members', 'Scheduled invitations', 'Employees', 'Waitlist'] },
    ],
  },
]

/** Partner home. "Actions & announcements" is cut off in the reference, so it
 *  isn't built yet. */
export const partnerHome = {
  greeting: 'Welcome back, Howden Demo - Test.Partner',
  sectionTitle: 'Reporting insights for you',
  cards: [
    {
      title: 'Your Lead Insights Snapshot is coming soon',
      body: "As your team starts using Lead coaching, you'll see how BetterUp drives results for key outcomes at your organization.",
      hero: 'linear-gradient(92deg, #d59aa7 0%, #d7a99b 45%, #dfc28c 100%)',
    },
    {
      title: '0% of activated members have engaged with BetterUp in the last 30 days',
      ring: 0,
      link: 'View all usage',
      hero: 'linear-gradient(200deg, #2a5fe8 0%, #4f9bf2 48%, #c9b6e8 100%)',
    },
    {
      title: 'Stay tuned for your business impact report',
      body: "When enough data is available, you'll see how BetterUp drives productivity, retention, and resilience at your organization.",
      hero: 'linear-gradient(120deg, #a3bab2 0%, #94aaa6 100%)',
    },
  ],
}

/** Partner/admin experience: the Invite to BetterUp flow. */
export const inviteFlow = {
  eyebrow: 'Admin',
  title: 'Invite to BetterUp',
  emailsLabel: 'Add a list of emails separated by commas, spaces, or line breaks',
  emailsPlaceholder: 'member1@yourcompany.com  member2@yourcompany.com...',
  steps: [
    { n: 1, title: 'Add members' },
    { n: 2, title: 'Select a program' },
    { n: 3, title: 'Select subscriptions' },
    { n: 4, title: 'Review invitation' },
  ],
}

/** Open slots the in-chat scheduler offers. Deliberately later than the
 *  Friday 21 session already on the Schedule screen. */
export const coachAvailability = {
  sessionLabel: `Ready coaching with ${coach.name}`,
  duration: '30 min',
  timezone: 'All times in EDT',
  days: [
    { id: '2026-08-24', weekday: 'Mon', day: 24, month: 'Aug', times: ['9:30 AM', '11:00 AM', '2:00 PM'] },
    { id: '2026-08-25', weekday: 'Tue', day: 25, month: 'Aug', times: ['8:45 AM', '1:15 PM', '4:30 PM'] },
    { id: '2026-08-26', weekday: 'Wed', day: 26, month: 'Aug', times: ['10:15 AM', '12:00 PM'] },
    { id: '2026-08-27', weekday: 'Thu', day: 27, month: 'Aug', times: ['9:00 AM', '11:30 AM', '3:15 PM'] },
  ],
}

/** Concept-only: remaining session allowance, shown under the Schedule header. */
export const scheduleAllowance = {
  remaining: 3,
  expires: '12/31/2026',
}

/** Upcoming schedule. `scheduleAvatars` (the nothing-scheduled empty state)
 *  was dropped when this populated state replaced it. */
export const schedule = {
  period: 'This month',
  timezone: 'All times in EDT',
  contactMethod: 'Zoom',
  sessions: [
    {
      day: 21,
      weekday: 'Friday',
      start: '1:15 PM',
      end: '1:45 PM',
      kind: 'Ready coaching',
      with: coach.name,
    },
  ],
}
