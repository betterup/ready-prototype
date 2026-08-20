import type { Tab } from '../../../nav'
import { member } from '../../../data'
import { PanelIcon, ComposeIcon, MicIcon, WaveIcon, PersonPairIcon, SparkleIcon } from '../../../icons'

const FACES = [
  { emoji: '👩🏾‍🦱', size: 66, left: 4, top: 6, z: 3 },
  { emoji: '👴🏻', size: 46, left: 60, top: 2, z: 2 },
  { emoji: '👩🏼', size: 52, left: 46, top: 52, z: 1 },
]

export default function Home({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  return (
    <div className="home">
      <div className="home-rail">
        <button className="rail-btn" aria-label="Toggle sidebar"><PanelIcon /></button>
        <button className="rail-btn" aria-label="New note"><ComposeIcon /></button>
      </div>

      <div className="home-main">
        <div className="home-inner">
          <div className="home-greeting">
            <span className="orb" style={{ width: 74, height: 74 }} />
            <h1 className="serif">Welcome, {member.firstName} 👋</h1>
          </div>

          <div className="home-cards">
            <article className="home-card">
              <div className="concierge-faces">
                {FACES.map((f) => (
                  <span
                    key={f.emoji}
                    className="face"
                    style={{
                      width: f.size, height: f.size, left: `${f.left}%`, top: `${f.top}%`,
                      zIndex: f.z, background: '#f4e3d5', fontSize: f.size * 0.5,
                    }}
                  >
                    {f.emoji}
                  </span>
                ))}
              </div>
              <div className="body">
                <span className="eyebrow"><PersonPairIcon />1:1 Personal Concierge</span>
                <h3>Your dedicated Personal Concierge is here to guide you</h3>
                <p>
                  Get support building your Care Plan, navigating the platform, or connecting to
                  resources beyond BetterUp.
                </p>
              </div>
              <button className="btn primary">Message Concierge</button>
            </article>

            <article className="home-card">
              <span className="thumb blob" style={{ background: '#f6e6f2', borderRadius: 10, fontSize: 44 }}>
                🧑‍🤝‍🧑
              </span>
              <div className="body">
                <span className="eyebrow"><PersonPairIcon />Group Coaching</span>
                <h3>Master a new skill in 25 minutes</h3>
                <p>
                  Join an expert-led Studio Workshop to build practical tools for less stress,
                  stronger boundaries, and more impact.
                </p>
              </div>
              <button className="btn ghost">Browse workshops</button>
            </article>

            <article className="home-card">
              <span className="thumb" style={{ display: 'grid', placeItems: 'center' }}>
                <span className="orb" style={{ width: 92, height: 92 }} />
              </span>
              <div className="body">
                <span className="eyebrow"><SparkleIcon />AI Coaching</span>
                <h3>Today's AI coaching topic, picked for you</h3>
                <p>
                  “I'm working on getting better at prioritizing my tasks to improve my overall
                  focus. I often feel pulled in different directions and struggle to decide what
                  comes first. Help me think through this.”
                </p>
              </div>
              <button className="btn ghost" onClick={() => onNavigate('ai')}>Start now</button>
            </article>
          </div>
        </div>

        <div className="home-chat">
          <div className="chatbar">
            <input placeholder="Chat with your AI coach about navigating feedback or other challenges" />
            <button className="icon-btn" aria-label="Dictate"><MicIcon /></button>
            <button className="icon-btn filled" aria-label="Voice mode"><WaveIcon /></button>
          </div>
          <p className="privacy">
            <strong>Your AI coaching chats are private and we don't share them with your employer.</strong>
            <br />
            AI isn't perfect, so please use your best judgment. <a href="#privacy">Learn about your privacy.</a>
          </p>
        </div>
      </div>
    </div>
  )
}
